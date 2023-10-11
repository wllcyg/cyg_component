export function SaveImage(url:string,name:string){
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  link.remove()
}
