var canvas = document.querySelector('canvas');
/*
if(location.pathname== "/heart.html"){
  var statusText = document.querySelector('#statusText');
  statusText.addEventListener('click', function() {
  statusText.textContent = 'Breathe...';
  heartRates = [];
  heartRateSensor.connect()
    .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(handleHeartRateMeasurement))
    .catch(error => {
      statusText.textContent = error;
    });
  });
}

statusText.addEventListener('click', function() {
  statusText.textContent = 'Breathe...';
  heartRates = [];
  heartRateSensor.connect()
    .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(handleHeartRateMeasurement))
    .catch(error => {
      statusText.textContent = error;
    });
});

*/
//var statusText = document.querySelector('#statusText');
const music = new Audio('voice.mp3');
var booo = document.querySelector('#booo');
var aooo = document.querySelector('#aooo');
var min = 50;
var Max = 120;
/*正常値設定*/
function set(){
  var hmin = document.getElementById('hmin').value;
  var hMax = document.getElementById('hMax').value;
  min = hmin;
  alert("最小値を"+min+"に設定しました");
  localStorage.setItem('min', min);
  Max = hMax;
  alert("最大値を"+Max+"に設定しました");
  localStorage.setItem('Max', Max);
  location.href="heart.html";
}
/*ここまで*/
/*センサーと接続*/
if(location.pathname== "/heart.html"){
  var statusText = document.querySelector('#statusText');
  statusText.addEventListener('click', function() {
  statusText.textContent = 'Breathe...';
  heartRates = [];
  heartRateSensor.connect()
    .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(handleHeartRateMeasurement))
    .catch(error => {
      statusText.textContent = error;
    });
  });
}
/*ここまで*/
/*メインスタート*/
function handleHeartRateMeasurement(heartRateMeasurement) {
  alert("開始");
  if(!localStorage.getItem('min')) {} 
  else {
    min = localStorage.getItem('min');
  }
  if(!localStorage.getItem('Max')) {}
  else {
    Max = localStorage.getItem('Max');
  }
  /*ここまでで設定した正常値と同期*/
  aooo.innerHTML ="<a type= text>正常域："+min+"以上"+Max+"以下</a>" ;
  heartRateMeasurement.addEventListener('characteristicvaluechanged', event => {
    var heartRateMeasurement = heartRateSensor.parseHeartRate(event.target.value);
    statusText.innerHTML = heartRateMeasurement.heartRate + ' &#x2764;';
    /*値をとって文字として表示*/
    if (heartRateMeasurement.heartRate < min || heartRateMeasurement.heartRate > Max) {
      music.play();//警告音を流す
      statusText.textContent = "心拍異常を検出";
      booo.innerHTML = '<a type= button id= stop onClick="stop();">止める</a>';
      /*異常値にいた際の処理*/
      if (typeof navigator.vibrate == 'function') { navigator.vibrate(200); };
    } else {
      music.pause();
      booo.innerHTML = '';
    }
    heartRates.push(heartRateMeasurement.heartRate);
    drawWaves();
  });
}

var heartRates = [];
var mode = 'bar';

canvas.addEventListener('click', event => {
  mode = mode === 'bar' ? 'line' : 'bar';
  drawWaves();
});

function drawWaves() {
  requestAnimationFrame(() => {
    canvas.width = parseInt(getComputedStyle(canvas).width.slice(0, -2)) * devicePixelRatio;
    canvas.height = parseInt(getComputedStyle(canvas).height.slice(0, -2)) * devicePixelRatio;

    var context = canvas.getContext('2d');
    var margin = 2;
    var max = Math.max(0, Math.round(canvas.width / 11));
    var offset = Math.max(0, heartRates.length - max);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#4344d9';
    if (mode === 'bar') {
      for (var i = 0; i < Math.max(heartRates.length, max); i++) {
        var barHeight = Math.round(heartRates[i + offset] * canvas.height / 200);
        context.rect(11 * i + margin, canvas.height - barHeight, margin, Math.max(0, barHeight - margin));
        context.stroke();
      }
    } else if (mode === 'line') {
      context.beginPath();
      context.lineWidth = 6;
      context.lineJoin = 'round';
      context.shadowBlur = '1';
      context.shadowColor = '#333';
      context.shadowOffsetY = '1';
      for (var i = 0; i < Math.max(heartRates.length, max); i++) {
        var lineHeight = Math.round(heartRates[i + offset] * canvas.height / 200);
        if (i === 0) {
          context.moveTo(11 * i, canvas.height - lineHeight);
        } else {
          context.lineTo(11 * i, canvas.height - lineHeight);
        }
        context.stroke();
      }
    }
  });
}

window.onresize = drawWaves;

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    drawWaves();
  }
});
function stop(){
  music.pause();
  booo.innerHTML = '';
  location.href="heart.html";
}

