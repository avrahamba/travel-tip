var locs = [{ lat: 11.22, lng: 22.11 }]
const KEY = 'AIzaSyCaQVlcIeYewnFSmm3xkL2d3HHy9xhYbz4';

function getLocs(address) {
    return axios.get(`maps.googleapis.com/maps/api/geocode/json?&address=${address}&key=${KEY}`)
        .then(res => console.log(res))
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}



export default {
    getLocs: getLocs,
    getPosition: getPosition
}