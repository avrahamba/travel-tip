
import locService from './services/loc.service.js'
import { mapService } from './services/map.service.js'



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
            mapService.initMap(lat, lng);
        })
        // .then(() => {
        //     mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        // })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    const nameLocation = document.querySelector('.name-location').value;
    locService.getLocs(nameLocation)
        .then((loc) => mapService.panTo(loc));
})
