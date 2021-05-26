function formatDate(now) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekdays[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

function showWeather(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  let currentTemp = response.data.main.temp;
  currentTemp = Math.round(currentTemp);
  let temp = document.querySelector("#current-degree");
  temp.innerHTML = currentTemp;

  let description = document.querySelector("#weather-description");
  description.innerHTML = `${response.data.weather[0].description}`;

  let tempMin = response.data.main.temp_min;
  tempMin = Math.round(tempMin);
  let minTemp = document.querySelector("#min-temp-today");
  minTemp.innerHTML = tempMin;

  let tempMax = response.data.main.temp_max;
  tempMax = Math.round(tempMax);
  let maxTemp = document.querySelector("#max-temp-today");
  maxTemp.innerHTML = tempMax;

  let currentHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = currentHumidity;

  let currentWindSpeed = response.data.wind.speed;
  currentWindSpeed = (currentWindSpeed * 60 * 60) / 1000;
  currentWindSpeed = Math.round(currentWindSpeed);
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = currentWindSpeed;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input-city");

  let apikey = "85890638d00975101c866cb82a4d3716";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apikey}`;
  axios.get(apiUrl).then(showWeather);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apikey = "85890638d00975101c866cb82a4d3716";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`;
  axios.get(apiUrl).then(showWeather);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentDate = document.querySelector("#current-date-time");
let now = new Date();
currentDate.innerHTML = formatDate(now);

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

let button = document.querySelector("button");
button.addEventListener("click", showPosition);
