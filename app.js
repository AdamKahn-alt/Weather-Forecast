"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const app = document.querySelector(".app");
  const form = document.querySelector(".search");
  const cityInput = document.querySelector("#city");
  const countryInput = document.getElementById("country");
  const submitBtn = document.querySelector(".btn");

  const weatherSection = document.querySelector(".weather");
  const weatherDialogueBox = document.getElementById("weather-dialogue-box");
  const weatherCard = document.querySelector(".weather-card");
  const weatherMain = document.querySelector(".weather-main");
  const iconEl = document.getElementById("icon-img");

  const tempValue = document.querySelector(".temp .value");
  const tempUnit = document.querySelector(".temp .unit");

  const locationEl = document.querySelector(".location");
  const cityLabel = document.querySelector(".city");
  const conditionLabel = document.querySelector(".condition");

  const feelsLikeEl = document.querySelector("[data-field='feels-like']");
  const humidityEl = document.querySelector("[data-field='humidity']");
  const windEl = document.querySelector("[data-field='wind']");
  const pressureEl = document.querySelector('[data-field="pressure"]');

  const hint = document.querySelector(".hint");
  const appFooter = document.querySelector(".app-footer");
  const appTitle = document.querySelector(".app-title");
  const appSubtitle = document.querySelector(".app-subtitle");

  /*  function showTheWeatherSection() {
    weatherDialogueBox.style.display = "block";
  }
  submitBtn.addEventListener("click", showTheWeatherSection);*/

  const API_KEY = "ff674cb0090ea30e4d1ce025ae052445";

  form.addEventListener("submit", async (e) => {
    weatherDialogueBox.style.display = "block";
    e.preventDefault();
    const userCity = cityInput.value;
    const data = await getWeather(userCity);
    console.log(data);

    displayWeatherInfo(data);
  });

  async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);

    const data = await res.json();

    if (data.cod === "404" || data.cod === 404) {
      throw new Error("City not found");
    }

    return data;
  }

  function displayWeatherInfo(weatherInfo) {
    const iconCode = weatherInfo.weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    cityLabel.textContent = weatherInfo.name;
    countryInput.textContent = weatherInfo.sys.country;
    conditionLabel.textContent = weatherInfo.weather[0].description;
    tempValue.textContent = weatherInfo.main.temp;
    feelsLikeEl.textContent = weatherInfo.main.feels_like + "°c";
    humidityEl.textContent = weatherInfo.main.humidity + "%";
    pressureEl.textContent = weatherInfo.main.pressure + "hPa";
    windEl.textContent = weatherInfo.wind.speed + "km/h";
    iconEl.src = weatherIconUrl;
    weatherSection.classList.add("active");
  }
});
