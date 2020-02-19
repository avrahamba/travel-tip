const KEY = 'AIzaSyCaQVlcIeYewnFSmm3xkL2d3HHy9xhYbz4';

export const locService = {
    getLocs,
    getPosition,
    getReverseGeo
}
function getLocs(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${address}&key=${KEY}`)
        .then(res => res.data.results[0].geometry.location)
}
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}
function getReverseGeo(coords) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${KEY}`)
        .then(res => { return { address: res.data.results[0].formatted_address, coords } })
}