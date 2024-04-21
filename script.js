function todaysWeather() {
        const apiKey = '62e39a460994fa6bbd06ea1d60166c70'
        const searchCity = document.querySelector("#search-bar").value 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`).then((response) => response.json()).then((data) => {
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = `${data.main.temp}°` 
        document.querySelector(".humidity").innerHTML = `Humidity: ${data.main.humidity}%`
        document.querySelector(".wind").innerHTML = `${data.wind.speed} KPH`
        console.log(data)
        console.log(data.coord.lat)
        console.log(data.coord.lon)
        getFiveDayForcast(data.coord.lat, data.coord.lon) //looping back into the previous function to create and argument for the 
})
}
document.addEventListener("DOMContentLoaded", function(){
    const searchBTN = document.querySelector("#searchBTN")
    searchBTN.addEventListener("click", todaysWeather)})

function getFiveDayForcast(latParam, logParam) {
        const apiKey = '62e39a460994fa6bbd06ea1d60166c70'
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latParam}&lon=${logParam}&appid=${apiKey}`).then((response) => response.json()).then((data) => {
        displayFiveDayForcast(data)
}
)}
function displayFiveDayForcast(dataParam) {
        const forecastList = dataParam.list;
        const forecastData = forecastList.filter(item => item.dt_txt.includes('12:00:00')); // Filter to get one forecast per day
    
        // Clear any previous forecast data
        const forecastContainer = document.querySelector(".five-day-forcast");
        forecastContainer.innerHTML = "";
    
        // Loop through each day's forecast data and display it
        forecastData.forEach(item => {
            const date = new Date(item.dt * 1000); // Convert timestamp to date
            const temperature = item.main.temp; // Temperature in Kelvin, convert as needed
            const description = item.weather[0].description; // Weather description
    
            // Create elements to display the forecast
            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
    
            const forecastDate = document.createElement("div");
            forecastDate.classList.add("forecast-date");
            forecastDate.textContent = date.toDateString();
    
            const forecastTemperature = document.createElement("div");
            forecastTemperature.classList.add("forecast-temperature");
            forecastTemperature.textContent = `${temperature} °C`;
    
            const forecastDescription = document.createElement("div");
            forecastDescription.classList.add("forecast-description");
            forecastDescription.textContent = description;
    
            // Append elements to the forecast container
            forecastItem.appendChild(forecastDate);
            forecastItem.appendChild(forecastTemperature);
            forecastItem.appendChild(forecastDescription);
            forecastContainer.appendChild(forecastItem);
        });
    }
// function displayFiveDayForcast(dataParam) {
// console.log(dataParam)
// }