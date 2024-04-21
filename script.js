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
        getFiveDayForcast(data.coord.lat, data.coord.lon) //looping back into the previous function to create and argument for the  params
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
console.log(dataParam)
}