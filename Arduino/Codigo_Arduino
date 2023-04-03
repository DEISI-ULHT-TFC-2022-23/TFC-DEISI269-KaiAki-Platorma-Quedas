
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <Servo.h>



#include <Arduino.h>
#if defined(ESP32) || defined(ARDUINO_RASPBERRY_PI_PICO_W)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#else
#endif

#include <ESP_Mail_Client.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

#define ENABLE_IMAP

#define ENABLE_SMTP

#define WIFI_SSID "MEO-B4F8B0"
#define WIFI_PASSWORD "2c7f93270f"


Servo myservo;

#include <WiFiClientSecure.h>
#include <base64.h>
#define LED_RED_PIN 15
#define LED_YELLOW_PIN 12
#define LED_GREEN_PIN 13
#define BUZZER_PIN 14
#define SERVO_PIN 2
#define SMTP_HOST "smtp.gmail.com"
#define SMTP_PORT esp_mail_smtp_port_587
#define AUTHOR_EMAIL "testmailkaikai@gmail.com"
#define AUTHOR_PASSWORD "hyakyzdnsitwvxqw"

/* Recipient email address */
#define RECIPIENT_EMAIL "mjmaltasilva@gmail.com"

SMTPSession smtp;

/* Callback function to get the Email sending status */
void smtpCallback(SMTP_Status status);
bool isFallDetected = false;
const int UPPER_LIMIT_ADDRESS = 0;
const int LOWER_LIMIT_ADDRESS = sizeof(float);
const int STANDING_THRESHOLD = 10000;
const int SITTING_THRESHOLD = 7000;
const float SENSOR_HEIGHT_FRACTION = 0.3;
const float PERSON_HEIGHT = 180;



#define THRESHOLD_ACCEL 3.0  // set your own threshold here
#define TEMPERATURE__HIGH_THRESHOLD 37.8
#define TEMPERATURE__LOW_THRESHOLD 36.1

float min_accel_z = 0;
float accel_z = 0;
float gyro_z = 0;
bool is_standing = false;
bool is_sitting = false;
bool is_lying = false;
float forearm_length = PERSON_HEIGHT * 0.45;  // assume forearm is 45% of person's height
float sensor_height = forearm_length * SENSOR_HEIGHT_FRACTION;
const int SWEEP_DELAY = 15;  // Delay between each step (in ms)
const int MIN_ANGLE = 0;    // Minimum servo angle
const int MAX_ANGLE = 180;  // Maximum servo angle

unsigned long previousMillis = 0;  // variable to store the previous time
const unsigned long sweepInterval = 15;  // interval at which to sweep the servo (in milliseconds)

int angle = MIN_ANGLE;  // start at the minimum angle

Servo servo;
Adafruit_MPU6050 mpu;



