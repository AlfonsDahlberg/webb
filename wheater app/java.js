// unktionalitet för väderhantering
let weather = {
    // API-nyckel 
    "apiKey": "a076e7ee73efffd85d94abf2667ecc44",
    
    // Metod för att hämta väderdata för en uppsökt stad.
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    
    // Metod för att visa väderinformation på webbsidan
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        // Uppdaterar HTML med väderinformation
        document.querySelector(".stad").innerText = "Weather in " + name;
        document.querySelector(".ikon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".beskrivning").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".luftfuktighet").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".vind").innerText = "Windspeed: " + speed + "km/h";
        
        // bytter bakgrund baserat på den sökta staden
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
        
        // tar bort "laddar" skärmen för att vissa väder infon.
        document.querySelector(".vader").classList.remove("laddar");
    },
    
    // startar vädersökning baserat på vad änvendaren söker
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

// eventlistener för sökknappen
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

// Gör så att användaren kan söka med enter knappen och inte bara sök knappen.
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})
