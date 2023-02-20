import { downloadJSON } from './downloadCSV.js'

const apiKey = 'c0f15fe47baadea92789faa12699ad53'
const inputForm = document.getElementById('inputForm')

inputForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let city = document.getElementById('city').value
  if (city) {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`

    console.log(document.getElementById('city').value)
    fetch(url, {
      method: 'GET',
    })
      .then(function (resp) {
        return resp.json()
      })
      .then(function (data) {
        console.log(data)
        downloadJSON(data)
      })
  }
})
