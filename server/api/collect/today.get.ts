import type { CollectTodayItem } from '~~/shared/types/collect'
import dayjs from 'dayjs'

function formatWeakETag(content: string) {
  return `W/"${content}"`
}

export default defineWrappedResponseHandler(async (event) => {
  const { date } = getQuery(event)

  if (typeof date !== 'string') {
    return []
  }

  setHeaders(event, {
    'ETag': formatWeakETag(date),
    'Cache-Control': 'no-cache',
    'Last-Date': date,
  })

  const ifNoneMatch = getHeader(event, 'if-none-match')

  if (ifNoneMatch === formatWeakETag(date)) {
    return sendNoContent(event, 304)
  }

  const currentDate = dayjs(date, 'YYYY-MM-DD', true)

  if (!currentDate.isValid()) {
    return []
  }

  const data = await useStorage('assets:server').getItem('collect/index.json') as unknown as { list: CollectItem[] }

  const res = data.list.reduce((acc, item) => {
    const recordDate = dayjs(item.date)

    if (recordDate.get('month') === currentDate.get('month') && recordDate.get('date') === currentDate.get('date')) {
      acc.push({
        ...item,
        ISODate: item.date.replace(' ', 'T'),
      })
    }

    return acc
  }, [] as Array<CollectTodayItem>)

  return res
})
