//last updated
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
//sunrise and sunset

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getUTCHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//local time of searched city
function formatLocalTime(date, timezone) {
  let local = date.getTimezoneOffset() * 60 * 1000;
  let offset = timezone * 1000;
  let time = date.getTime() + local + offset;

  let now = new Date(time);

  let hour = now.getHours();
  let minute = now.getMinutes();

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

  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day}, ${hour}:${minute}`;
}

function changeTempScaleC(event) {
  event.preventDefault();
  document.querySelector(".temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#feels").innerHTML = `${Math.round(
    feelsTemperature
  )}°C`;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function changeScaleF(event) {
  event.preventDefault();
  let temperature = document.querySelector(".temperature");
  let total = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperature.innerHTML = total;
  document.querySelector("#feels").innerHTML = `${Math.round(
    (feelsTemperature * 9) / 5 + 32
  )}°F`;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector(
    "#main-country"
  ).innerHTML = `, ${response.data.sys.country}`;
  document.querySelector(".currentDayTime").innerHTML = formatLocalTime(
    new Date(),
    response.data.timezone
  );

  document.querySelector(".temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  feelsTemperature = response.data.main.feels_like;
  document.querySelector("#feels").innerHTML = `${Math.round(
    feelsTemperature
  )}°C`;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  let wind = response.data.wind.speed;
  let windK = Math.round((wind * 18) / 5);
  document.querySelector("#wind-gust").innerHTML = `${windK}`;

  let localUnixTimestamp = response.data.sys.sunrise + response.data.timezone;

  document.querySelector("#sunrise").innerHTML = formatTime(
    localUnixTimestamp * 1000
  );

  let localUnixTimestampSet = response.data.sys.sunset + response.data.timezone;
  document.querySelector("#sunset").innerHTML = formatTime(
    localUnixTimestampSet * 1000
  );

  document.querySelector("#updated").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".future-temps");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        ` <div class="col">
            <div class="card future-card">
              <div class="card-body forecast-body">
                <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                <span class="card-text">
                  <ul>
                    <li class="future-stats future-description">${
                      forecastDay.weather[0].description
                    }</li>
                    <li class="future-stats future-description"> ${Math.round(
                      forecastDay.temp.max
                    )}° | ${Math.round(forecastDay.temp.min)}°</li>
                    <li class="future-stats future-description">Humidity: <br /> ${
                      forecastDay.humidity
                    }%</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayForecast);
}

function clickNY(event) {
  event.preventDefault();
  let city = "New York";
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function clickLondon(event) {
  event.preventDefault();
  let city = "London";
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function clickParis(event) {
  event.preventDefault();
  let city = "Paris";
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function clickMunich(event) {
  event.preventDefault();
  let city = "Munich";
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

let munich = document.querySelector("#munich");
munich.addEventListener("click", clickMunich);

let paris = document.querySelector("#paris");
paris.addEventListener("click", clickParis);

let london = document.querySelector("#london");
london.addEventListener("click", clickLondon);

let nyc = document.querySelector("#newYork");
nyc.addEventListener("click", clickNY);

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("button");
button.addEventListener("click", showPosition);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeScaleF);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTempScaleC);

let celsiusTemperature = null;
let feelsTemperature = null;

searchCity("Rio de janeiro");
