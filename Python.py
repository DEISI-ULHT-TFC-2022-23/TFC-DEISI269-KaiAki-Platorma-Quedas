import requests
import serial
import json
import time

url = "http://localhost:3000/json"  # Replace with your Nest.js endpoint URL
headers = {
    "Content-Type": "application/json"
}

if __name__ == '__main__':
    ser = serial.Serial('COM3', 115200, timeout=1)
    time.sleep(2)

    received_data = b''  # Initialize an empty byte string

    for i in range(5000):
        line = ser.readline()  # read a byte string
        if line:
            received_data += line  # Append the received data to the byte string
            while True:
                try:
                    json_end_index = received_data.index(b'}') + 1
                except ValueError:
                    break  # No complete JSON object found, break the loop

                json_data = received_data[:json_end_index]  # Extract the JSON object
                received_data = received_data[json_end_index:]  # Remove the processed JSON object

                print(f"Received data: {json_data}")
                try:
                    string = json_data.decode('latin-1')  # Decode the JSON object
                except UnicodeDecodeError as e:
                    print(f"Error decoding JSON: {e}")
                    continue  # Skip to the next iteration of the loop

                if not string.startswith('{'):
                    continue  # Skip to the next iteration of the loop if the string is not a JSON object

                try:
                    json_object = json.loads(string)  # Parse the JSON object
                    print(json_object)
                    response = requests.post(url, data=json.dumps(json_object), headers=headers)
                    print(response.status_code, response.text)
                except json.JSONDecodeError as e:
                    print(f"Error parsing JSON: {e}")

    ser.close()
