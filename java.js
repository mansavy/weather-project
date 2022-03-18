let h3 = document.querySelector(".currentDayTime");
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h3.innerHTML = `${day} ${hour}:${minute}`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minute = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${minute}`;
}

function changeTempScale(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = "-10";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTempScale);

function changeScale(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let temp = temperature.innerHTML;
  let total = Math.round((temp * 9) / 5 + 32);
  temperature.innerHTML = total;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeScale);

function displayWeather(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector(
    "#main-country"
  ).innerHTML = `, ${response.data.sys.country}`;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  let wind = response.data.wind.speed;
  let windK = Math.round((wind * 18) / 5);
  document.querySelector("#wind-gust").innerHTML = `${windK}`;

  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  document.querySelector("#updated").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function searchCity(city) {
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

function getPosition(response) {
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  axios.get(url).then(displayWeather);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", showPosition);

searchCity("Rio de janeiro");
