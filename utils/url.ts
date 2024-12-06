export const getURLParams = (url: string, attr: string) => {
  const { searchParams } = new URL(url)
  
  if (attr) return searchParams.get(attr)
  
  return searchParams
}