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
  document.querySelector("#wind-gust").innerHTML = `${Math.round(
    (windSpeed * 18) / 5
  )} km/h`;
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
  let windy = document.querySelector("#wind-gust");
  let windyTotal = `${Math.round((windSpeed * 18) / 5 / 1.609)} mph`;
  windy.innerHTML = windyTotal;
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
  windSpeed = response.data.wind.speed;
  let windK = Math.round((windSpeed * 18) / 5);
  document.querySelector("#wind-gust").innerHTML = `${windK} km/h`;

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
  let quote = document.querySelector(".card-footer");
  let icon = document.querySelector("#icon");
  let iconElement = response.data.weather[0].icon;

  if (iconElement === "01d") {
    icon.setAttribute("src", "media/sun.gif");
    icon.setAttribute("alt", "sun gif");
    quote.innerHTML = `“I’ve been watching blue skies come and go." - A-ha`;
  }

  if (iconElement === "01n" || iconElement === "01n") {
    icon.setAttribute("src", "media/night.gif");
    icon.setAttribute("alt", "moon gif");
    quote.innerHTML = `"There's a moon in the sky, it’s called the moon.” - The B-52’s`;
  }
  if (iconElement === "02d" || iconElement === "03d") {
    icon.setAttribute("src", "media/cloudy.gif");
    icon.setAttribute("alt", "cloud gif");
    quote.innerHTML = `“Like the sun coming out, I just know that something good is gonna happen, we’ve been cloudbusting.” - Kate Bush`;
  }

  if (iconElement === "02n" || iconElement === "03n") {
    icon.setAttribute("src", "media/cloudy-night.gif");
    icon.setAttribute("alt", "cloudy night gif");
    quote.innerHTML = `"A cloud appears above your head, a beam of light comes shining down on you.” - A Flock of Seagulls`;
  }

  if (iconElement === "04d" || iconElement === "04n") {
    icon.setAttribute("src", "media/clouds.gif");
    icon.setAttribute("alt", "cloudy gif");
    quote.innerHTML = `“Into the cloudburst overhead, I wanna get my face wet, there’s gonna be a cloudburst here,” - Thomas Dolby`;
  }

  if (iconElement === "09d" || iconElement === "09n") {
    icon.setAttribute("src", "media/drizzle.gif");
    icon.setAttribute("alt", "drizzle gif");
    quote.innerHTML = `"Open the sky and let her come down, here comes the rain, here she comes again.” - The Cult`;
  }

  if (iconElement === "10d" || iconElement === "10n") {
    icon.setAttribute("src", "media/rain.gif");
    icon.setAttribute("alt", "rain gif");
    quote.innerHTML = `“Here comes the rain again, falling on my head like a memory.” - Eurythmics`;
  }

  if (iconElement === "11d" || iconElement === "11n") {
    icon.setAttribute("src", "media/storm.gif");
    icon.setAttribute("alt", "thunder gif");
    quote.innerHTML = `“Can't you hear, can't you hear the thunder? You better run, you better take cover.” - Men at Work`;
  }

  if (iconElement === "13d" || iconElement === "13n") {
    icon.setAttribute("src", "media/snow.gif");
    icon.setAttribute("alt", "snow gif");
    quote.innerHTML = `“And the ground is frozen through, and you’re driven, like the snow, pure in heart.” - Sisters of Mercy`;
  }

  if (iconElement === "50d" || iconElement === "50n") {
    icon.setAttribute("src", "media/foggy.gif");
    icon.setAttribute("alt", "foggy gif");
    quote.innerHTML = `"My head's in the clouds, yeah I get misty just holding your hand.” - Dead or Alive`;
  }

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
  let pop = document.querySelector(".nav");
  pop.innerHTML = "Everybody talk about pop music!";
  let city = "New York";
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function clickLondon(event) {
  event.preventDefault();
  let pop = document.querySelector(".nav");
  pop.innerHTML = "Everybody talk about pop music!";
  let city = "London";
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function clickParis(event) {
  event.preventDefault();
  let pop = document.querySelector(".nav");
  pop.innerHTML = "Everybody talk about pop music!";
  let city = "Paris";
  let key = "bd72cea685abd0c8d8f5b8f11becd620";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function clickMunich(event) {
  event.preventDefault();
  let pop = document.querySelector(".nav");
  pop.innerHTML = "Everybody talk about pop music!";
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
let windSpeed = null;

searchCity("Rio de janeiro");
