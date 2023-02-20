export function downloadJSON(data) {
  let a = document.createElement('a')
  let file = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  })
  a.href = URL.createObjectURL(file)
  a.download = `${data.name}.json`
  a.click()
}
