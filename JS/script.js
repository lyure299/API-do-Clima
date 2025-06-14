// Variáveis
const apiKey = "007352a0c02db50996da5e1d58bafcf0";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const response = await fetch(apiWeatherURL);
    const data = await response.json();
    return data;
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );

    // 🔁 API NOVA DE BANDEIRAS (FLAGCDN)
    const countryCode = data.sys.country.toLowerCase();
    countryElement.setAttribute("src", `https://flagcdn.com/48x36/${countryCode}.png`);
    countryElement.setAttribute("alt", `Bandeira de ${data.sys.country}`);
    countryElement.setAttribute("title", `País: ${data.sys.country}`);

    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} Km/h`;

    weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city !== "") {
        showWeatherData(city);
    }
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value.trim();
        if (city !== "") {
            showWeatherData(city);
        }
    }
});
