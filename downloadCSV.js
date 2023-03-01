import { Parser } from '@json2csv/plainjs'

export function parseCSV(data) {
  try {
    const parser = new Parser()
    console.log(parser.parse(data))
    return parser.parse(data)
  } catch (err) {
    console.error(err)
  }
}

export function downloadCSV(
  content,
  filename,
  contentType = 'text/csv;charset=utf-8;'
) {
  let blob = new Blob([content], { type: contentType })
  let url = URL.createObjectURL(blob)
  let pom = document.createElement('a')
  pom.href = url
  pom.setAttribute('download', filename)
  pom.click()
}
