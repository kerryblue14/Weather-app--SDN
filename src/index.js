function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let day = days[date.getDay()];
  let hour = [date.getHours()];
  let minute = [date.getMinutes()];
  let month = months[date.getMonth()];
  let dayDate = [date.getDate()];
  return (currentDate = `${day}, ${dayDate} ${month} ${hour}:${minute}`);
}
let now = new Date();
let currentDate = document.querySelector("#today");
currentDate.innerHTML = formatDate(now);

//question : the time format that the app is display is weird there is no zero
//infront of the time e.g. 17:6 for 17:06 pm. How do I correct this?

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (cityInput.value) {
    h1.innerHTML = `${cityInput.value}`;
    searchWeather(cityInput.value);
  } else {
    h1.innerHTML = null;
  }
}
let form = document.querySelector("#city-selector");
form.addEventListener("submit", searchCity);

function searchWeather(city) {
  let apiKey = "70b7d9657fab85757e7a28d70b47e52f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

// for current location button
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "70b7d9657fab85757e7a28d70b47e52f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemp);
}

function currentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let location = response.data.name;
  let h3 = document.querySelector("h3");
  h3.innerHTML = currentTemp;
  let h1 = document.querySelector("h1");
  h1.innerHTML = location;
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let btnCurrent = document.querySelector("#location-button");
btnCurrent.addEventListener("click", getPosition);

