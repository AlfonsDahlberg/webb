
// hämtar all data ifrån openweathers api med hjälp av queryselector och 
// variabel för vad användaren skriver
let weather = {
    "apiKey": "a076e7ee73efffd85d94abf2667ecc44",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));

    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // vad som kommer att displayas när använder söker upp en viss stad
        document.querySelector(".stad").innerText = "Weather In " + name;
        document.querySelector(".ikon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".beskrivning").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".luftfuktighet").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".vind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".vader").classList.remove("laddar");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
           
    }
}
// lägger en addventlistener för att läsa in när användaren klickar på sök knappen
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();   

});
// gör så att man kan söka med enter knappen och inte bara search knappen.
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})