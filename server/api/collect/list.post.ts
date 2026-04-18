export default defineWrappedResponseHandler(async (event) => {
  const { year } = (await readBody(event)) || {}

  const data = await useStorage('assets:server').getItem('collect/index.json') as unknown as { list: CollectItem[] }

  const yearNum = Number(year)

  if (yearNum && `${year}` === `${yearNum}` && yearNum >= 2007 && yearNum <= 2016) {
    return data.list.filter(item => item.date.startsWith(`${yearNum}`))
  }

  return data.list
})
