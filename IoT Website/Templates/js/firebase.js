
    // Cấu hình Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyBIlKUhmH_kQ4tD0RD3OktHpnIapPCVw0k",
      authDomain: "dht11web-cb739.firebaseapp.com",
      databaseURL: "https://dht11web-cb739-default-rtdb.firebaseio.com",
      projectId: "dht11web-cb739",
      storageBucket: "dht11web-cb739.appspot.com",
      messagingSenderId: "1007859108938",
      appId: "1:1007859108938:web:d35979b967741186056ab3",
      measurementId: "G-V4PP1FDS0X"
    };

    // Khởi tạo Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var nhietDo = document.getElementById('nhietdo');
    var dbRef = firebase.database().ref().child('Nhiet do');
    var doAm = document.getElementById('doam');
    var dbRef2 = firebase.database().ref().child('Do am');
    var khiGas = document.getElementById('khigas');
    var dbRef3 = firebase.database().ref().child('Khi gas');
    dbRef.on('value', snap => nhietDo.innerText = snap.val());
    dbRef2.on('value', snap => doAm.innerText = snap.val());
    dbRef3.on('value', snap => khiGas.innerText = snap.val());

// Biến cho biểu đồ nhiệt độ
const dbRefNhietDo = firebase.database().ref().child('Nhiet do');
const ctxNhietDo = document.getElementById('myChart').getContext('2d');
let chartDataNhietDo = [];
let chartNhietDo;
// Biến cho biểu đồ độ ẩm
const dbRefDoAm = firebase.database().ref().child('Do am');
const ctxDoAm = document.getElementById('myChart2').getContext('2d');
let chartDataDoAm = [];
let chartDoAm;
// Hàm tạo biểu đồ
function createChart(ctx, data, label, backgroundColor, borderColor) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.x),
      datasets: [{
        label: label,
        data: data.map(d => d.y),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Thời Gian'
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0 // Đặt giá trị tối thiểu cho trục y
          },
          scaleLabel: {
            display: true,
            labelString: label
          }
        }]
      }
    }
  });
}

// Lắng nghe sự thay đổi của nhiệt độ
dbRefNhietDo.on('value', (snapshot) => {
  const newTemperature = snapshot.val();
  const timestamp = new Date().toLocaleTimeString();
  chartDataNhietDo.push({ x: timestamp, y: newTemperature });

  if (chartDataNhietDo.length > 50) {
    chartDataNhietDo.shift();
  }

  if (chartNhietDo) {
    chartNhietDo.data.labels = chartDataNhietDo.map(d => d.x);
    chartNhietDo.data.datasets[0].data = chartDataNhietDo.map(d => d.y);
    chartNhietDo.update();
  } else {
    chartNhietDo = createChart(ctxNhietDo, chartDataNhietDo, 'Nhiệt Độ (°C)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');
  }
});

// Lắng nghe sự thay đổi của độ ẩm
dbRefDoAm.on('value', (snapshot) => {
  const newHumidity = snapshot.val();
  const timestamp = new Date().toLocaleTimeString();
  chartDataDoAm.push({ x: timestamp, y: newHumidity });

  if (chartDataDoAm.length > 50) {
    chartDataDoAm.shift();
  }

  if (chartDoAm) {
    chartDoAm.data.labels = chartDataDoAm.map(d => d.x);
    chartDoAm.data.datasets[0].data = chartDataDoAm.map(d => d.y);
    chartDoAm.update();
  } else {
    chartDoAm = createChart(ctxDoAm, chartDataDoAm, 'Độ Ẩm (%)', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)');
  }
});