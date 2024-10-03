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
function setQuery(e) {
    // 13 is key code for enter key
    if (e.keyCode == 13) {
        // calling getResults function and passing city name when click enter key
        console.log("Fetching weather for:", searchbox.value); 
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

// fetching the data from weather api
function getResults(query) {
    // qeury carries city name and we passes to the Api url so final url be looks like this 
    // https://api.openweathermap.org/data/2.5/weather?q=London&unit=metric&APPID=9f9189f3ea73cf55b8cc02b2d5091f72

    //so query passes to this URL to get data for the user-entered city name

    fetch(`${api.base_url}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => weather.json())
    .then(displayResults)
    .catch(error => {
        console.error("Error fetching data: ", error);
        alert("City not found or network issue!");
    }); // passing response (weather) object
}



function displayResults(weather) {
    // console.log(typeof weather);

    // accessing weather object and getting data

    // selecting the element and setting the city and country name from api
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // setting current date, see the dateBuilder() function bellow
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    // selecting the element and setting the current temperature of city
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    // selecting the element and setting the current weather of city like, 'sunny', 'cloudy'
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    // selecting the element and setting the current weather description of city
    let weather_description = document.querySelector('.current .description');
    weather_description.innerText = weather.weather[0].description;

    // selecting the element and setting the current weather image/icon of city
    let weather_icon = document.querySelector('.current .weather-icon img');
    //console.log(weather.weather[0].icon);
    weather_icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

    // selecting the element and setting the current min and max temperature of city
    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}

// returns today's date
function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}
