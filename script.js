document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
    document.getElementById('city-input').value = '';
});

function getWeather(city) {
    const apiKey = '62e39a460994fa6bbd06ea1d60166c70'; // Your provided API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
            addCityToHistory(city);
        })
        .catch(error => console.error('Error fetching current weather:', error));

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => displayForecast(data))
        .catch(error => console.error('Error fetching weather forecast:', error));
}

function displayCurrentWeather(data) {
    const weatherSection = document.getElementById('current-weather');
    weatherSection.innerHTML = `
        <div class="weather-card">
            <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}

function displayForecast(data) {
    const weatherSection = document.getElementById('future-weather');
    weatherSection.innerHTML = '<h2>5-Day Forecast</h2>';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        weatherSection.innerHTML += `
            <div class="weather-card">
                <h2>${new Date(forecast.dt_txt).toLocaleDateString()}</h2>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="weather icon">
                <p>Temperature: ${forecast.main.temp} °C</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
                <p>Wind Speed: ${forecast.wind.speed} m/s</p>
            </div>
        `;
    }
}

function addCityToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherHistory', JSON.stringify(history));
    }
    
    renderSearchHistory();
}

function renderSearchHistory() {
    const historySection = document.getElementById('search-history');
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];

    historySection.innerHTML = '';
    history.forEach(city => {
        const cityButton = document.createElement('button');
        cityButton.textContent = city;
        cityButton.addEventListener('click', () => getWeather(city));
        historySection.appendChild(cityButton);
    });
}

// Initial render of search history
renderSearchHistory();
