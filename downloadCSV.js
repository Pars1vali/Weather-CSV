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
  } catch (err) {
    console.error(err)
  }
}
