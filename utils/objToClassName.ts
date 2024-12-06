export default function (obj: object) {
  return Object.entries(obj).reduce((className, [name, value]) => {
    if (value) return `${className} ${name}`
    else return className
  }, '')
}