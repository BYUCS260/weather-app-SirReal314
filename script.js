const APIKEY = "154e651bb5bd8563f5737f01e974a78c";

var resultsObject; /*delete when ready*/
var forecastObject; /*delete when ready*/

function search(source) {
  const value = document.getElementById(source).value;
  if (value === "") return;
  console.log(value);

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    value +
    ",US&units=imperial" +
    "&APPID=" +
    APIKEY;
  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("You done messed up A-A-Ron. Pick a real US city.");
      }
      document
        .getElementsByClassName("WelcomeMsg")[0]
        .setAttribute("hidden", "");
      return response.json();
    })
    .then(function (json) {
      resultsObject = json; /*delete when ready*/
      let results = "";
      results +=
        '<h2 id="weatherTitle">Current Weather in ' + json.name + "</h2>";
      results += "<div class=degAndIcon>";
      results += "<h2>" + Math.round(json.main.temp * 10) / 10 + " &deg;F</h2>";
      for (let i = 0; i < json.weather.length; i++) {
        results +=
          '<img src="https://openweathermap.org/img/w/' +
          json.weather[i].icon +
          '.png"/>';
      }
      results += "</div>";
      results += "<div class='degAndIcon'>";
      results +=
        "<p class='big'>Feels Like " +
        Math.round(json.main.feels_like * 10) / 10 +
        " &deg;F</p>";
      results += "<p class='big mainDescrip'>";
      for (let i = 0; i < json.weather.length; i++) {
        results += json.weather[i].description;
        if (i !== json.weather.length - 1) results += ", ";
      }
      results += "</p>";
      results += "</div>";
      results += "<div class='degAndIcon'>";
      results +=
        "<p>Min " + Math.round(json.main.temp_min * 10) / 10 + " &deg;F</p>";
      results += "<p>Humidity " + json.main.humidity + "%</p>";
      results += "</div>";
      results += "<div class='degAndIcon'>";
      results +=
        "<p>Max " + Math.round(json.main.temp_max * 10) / 10 + " &deg;F</p>";
      results += "<p>Wind " + Math.round(json.wind.speed * 10) / 10 + "MPH</p>";
      results += "</div>";
      document.getElementById("weatherResults").innerHTML = results;
      document.getElementById("weatherResults").removeAttribute("hidden");
    })
    .catch(function (error) {
      alert(error);
    });

  const url2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    value +
    ", US&units=imperial" +
    "&APPID=" +
    APIKEY;
  fetch(url2)
    .then(function (response) {
      return response.json(); /*delete when ready*/
    })
    .then(function (json) {
      forecastObject = json;
      let forecast = "";
      for (let i = 0; i < json.list.length; i++) {
        forecast += '<div class="forecastBox">';
        forecast +=
          "<h2>" +
          moment(json.list[i].dt_txt).format("MMMM Do") +
          "<br>" +
          moment(json.list[i].dt_txt).format("h A") +
          "</h2>";
        forecast += "<div class='degAndIcon'>";
        forecast +=
          "<h4>" +
          Math.round(json.list[i].main.temp * 10) / 10 +
          " &deg;F</h4>";
        forecast +=
          '<img src="https://openweathermap.org/img/w/' +
          json.list[i].weather[0].icon +
          '.png"/>';
        forecast += "</div>";
        forecast += "<div class='degAndIcon'>";
        forecast +=
          "<h5>Feels Like<br>" +
          Math.round(json.list[i].main.feels_like * 10) / 10 +
          " &deg;F</h5>";
        forecast +=
          "<h5 class='mainDescrip'>" + json.list[i].weather[0].main + "</h5>";
        forecast += "</div>";
        forecast += "</div>";
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
}

document
  .getElementById("weatherSubmit")
  .addEventListener("click", function (event) {
    event.preventDefault();
    search("weatherInput");
  });

document
  .getElementById("navSearchButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    search("navInput");
  });
