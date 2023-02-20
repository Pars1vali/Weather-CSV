import { Parser } from '@json2csv/plainjs'

export function downloadJSON(data) {
  let a = document.createElement('a')
  let json = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  })
  a.href = URL.createObjectURL(json)
  a.download = `${data.name}.json`
  a.click()

  try {
    const parser = new Parser()
    const csv = parser.parse(data)
    console.log(csv)
    // тут скачивание csv
    downloadBlob(csv, `${data.name}.csv`, 'text/csv;charset=utf-8;')
  } catch (err) {
    console.error(err)
  }
}

function downloadBlob(content, filename, contentType) {
  // Create a blob
  var blob = new Blob([content], { type: contentType })
  var url = URL.createObjectURL(blob)

  // Create a link to download it
  var pom = document.createElement('a')
  pom.href = url
  pom.setAttribute('download', filename)
  pom.click()
}
