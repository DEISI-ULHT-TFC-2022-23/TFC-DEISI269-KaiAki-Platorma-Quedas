#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <ESP8266WiFiMulti.h>
#include <Arduino.h>
#include <ArduinoJson.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#define LED_RED_PIN 15
#define LED_YELLOW_PIN 12
#define LED_GREEN_PIN 13
#define BUZZER_PIN 14
#define TEMPERATURELOW_THRESHOLD 36.1
#define TEMPERATUREHIGH_THRESHOLD 37.8        
#define TEMPERATURE_BUFFER 0.5
#define STANDING_THRESHOLD 9.0
#define SITTING_THRESHOLD 3.0
#define LYING_THRESHOLD 1.0
#define PERSON_HEIGHT 170.0
#define SENSOR_HEIGHT 1.0
float prev_z_acceleration = 0.0f;
String current_status = "unknown";
const long utcOffsetInSeconds = 3600;
unsigned long id = 0;
#include <TimeLib.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <ESP_Mail_Client.h>
#include <NTPClient.h>
#define ENABLE_IMAP
#define ENABLE_SMTP
#define SMTP_PORT esp_mail_smtp_port_587
#define SMTP_HOST "smtp.gmail.com"
/* The log in credentials */
#define AUTHOR_EMAIL "testmailkaikai@gmail.com"
#define AUTHOR_PASSWORD "password"
/* Recipient email address */
#define RECIPIENT_EMAIL "mjmaltasilva@gmail.com"
/* Declare the global used SMTPSession object for SMTP transport */
SMTPSession smtp;

#include "twilio.hpp"

const char* account_sid = "sid";
const char* auth_token = "token";
const char fingerprint[] = "fingerprint";

String to_number    = "+351913661864";
String from_number = "+46738643800";

Twilio *twilio = new Twilio(account_sid, auth_token, fingerprint);

#include <Servo.h>

#define SERVO_PIN 2 
Servo myservo; 
int pos = 0;    // variable to store the servo position
bool sweepUp = true;  // direction of servo sweep
unsigned long previousMillis = 0;  // will store the last time servo position was updated


WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org",utcOffsetInSeconds);
const char* ssid     = "NOS-10D4";         // The SSID (name) of the Wi-Fi network you want to connect 2.4ghz!
const char* password = "7FX2JZFN";     // The password of the Wi-Fi network

#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <Hash.h>

Adafruit_MPU6050 mpu;

SocketIOclient socketIO;
#define USE_SERIAL Serial

/* Callback function to get the Email sending status */
void smtpCallback(SMTP_Status status);

