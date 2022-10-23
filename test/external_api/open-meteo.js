const axios = require('axios');

async function start_open_meteo() {
    console.log("start_book")
    call_open_meteo()
}

async function call_open_meteo() {
    console.log("call_open_meteo")

    const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&hourly=temperature_2m&timezone=Asia%2FTokyo')
    console.log("response", JSON.stringify(response.data, null, 2))
}

module.exports = {
    start_open_meteo
}

