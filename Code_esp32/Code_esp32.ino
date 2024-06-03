#include <FirebaseESP32.h>
#include <DHT.h>
#include <WiFi.h>
// #include <SD.h>

#define FIREBASE_HOST "https://dht11web-cb739-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "w4lU2OhMlfHiXnSrlX1eeqJHHsUFs1RzTpFTl57L"
#define WIFI_SSID "Free Wi-MESH"  // Thay đổi tên wifi của bạn
#define WIFI_PASSWORD ""          // Thay đổi password wifi của bạn
#define DHTPIN 4                  // Chân dữ liệu của DHT 11 , với NodeMCU chân D5 GPIO là 14
#define DHTTYPE DHT11             // DHT 11
#define MQ2_A 34                  // DHT 11

int lamp = 18;  // Number of GPIO that is connected to Lamp

// FirebaseData firebaseData;
String fireStatus = "";

DHT dht(DHTPIN, DHTTYPE);
FirebaseData fbdo;

String path = "/thietbi1/";

void setup() {

  Serial.begin(9600);
  delay(1000);

  pinMode(lamp, OUTPUT);
  digitalWrite(lamp, HIGH);  // make external Lamp OFF

  pinMode(MQ2_A, INPUT);  //mq2

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Dang ket noi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  dht.begin();
  Serial.println("");
  Serial.println("Da ket noi WiFi!");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  Firebase.setString(fbdo, path + "Lamp", "OFF");  //send initial string of Lamp
}

void loop() {

  float h = dht.readHumidity();
  float t = dht.readTemperature();  // Đọc nhiệt độ theo độ C
  int value = analogRead(MQ2_A);    //đọc giá trị điện áp ở chân D2 - chân cảm biến
  Serial.print("Nhiet do: ");
  Serial.print(t);
  Serial.print("*C  ");
  Serial.print("Do am: ");
  Serial.print(h);
  Serial.print("%  ");
  Serial.print("Khi gas: ");
  Serial.println(value);  //xuất ra giá trị vừa đọc
  Firebase.setFloat(fbdo, "Nhiet do", t);
  Firebase.setFloat(fbdo, "Do am", h);
  Firebase.setFloat(fbdo, "Khi gas", value);

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Firebase.getString(fbdo, path + "Lamp");  // get ld status input from firebase
  fireStatus = fbdo.stringData();
  if (fireStatus == "ON") {  // compare the input of Lamp status received from firebase
    Serial.println("Lamp Turned ON");
    digitalWrite(lamp, HIGH);        // make external Lamp ON
  } else if (fireStatus == "OFF") {  // compare the input of Lamp status received from firebase
    Serial.println("Lamp Turned OFF");
    digitalWrite(lamp, LOW);  // make external Lamp OFF
  } else {
    Serial.println("Command Error! Please send ON/OFF");
    //Serial.println(fireStatus);
  }
  delay(300);
}
