export default async function(url: string, option?: object) {
  const res = await fetch(url, option)
  
  return await res.json()
}