const W_KEY = '3a42f7c7c101af6259a6c25a835b449e';

export const weatherService = {
    getWeather
}

function getWeather(location) {
    let {lat,lng} = location;
    if (typeof lat === 'function') lat = lat();
    if (typeof lng === 'function') lng = lng();
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${W_KEY}&units=metric`
    return axios.get(url)
        .then(res => res.data)
        .then(data=>{
            return {
                location:data.name,
                country:data.sys.country,
                description:data.weather[0].description,
                icon:data.weather[0].icon,
                temp:data.main.temp,
                'min-temp':data.main.temp_min,
                'max-temp':data.main.temp_max,
                wind:data.wind.speed,
            }
        })
}


