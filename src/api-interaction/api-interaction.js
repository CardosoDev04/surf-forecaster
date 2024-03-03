
const testLocation = {
    lat : 38.659727,
    long : -9.25404
}
const baseURL = "https://marine-api.open-meteo.com/v1/marine?"
async function getWaveData(time,lat,long) {
    const url = baseURL + `latitude=${lat}&longitude=${long}&${time}=wave_height,wave_direction,wave_period`

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function getCurrentWaveForecast(lat,long){
    const res = await getWaveData("current",lat,long);
    const data = res.current;

    return {
        height: data.wave_height,
        direction: data.wave_direction,
        period: data.wave_period
    }
}

async function getDailyWaveForecast(lat,long){
    const data = await getWaveData("hourly",lat,long);
    const hourlyData = data.hourly;

    const timeArray = hourlyData.time;
    const heightArray = hourlyData.wave_height;
    const directionArray = hourlyData.wave_direction;
    const periodArray = hourlyData.wave_period;


    let resultSet = [];

    for(let i = 0; i <= 23; i++){
        const time = timeArray[i];
        const height = heightArray[i];
        const direction = directionArray[i];
        const period = periodArray[i];

        const objOut = {
            time : time,
            height: height,
            direction: direction,
            period: period
        }
        resultSet.push(objOut);
    }
    return resultSet;
}

export {
    getDailyWaveForecast,
    getWaveData,
    getCurrentWaveForecast
}

