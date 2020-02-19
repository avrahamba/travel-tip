
import locService from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'



window.onload = () => {
    locService.getPosition()
        .then(pos => {
            return pos.coords;
        })
        .catch(err => {
            console.log('err!!!', err);
        })
        .then(coords => {
            const lat = coords.latitude;
            const lng = coords.longitude;
            return mapService.initMap(lat, lng);
        })
        .then(map => {mapService.addMarker(map.center)
        return map;
        })
        .then(map => weatherService.getWeather(map.center))
        .then(renderWeather)
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    const nameLocation = document.querySelector('.name-location').value;
    locService.getLocs(nameLocation)
        .then(loc => {mapService.panTo(loc);
        return loc
        })
        .then(loc=>weatherService.getWeather(loc))
        .then(renderWeather)
})

function renderWeather(watherObj){
    console.log(watherObj);
    
    document.querySelector('.weather').innerHTML = 
    `
    <h2>Weather today</h2>
    <img src="https://openweathermap.org/img/wn/${watherObj.icon}@2x.png" alt="">
    <div class="weather-text">
        <p>
            <span class="location">${watherObj.location}</span>
            <img src="https://www.countryflags.io/${watherObj.country}/flat/32.png" alt="">
            <span class="description">${watherObj.description}</span>
        </p>
        <p>
            <span class="temp">${watherObj.temp}</span>
            <span class="min-max-temp">${watherObj['min-temp']}</span>
            <span class="wind">${watherObj.wind}</span>
        </p>
    </div>
    `
}