void setup(void) {
  Serial.begin(115200);
  while (!Serial)
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  pinMode(LED_RED_PIN, OUTPUT);
  pinMode(LED_YELLOW_PIN, OUTPUT);
  pinMode(LED_GREEN_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  servo.attach(SERVO_PIN);


   Serial.print("Connecting to Wi-Fi");
  unsigned long ms = millis();
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
    if (millis() - ms > 10000)
      break;
#endif
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /*  Set the network reconnection option */
  MailClient.networkReconnect(true);

    /* Set the callback function to get the sending results */
  smtp.callback(smtpCallback);

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
  config.time.timezone_env_string = "GMT0"; 

    timeClient.begin();
  timeClient.setTimeOffset(0);

    while (!timeClient.update()) {
    timeClient.forceUpdate();
  }



  Serial.println("Adafruit MPU6050 test!");

  // Try to initialize!
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");

  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  Serial.print("Accelerometer range set to: ");
  switch (mpu.getAccelerometerRange()) {
  case MPU6050_RANGE_2_G:
    Serial.println("+-2G");
    break;
  case MPU6050_RANGE_4_G:
    Serial.println("+-4G");
    break;
  case MPU6050_RANGE_8_G:
    Serial.println("+-8G");
    break;
  case MPU6050_RANGE_16_G:
    Serial.println("+-16G");
    break;
  }
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  Serial.print("Gyro range set to: ");
  switch (mpu.getGyroRange()) {
  case MPU6050_RANGE_250_DEG:
    Serial.println("+- 250 deg/s");
    break;
  case MPU6050_RANGE_500_DEG:
    Serial.println("+- 500 deg/s");
    break;
  case MPU6050_RANGE_1000_DEG:
    Serial.println("+- 1000 deg/s");
    break;
  case MPU6050_RANGE_2000_DEG:
    Serial.println("+- 2000 deg/s");
    break;
  }

  mpu.setFilterBandwidth(MPU6050_BAND_5_HZ);
  Serial.print("Filter bandwidth set to: ");
  switch (mpu.getFilterBandwidth()) {
  case MPU6050_BAND_260_HZ:
    Serial.println("260 Hz");
    break;
  case MPU6050_BAND_184_HZ:
    Serial.println("184 Hz");
    break;
  case MPU6050_BAND_94_HZ:
    Serial.println("94 Hz");
    break;
  case MPU6050_BAND_44_HZ:
    Serial.println("44 Hz");
    break;
  case MPU6050_BAND_21_HZ:
    Serial.println("21 Hz");
    break;
  case MPU6050_BAND_10_HZ:
    Serial.println("10 Hz");
    break;
  case MPU6050_BAND_5_HZ:
    Serial.println("5 Hz");
    break;
  }

  Serial.println("");
  delay(100);
}

void loop() {
  /* Get new sensor events with the readings */
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  timeClient.update();

  accel_z = a.acceleration.z;
  gyro_z = g.gyro.z;
  if (accel_z < min_accel_z) {
    min_accel_z = accel_z;
  }

  // Determine standing state
  if (accel_z > STANDING_THRESHOLD) {
    is_standing = true;
  } else if (accel_z < SITTING_THRESHOLD) {
    float angle = atan2(a.acceleration.y, a.acceleration.x);
    float height_diff = ((PERSON_HEIGHT - sensor_height) / 100) * cos(angle);
    if (accel_z < (min_accel_z + height_diff)) {
      is_lying = true;
    } else {
      is_sitting = true;
    }
  } else {
    is_sitting = true;
  }

    /* Print out the values */
  Serial.print("Acceleration X: ");
  Serial.print(a.acceleration.x);
  Serial.print(", Y: ");
  Serial.print(a.acceleration.y);
  Serial.print(", Z: ");
  Serial.print(a.acceleration.z);
  Serial.println(" m/s^2");

  Serial.print("Rotation X: ");
  Serial.print(g.gyro.x);
  Serial.print(", Y: ");
  Serial.print(g.gyro.y);
  Serial.print(", Z: ");
  Serial.print(g.gyro.z);
  Serial.println(" rad/s");

  Serial.print("Temperature: ");
  Serial.print(temp.temperature);
  Serial.println(" degC");

  Serial.println("");

    if (is_standing) {
    Serial.println("De pé.");
  } else if (is_sitting) {
    Serial.println("Sentado");
  } else if (is_lying) {
    Serial.println("Deitado");
  } else {
    Serial.println("Outra posição");
  }





  if (!isFallDetected && abs(a.acceleration.x) >= THRESHOLD_ACCEL) {
    delay(50); // wait a little bit to check if fall continues
    mpu.getEvent(&a, &g, &temp);
    if (abs(a.acceleration.x) > THRESHOLD_ACCEL) { // fall continues
      isFallDetected = true;
      digitalWrite(LED_RED_PIN, HIGH); // turn on LED
      tone(BUZZER_PIN,1000, 2000);
      SMTP_Message message;


  message.sender.name = F("KaiAKi  Mail");
  message.sender.email = AUTHOR_EMAIL;
  message.subject = F("O paciente caiu com temperatura: %.1f\n", temp.temperature);
  message.addRecipient(F("Someone"), RECIPIENT_EMAIL);
  message.priority = esp_mail_smtp_priority::esp_mail_smtp_priority_high;


  String textMsg = "O paciente caiu com temperatura:  &temp";
  message.text.content = textMsg; // play buzzer sound

    if (!smtp.connect(&config))
    return;

  if (smtp.isAuthenticated())
    Serial.println("\nSuccessfully logged in.");
  else
    Serial.println("\nConnected with no Auth.");

  /* Start sending Email and close the session */
  if (!MailClient.sendMail(&smtp, &message))
    Serial.println("Error sending Email, " + smtp.errorReason());

      delay(2000);
      noTone(BUZZER_PIN); // stop buzzer sound
      digitalWrite(LED_RED_PIN, LOW); // turn off LED
    }
  }else if(temp.temperature > TEMPERATURE__HIGH_THRESHOLD ){
     digitalWrite(LED_RED_PIN, HIGH); // turn on LED
      tone(BUZZER_PIN,1000, 2000); // play buzzer sound
      delay(2000);
      noTone(BUZZER_PIN); // stop buzzer sound
      digitalWrite(LED_RED_PIN, LOW);

  }else if(temp.temperature < TEMPERATURE__LOW_THRESHOLD  ){
      

       digitalWrite(LED_YELLOW_PIN, HIGH); // turn on LED
      tone(BUZZER_PIN,1000, 2000); // play buzzer sound
      delay(2000);
      noTone(BUZZER_PIN); // stop buzzer sound
      digitalWrite(LED_YELLOW_PIN, LOW);

  }

  else if(temp.temperature > TEMPERATURE__LOW_THRESHOLD &&  temp.temperature <  TEMPERATURE__HIGH_THRESHOLD ){
       digitalWrite(LED_GREEN_PIN,HIGH); 

  }else{
       digitalWrite(LED_GREEN_PIN,LOW); 

  }

    unsigned long currentMillis = millis();  // get the current time
  
  if (currentMillis - previousMillis >= sweepInterval) {  // check if it's time to sweep the servo
    previousMillis = currentMillis;  // update the previous time
    
    servo.write(angle);  // set the servo angle
    
    if (angle >= MAX_ANGLE) {  // if we've reached the maximum angle
      angle = MIN_ANGLE;  // start again from the minimum angle
    } else {  // otherwise
      angle++;  // move to the next angle
    }
  }








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
