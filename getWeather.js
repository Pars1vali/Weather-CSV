//import { downloadJSON } from './downloadCSV.js'

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
        // console.log(data['weather']['0']['description'])
        // console.log(data['main']['temp'])
        // console.log(data['wind']['speed'])
        document.getElementById('text').innerHTML =
          data['weather']['0']['description'] +
          '  ' +
          data['main']['temp'] +
          '°C ' +
          '  ' +
          data['wind']['speed'] +
          ' м/с'
      })
  }
})

btnSave.addEventListener('click', function (e) {
  e.preventDefault()
  //downloadJSON(dataJson)
  console.log('csv')
})
