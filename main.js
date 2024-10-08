// paste your secret key
const api = {
    key: "d8973e08f2ba0e8f02819e50c56bc08a", // your secrete key here
    base_url: "https://api.openweathermap.org/data/2.5/",
}

// selecting the inputbox
const searchbox = document.querySelector(".search-box");

//adding keypress event listener to inputbox
searchbox.addEventListener("keydown", setQuery);

// when user enter city and and click the enter key then getResults function will invoked
// Set query when Enter key is pressed
function setQuery(e) {
    // 13 is keycode for Enter key
    if (e.keyCode == 13) {
        console.log("Fetching weather for:", searchbox.value);
        getResults(searchbox.value); // Fetch results when Enter is pressed
    }
}

// Fetching the data from the weather API
function getResults(query) {
    // Fetching weather data from OpenWeatherMap API
    fetch(`${api.base_url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json()) // Convert response to JSON
        .then(weather => {
            if (weather.cod === '404') {
                // Display error message if city is not found
                displayError("City not found. Please try again.");
            } else {
                // Display weather data if successful
                displayResults(weather);
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            displayError("Network issue or city not found!");
        });
}

// Function to display weather results on the page
function displayResults(weather) {
    // Selecting the elements and setting city and country
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Setting the current date using dateBuilder function
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    // Setting the current temperature of the city
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    // Setting the current weather condition (e.g., 'Sunny', 'Cloudy')
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    // Setting the weather description (e.g., 'clear sky', 'light rain')
    let weather_description = document.querySelector('.current .description');
    weather_description.innerText = weather.weather[0].description;

    // Setting the weather icon based on current conditions
    let weather_icon = document.querySelector('.current .weather-icon img');
    weather_icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

    // Setting the min and max temperature
    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    // Clear any previous error message when results are displayed
    clearError();
}

// Display an error message on the page
function displayError(message) {
    let errorElement = document.querySelector('.location .city');
    errorElement.innerText = message;
}

// Clear the error message when valid results are displayed
function clearError() {
    let errorElement = document.querySelector('.location .city');
    if (errorElement.innerText.includes("not found")) {
        errorElement.innerText = ''; // Clear the error message
    }
}

// Returns today's date in a readable format
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}

