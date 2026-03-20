<script setup lang="ts">
interface CollectItem {
  id: string
  title: string
  date: string
  content: string
}

const monthMap = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
} as Record<string, string>

const dayjs = useDayjs()
const request = useRequestURL()

const { data } = await useAsyncData(`renarrate-index`, async () => {
  const { list } = await $fetch(`${request.origin}/collect/index.json`, { method: 'get' }) as unknown as { list: Array<CollectItem> }

  const res = list.reduce((acc, item) => {
    const year = item.date.slice(0, 4)

    const yearRecord = acc.years.find(y => y.year === year)

    if (!yearRecord) {
      acc.years.push({ year, total: 1 })
    }
    else {
      yearRecord.total += 1
    }

    if (item.date.startsWith(dayjs().format('yyyy-MM-dd'))) {
      const [date] = item.date.split(' ')
      const [y, m, d] = date!.split('-')

      acc.today.push({
        id: item.id,
        title: item.title,
        content: item.content,
        year: y!,
        month: m!,
        day: d!,
      })
    }

    return acc
  }, {
    today: [],
    years: [],
  } as {
    today: Array<{ id: string, title: string, content: string, year: string, month: string, day: string }>
    years: Array<{ year: string, total: number }>
  })

  return markRaw(res)
})

useSeoMeta({
  title: `能年玲奈博客存档`,
  description: `能年玲奈博客存档, 从 2007 到 2016`,
})
</script>

<template>
  <div class="relative select-none px-6">
    <h1 class="sr-only">
      能年玲奈博客存档
    </h1>

    <div class="w-full max-w-3xl mx-auto py-12 md:py-20">
      <main class="mb-10 flex flex-col gap-8">
        <section>
          <h2 class="text-xl font-bold mb-4">
            那年今日
          </h2>

          <ul class="flex flex-col gap-6">
            <li v-if="!data?.today?.length">
              <p>
                今天没有博客更新哦~
              </p>
            </li>

            <li v-for="item in data?.today" :key="item.id">
              <article>
                <h3 class="text-lg font-semibold mb-1">
                  <NuxtLink
                    class="underline underline-offset-2"
                    :to="`/renarrate/${item.id.slice(0, 4)}/${item.id.slice(4)}`"
                    prefetch-on="interaction"
                  >
                    {{ item.title }}
                  </NuxtLink>
                </h3>

                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {{ monthMap[item.month] }} {{ item.day }}, {{ item.year }}
                </p>

                <p>
                  {{ item.content }}
                </p>
              </article>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold mb-4">
            按年份归档
          </h2>

          <ul class="flex flex-wrap gap-2">
            <li v-for="year in data?.years" :key="year.year">
              <NuxtLink
                class="underline underline-offset-2"
                :to="`/renarrate/${year.year}`"
                prefetch-on="interaction"
              >
                {{ `${year.year} · ${year.total}` }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <p>
          这里是能年玲奈从 2007 年到 2016 年的博客集合。
          原始博客快照可以在以下位置找到：
          <NuxtLink class="underline underline-offset-2" to="https://web.archive.org/web/20250101000000*/http://yaplog.jp/lp-n-rena/" target="_blank" rel="noopener noreferrer">
            Web Archive
          </NuxtLink>
          .
        </p>
      </footer>
    </div>
  </div>
</template>
