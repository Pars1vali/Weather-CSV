import { parseCSV, downloadCSV } from './downloadCSV.js'

const apiKey = 'c0f15fe47baadea92789faa12699ad53'

const btnSearch = document.getElementById('getWeather_Btn')
const btnSave = document.getElementById('saveCSV_Btn')

let dataJson
btnSave.hidden = true

btnSearch.addEventListener('click', function (e) {
  e.preventDefault()
  btnSave.hidden = false
  let city = document.getElementById('city').value
  if (city) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`

    fetch(url, {
      method: 'GET',
    })
      .then(function (resp) {
        return resp.json()
      })
      .then(function (data) {
        console.log(data)
        dataJson = data
        document.getElementById('text').innerHTML =
          data['weather']['0']['description'] +
          '  ' +
          Math.round(data['main']['temp']) +
          '°C ' +
          '  ' +
          Math.round(data['wind']['speed']) +
          ' м/с'
      })
  }
})

btnSave.addEventListener('click', function (e) {
  e.preventDefault()
  const csv = parseCSV(dataJson)
  downloadCSV(csv, `${dataJson.name}.csv`)
})
