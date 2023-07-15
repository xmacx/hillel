// HW 54. Ajax Weather
// За допомогою ajax-запиту вивести погоду
// http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19
// q=XXX - місто, для якого показати погоду
// temp – температура
// pressure - тиск
// description – опис
// humidity – вологість
// speed – швидкість вітру
// deg - напрям у градусах
// icon - значок, де 10d код іконки
// http://openweathermap.org/img/w/10d.png

function getWeatherData ({ appId, city, units = 'metric', lang = 'en', icon = 'https://openweathermap.org/img/w/10d.png'}) {
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&APPID=${appId}`;

  return fetch(url)
  .then(res => res.json())
  .then(data => {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes();

    const weatherParams = {
      city: data.name,
      temp: Math.round(data.main.temp),
      pressure: data.main.pressure,
      description: data.weather[0].description, 
      humidity: data.main.humidity, 
      speed: data.wind.speed,
      deg: data.wind.deg,
      icon: icon,
      time: time
    }
    return weatherParams;
  })
  .catch(err => {
    alert(err);
  });
}

function getWeatherTemplate ({ city, temp, pressure, description, humidity, speed, deg, icon, time }) {
  return `
  <div class="weather-app">        
      <div class="weather-app-header">
        <div class="weather-app__icon">
          <img src="${icon}" alt="${description}">
        </div>
        <span class="weather-app__time">${time}</span>        
      </div>
      <div class="weather-app-main">
        <div class="weather-app__temp">${temp}&deg;</div>
        <div class="weather-app__city">${city}</div>
      </div>
      <div class="weather-app-add">
        <div class="weather-app__description">Погода: ${description}</div>
        <div class="weather-app__pressure">Тиск: ${pressure} мм</div>
        <div class="weather-app__humidity">Вологість: ${humidity}%</div>
        <div class="weather-app__speed">Швидкість вітру: ${speed} м/с</div>
        <div class="weather-app__deg">Напрям вітру: ${deg}&deg;</div>
      </div>
  </div>
  `;
} 

const updateApp = (data) => {
  const weatherData = data
  .then( (data) => {
    const appContainer = document.querySelector('.app');
    appContainer.innerHTML = getWeatherTemplate(data);
  });
}
  
const cityWeather = getWeatherData({
  appId: '5d066958a60d315387d9492393935c19', 
  city: 'Lviv', 
  units: 'metric',
  lang: 'ua',
  icon: 'https://openweathermap.org/img/w/10d.png'
});

updateApp(cityWeather);