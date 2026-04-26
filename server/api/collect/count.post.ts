import type { CollectCountItem } from '~~/shared/types/collect'

export default defineWrappedResponseHandler(async () => {
  const data = await useStorage('assets:server').getItem('collect/index.json') as unknown as { list: CollectItem[] }

  const res = data.list.reduce((acc, item) => {
    const year = item.date.slice(0, 4)

    const yearRecord = acc.find(y => y.year === year)

    if (!yearRecord) {
      acc.push({ year, total: 1 })
    }
    else {
      yearRecord.total += 1
    }

    return acc
  }, [] as Array<CollectCountItem>)

  return res
})
