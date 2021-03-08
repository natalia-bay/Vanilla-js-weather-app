// to do
// add temperature conversion for forecast

function formatDay(timestamp) {
  let dateValue = new Date(timestamp);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let dayIndex = days[dateValue.getDay()];
  let now = `${dayIndex}`;
  return now;
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

function formatLocalHours(timeZone, datetime) {
  let now = new Date();
  if (datetime !== null) {
    now = new Date(datetime * 1000);
  }
  let timeZoneOffsetInMs = now.getTimezoneOffset() * 60 * 1000;
  let timeZoneInMs = timeZone * 1000;
  let convertedTime = now.getTime() + timeZoneOffsetInMs + timeZoneInMs;
  return convertedTime;
}

function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
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

  let cityLatitude = response.data.coord.lat;
  let cityLongitude = response.data.coord.lon;

  let apiKey = "7345ee018fd528da4cd97bec34042c86";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=current,minutely,hourly,alerts&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayDailyForecast);

  let localTimeStamp = formatLocalHours(response.data.timezone, null);
  let timeAtLocation = formatHours(localTimeStamp);
  console.log(timeAtLocation);
  locationDateTimeStamp = localTimeStamp;
  document.querySelector("#local-time").innerHTML = timeAtLocation;

  //set background gradient
  let hours = timeAtLocation.split(":")[0];

  if (hours >= 5 && hours < 9) {
    document.body.style.background =
      "radial-gradient(circle at 10% 20%, rgb(248, 213, 214) 0%, rgb(243, 242, 229) 90%)";
    //document.querySelector(".sun").style.display = "initial";
  } else if (hours >= 9 && hours < 16) {
    document.body.style.background =
      "linear-gradient(to top, #00c6fb 0%, #005bea 100%)";
  } else if (hours >= 16 && hours < 20) {
    document.body.style.background =
      "radial-gradient(circle at 10% 20%, rgba(0, 149, 218, 0.85) 9.9%, rgb(56, 80, 114) 100.3%)";
  } else {
    document.body.style.backgroundColor = "#010028";
    document.body.style.backgroundImage =
      "radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%)";
    document.body.style.backgroundSize =
      "4px 4px, 3px 3px, 5px 5px, 3px 3px, 6px 6px, 4px 4px, 5px 5px, 4px 4px, 6px 6px, 3px 3px, 5px 5px, 4px 4px, 3px 3px, 6px 6px, 5px 5px, 4px 4px, 5px 5px, 6px 6px";
    document.body.style.backgroundPosition =
      "20% 10%, 5% 20%, 10% 75%, 22% 35%, 30% 30%, 40% 50%, 45% 20%, 65% 20%, 85% 30%, 98% 90%, 20% 80%, 50% 80%, 75% 80%, 89% 75%, 90% 95%, 60% 70%, 65% 40%, 90% 20%";
    document.body.style.backgroundRepeat = "no-repeat";
    //("ease-in 0.3s infinite" to{document.body.style.backgroundImage = "radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%),radial-gradient(circle, #fff 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, #fff 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, #fff 20%, transparent 30%)  radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, #fff 20%, transparent 30%), radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, #fff 20%, transparent 30%),  radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%) radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, #fff 20%, transparent 30%),radial-gradient(circle, rgba(255,255,255,0.7) 20%, transparent 30%), radial-gradient(circle, #fff 20%, transparent 30%), radial-gradient(circle, #fff 20%, transparent 30%)"};
    // )
  }
}

function displayHourlyForecast(response) {
  reset();
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 8; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `      
     <div class="col-1 hour">
        <div class="hour-unit">${formatHours(
          formatLocalHours(
            response.data.city.timezone,
            response.data.list[index].dt
          )
        )}</div>
        <div class="weather-icon"><img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      /></div>
        <div class="hourly-temp-max"><strong>${Math.round(
          forecast.main.temp_max
        )}°</strong></div>
      </div>`;
  }
}

function displayDailyForecast(response) {
  let dailyForecastElement = document.querySelector("#daily-forecast");
  dailyForecastElement.innerHTML = null;
  let dailyForecastArray = null;

  for (let index = 0; index < 5; index++) {
    dailyForecastArray = response.data.daily[index];
    dailyForecastElement.innerHTML += `
    <div class="col-2" id="date">
      <div class= "week-day">
      ${formatDay(dailyForecastArray.dt * 1000)}
      </div>
      <div>
      <img class="weather-icon" src="http://openweathermap.org/img/wn/${
        dailyForecastArray.weather[0].icon
      }@2x.png" alt="${dailyForecastArray.weather[0].description}">
      </div>
      <div class="daily-temp-max"> ${Math.round(dailyForecastArray.temp.max)}°
        </div>
  <div class="daily-temp-min"> ${Math.round(dailyForecastArray.temp.min)}°
        </div>
    `;
  }

  //add glowing border for today
  if ((response.data.daily = [0])) {
    document.getElementById("date").style.boxShadow = "0px 0px 7px #F4BF9D";
  }
}

function showError() {
  document.querySelector(".error").style = `display:block`;
}

function reset() {
  document.querySelector(".error").style = `display: none`;
  document.querySelector("#cloud-circle1").style = `display: none`;
  document.querySelector("#cloud-circle2").style = `display: none`;
  document.querySelector("#cloud-circle3").style = `display: none`;
  document.querySelector("#mist").style = `display: none`;
  document.querySelector(".sun").style = `display: none`;
}

function getWeather(city) {
  let units = `metric`;
  let apiKey = "7345ee018fd528da4cd97bec34042c86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather).catch(showError);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayHourlyForecast).catch(showError);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayHourlyForecast);
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
