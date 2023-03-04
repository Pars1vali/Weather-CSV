import { parseCSV, downloadCSV } from './src/Downloader.js'

let dataJson
const btnSearch = document.getElementById('getWeather_Btn')
const btnSave = document.getElementById('saveCSV_Btn')

btnSave.hidden = true

const apiKey = 'c0f15fe47baadea92789faa12699ad53'
btnSearch.addEventListener('click', function (e) {
  e.preventDefault()

  const city = document.getElementById('city').value
  if (city) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`

    fetch(url, {
      method: 'GET',
    })
      .then(function (resp) {
        return resp.json()
      })
      .then(function (data) {
        dataJson = data
        btnSave.hidden = false

        let weatherState = document.getElementById('weather_state_text')
        const weatherIcon = document.getElementById('weather_state_icon')
        const weatherDesc = data['weather']['0']['description']

        weatherState.innerHTML =
          weatherDesc[0].toUpperCase() +
          weatherDesc.slice(1) +
          ' ' +
          Math.round(data['main']['temp']) +
          '°C ' +
          ' ' +
          Math.round(data['wind']['speed']) +
          ' м/с'

        let id = dataJson['weather'][0]['id']
        switch (true) {
          case /\b2\d\d/.test(id): // молнии
            weatherIcon.innerText = '🌩️'
            break
          case /\b3\d\d/.test(id): // морось
            weatherIcon.innerText = '🌧️'
            break
          case /\b5\d\d/.test(id): // дождь
            weatherIcon.innerText = '⛈️'
            break
          case /\b6\d\d/.test(id): // снег
            weatherIcon.innerText = '🌨️'
            break
          case /\b7\d\d/.test(id): // атмосферные явления
            weatherIcon.innerText = '💨'
            break
          case id == 800:
            weatherIcon.innerText = '☀️'
            break
          case /\b80\d/.test(id):
            weatherIcon.innerText = '☁️'
            break
          default:
            break
        }
      })
  }
})

btnSave.addEventListener('click', function (e) {
  e.preventDefault()

  const csv = parseCSV(dataJson)
  downloadCSV(csv, `${dataJson.name}.csv`)
})
