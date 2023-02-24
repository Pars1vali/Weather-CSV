import { Parser } from './node/@json2csv/plainjs'

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
  let blob = new Blob([content], { type: contentType })
  let url = URL.createObjectURL(blob)

  let pom = document.createElement('a')
  pom.href = url
  pom.setAttribute('download', filename)
  pom.click()
}