// const char rootCACert[] PROGMEM = "-----BEGIN CERTIFICATE-----\n"
//                                   "-----END CERTIFICATE-----\n";

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      USE_SERIAL.printf("[IOc] Disconnected!\n");
      break;
    case sIOtype_CONNECT:
      USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");
      break;
    case sIOtype_EVENT:
      USE_SERIAL.printf("[IOc] sent event: %s\n", payload);
      break;
    case sIOtype_ACK:
      USE_SERIAL.printf("[IOc] get ack: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_ERROR:
      USE_SERIAL.printf("[IOc] get error: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_EVENT:
      USE_SERIAL.printf("[IOc] get binary: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_ACK:
      USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
      hexdump(payload, length);
      break;
  }
}

void setup() {
  Serial.begin(115200);
  timeClient.begin();
  myservo.attach(SERVO_PIN);
  pinMode(LED_RED_PIN, OUTPUT);
  pinMode(LED_YELLOW_PIN, OUTPUT);
  pinMode(LED_GREEN_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  delay(10);

  Serial.println('\n');

  WiFi.begin(ssid, password);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer
  /*  Set the network reconnection option */
  MailClient.networkReconnect(true);
  // Initialize the MPU6050
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");

  //put your server ip address
  socketIO.begin("192.168.1.12", 3000, "/socket.io/?EIO=4");

  // event handler
  socketIO.onEvent(socketIOEvent);
}

void sendEmail(String messageText) {
  /* Declare the Session_Config for user defined session credentials */
  Session_Config config;

  /* Set the session config */
  config.server.host_name = SMTP_HOST;
  config.server.port = SMTP_PORT;
  config.login.email = AUTHOR_EMAIL;
  config.login.password = AUTHOR_PASSWORD;

  config.time.ntp_server = F("pool.ntp.org");
  config.time.gmt_offset = 0;
  config.time.day_light_offset = 1;
  config.time.timezone_env_string = "GMT0"; // for Tokyo

  /* Declare the message class */
  SMTP_Message message;

  /* Set the message headers */
  message.sender.name = F("KaiAKi  Mail");
  message.sender.email = AUTHOR_EMAIL;
  message.subject = F("O paciente caíu");
  message.addRecipient(F("Someone"), RECIPIENT_EMAIL);

  message.text.content = messageText;

  message.text.charSet = F("us-ascii");
  message.text.transfer_encoding = Content_Transfer_Encoding::enc_7bit;
  message.priority = esp_mail_smtp_priority::esp_mail_smtp_priority_low;

  /* Connect to the SMTP server with the Session_Config */
  if (!smtp.connect(&config)) {
    Serial.println("Failed to connect to SMTP server");
    return;
  }

  if (smtp.isAuthenticated())
    Serial.println("\nSuccessfully logged in.");
  else
    Serial.println("\nConnected with no Auth.");

  /* Start sending Email and close the session */
  if (!MailClient.sendMail(&smtp, &message))
    Serial.println("Error sending Email, " + smtp.errorReason());
}

void sendSMS(String message_body) {
    String response;
    bool success = twilio->send_message(
        to_number,
        from_number,
        message_body,
        response
    );
    // Optionally print the response
    // Serial.println(response);
}

void loop() { 
  socketIO.loop();

  // Read data from the MPU6050
  sensors_event_t a, g,temp;
  mpu.getEvent(&a, &g, &temp);
  
  
// Calculate the status (standing, sitting, or lying)
  String status = "unknown";
  if (a.acceleration.z > STANDING_THRESHOLD) {
    status = "standing";
  } else if (a.acceleration.z < SITTING_THRESHOLD) {
    float angle = atan2(a.acceleration.y, a.acceleration.x);
    float height_diff = ((PERSON_HEIGHT - SENSOR_HEIGHT) / 100) * cos(angle);
    if (a.acceleration.z < (LYING_THRESHOLD + height_diff)) {
      status = "lying";
    } else {
      status = "sitting";
    }
  }

  if (status != current_status) {
    current_status = status;
    id++;

    if (status == "unknown") {
      String email_message = "O paciente caiu com a temperatura de " + String(temp.temperature) + "C.";
    //  sendEmail(email_message);
    //  sendSMS(email_message);
      digitalWrite(LED_RED_PIN, LOW);
      tone(BUZZER_PIN, 1000, 2000);
      delay(2000);
      noTone(BUZZER_PIN);
      digitalWrite(LED_RED_PIN, HIGH);
    }
  }
  // High temperature alert
if (temp.temperature > TEMPERATUREHIGH_THRESHOLD) {
  digitalWrite(LED_RED_PIN, LOW); // Changed from HIGH to LOW
  tone(BUZZER_PIN, 1000, 2000);
  delay(2000);
  noTone(BUZZER_PIN);
} else if (temp.temperature < TEMPERATUREHIGH_THRESHOLD) {
  digitalWrite(LED_RED_PIN, HIGH); // Changed from LOW to HIGH
}

// Low temperature alert
if (temp.temperature < TEMPERATURELOW_THRESHOLD) {
  digitalWrite(LED_YELLOW_PIN, LOW); // Changed from HIGH to LOW
  tone(BUZZER_PIN, 1000, 2000);
  delay(2000);
  noTone(BUZZER_PIN);
} else if (temp.temperature > TEMPERATURELOW_THRESHOLD) {
  digitalWrite(LED_YELLOW_PIN, HIGH); // Changed from LOW to HIGH
}

// Normal temperature range
if (temp.temperature > TEMPERATURELOW_THRESHOLD && temp.temperature < TEMPERATUREHIGH_THRESHOLD) {
  digitalWrite(LED_GREEN_PIN, LOW); // Changed from HIGH to LOW
} else {
  digitalWrite(LED_GREEN_PIN, HIGH); // Changed from LOW to HIGH
}

  timeClient.update();

  
unsigned long epochTime = timeClient.getEpochTime();
char formattedDateTime[80];
time_t rawtime = (time_t)epochTime;
struct tm * ti;
ti = localtime(&rawtime);

strftime(formattedDateTime, 80, "%Y-%m-%dT%H:%M:%S.000Z", ti);

  // Prepare the data to be sent
   String data = "{";
data += "\"id\":" + String(id) + ",";
data += "\"date\":\"" + String(formattedDateTime) + "\",";
data += "\"posicao\":\"" + status + "\",";
data += "\"temperatura_corporal\":" + String(temp.temperature);
data += "}";
Serial.print(data);
  // Send the data
  if (socketIO.isConnected()) {
    Serial.println("Sending data: " + data);
    socketIO.send(sIOtype_EVENT, data.c_str());
  }
   servoSweep();
}

/* Callback function to get the Email sending status */
void smtpCallback(SMTP_Status status)
{
  /* Print the current status */
  Serial.println(status.info());

  /* Print the sending result */
  if (status.success())
  {
    // ESP_MAIL_PRINTF used in the examples is for format printing via debug Serial port
    // that works for all supported Arduino platform SDKs e.g. AVR, SAMD, ESP32 and ESP8266.
    // In ESP8266 and ESP32, you can use Serial.printf directly.

    Serial.println("----------------");
    ESP_MAIL_PRINTF("Message sent success: %d\n", status.completedCount());
    ESP_MAIL_PRINTF("Message sent failed: %d\n", status.failedCount());
    Serial.println("----------------\n");

    for (size_t i = 0; i < smtp.sendingResult.size(); i++)
    {
      /* Get the result item */
      SMTP_Result result = smtp.sendingResult.getItem(i);

      // In case, ESP32, ESP8266 and SAMD device, the timestamp get from result.timestamp should be valid if
      // your device time was synched with NTP server.
      // Other devices may show invalid timestamp as the device time was not set i.e. it will show Jan 1, 1970.
      // You can call smtp.setSystemTime(xxx) to set device time manually. Where xxx is timestamp (seconds since Jan 1, 1970)
      time_t ts = (time_t)result.timestamp;

      ESP_MAIL_PRINTF("Message No: %d\n", i + 1);
      ESP_MAIL_PRINTF("Status: %s\n", result.completed ? "success" : "failed");
      ESP_MAIL_PRINTF("Date/Time: %s\n", asctime(localtime(&ts)));
      ESP_MAIL_PRINTF("Recipient: %s\n", result.recipients.c_str());
      ESP_MAIL_PRINTF("Subject: %s\n", result.subject.c_str());
    }
    Serial.println("----------------\n");

    // You need to clear sending result as the memory usage will grow up.
    smtp.sendingResult.clear();
  }
}

void servoSweep() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= 15) {  // 15ms has passed
    previousMillis = currentMillis;   // save the last update time

    if (sweepUp) {
      if (pos < 180) {
        pos++;  // increase position
      } else {
        sweepUp = false;  // change direction
      }
    } else {
      if (pos > 0) {
        pos--;  // decrease position
      } else {
        sweepUp = true;  // change direction
      }
    }

    myservo.write(pos);  // update servo position
  }
}