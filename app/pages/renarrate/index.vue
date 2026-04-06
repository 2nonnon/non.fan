<script setup lang="ts">
interface CollectItem {
  id: string
  title: string
  date: string
  content: string
}

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

    const recordDate = dayjs(item.date)
    const currentDate = dayjs()

    if (recordDate.get('month') === currentDate.get('month') && recordDate.get('date') === currentDate.get('date')) {
      acc.today.push({
        ...item,
        ISODate: item.date.replace(' ', 'T'),
      })
    }

    return acc
  }, {
    today: [],
    years: [],
  } as {
    today: Array<{ id: string, title: string, content: string, date: string, ISODate: string }>
    years: Array<{ year: string, total: number }>
  })

  return markRaw(res)
})

useSeoMeta({
  title: `ブログアーカイブ - のん (能年玲奈)`,
  description: `のん (能年玲奈) のブログアーカイブ。2007 年から 2016 年までの記事を収録。`,
})
</script>

<template>
  <main class="px-6">
    <div class="w-full max-w-3xl mx-auto py-12 md:py-20 flex flex-col gap-12">
      <h1 class="sr-only">
        のん (能年玲奈) のブログアーカイブ
      </h1>

      <section>
        <h2 class="text-xl font-bold mb-4">
          あの日の今日
        </h2>

        <ul class="flex flex-col gap-4">
          <li v-if="!data?.today?.length">
            <p>
              今日の更新はお休みです〜
            </p>
          </li>

          <li v-for="item in data?.today" :key="item.id">
            <NuxtLink
              class="block"
              :to="`/renarrate/${item.id.slice(0, 4)}/${item.id.slice(4)}`"
              prefetch-on="interaction"
            >
              <article class="relative pl-4 group">
                <div class="absolute left-0 top-1 bottom-1 w-1 rounded-full transition-colors duration-300 bg-primary/60 group-hover:bg-primary" />

                <h3 class="text-lg font-bold">
                  {{ item.title }}
                </h3>

                <time class="block text-sm opacity-60 mb-1" :datetime="item.ISODate">
                  {{ item.date }}
                </time>

                <p class="opacity-90">
                  {{ item.content }}
                </p>
              </article>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl font-bold mb-4">
          年別アーカイブ
        </h2>

        <ul class="flex flex-wrap gap-x-4 gap-y-2">
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

      <p>
        のん (能年玲奈) の 2007 年から 2016 年までのブログアーカイブです。
        オリジナルのブログスナップショットは、こちらからご確認いただけます：
        <NuxtLink class="underline underline-offset-2" to="https://web.archive.org/web/20250101000000*/http://yaplog.jp/lp-n-rena/" target="_blank" rel="noopener noreferrer nofollow">
          Web Archive
        </NuxtLink>
        。
      </p>
    </div>
  </main>
</template>
