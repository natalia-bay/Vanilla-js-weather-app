function formatDay(date) {
  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayIndex];
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentTime = new Date();
let dayElement = document.querySelector("#day1");
dayElement.innerHTML = formatDay(currentTime);

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#tempMax").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#tempMin").innerHTML = Math.round(
    response.data.main.temp_min
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
  document.querySelector("#degrees-now").innerHTML = Math.round(
    response.data.main.temp
  );
  celciusTemp = response.data.main.temp;
}

function displayForecast(response) {
  reset();
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `      
     <div class="col-2 hour">
        <div class="hour-unit">${formatHours(forecast.dt * 1000)}</div>
        <div class="weather-icon"><img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      /></div>
        <div class="hourly-temp-max"><strong>${Math.round(
          forecast.main.temp_max
        )}°</strong></div>
        <div class="hourly-temp-min">${Math.round(
          forecast.main.temp_min
        )}°</div>
      </div>`;
  }
}

function showError() {
  document.querySelector(".error").style = `display:block`;
}

function reset() {
  document.querySelector(".error").style = `display: none`;
}

function getWeather(city) {
  let units = `metric`;
  let apiKey = "7345ee018fd528da4cd97bec34042c86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather).catch(showError);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast).catch(showError);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  getWeather(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchLocation);
}

function fetchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "7345ee018fd528da4cd97bec34042c86";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees-now");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displyCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degrees-now");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let celciusLink = document.querySelector("#temp-cel");
celciusLink.addEventListener("click", displyCelciusTemp);

let fahrenheitLink = document.querySelector("#temp-fahr");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

getWeather("Cologne");
