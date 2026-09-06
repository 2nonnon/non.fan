<script setup lang="ts">
definePageMeta({
  layout: 'scroll',
})

const dayjs = useDayjs()

const { data: todayList, status: todayStatus } = useAsyncData(`renarrate-today`, async () => {
  const res = await $fetch(`/api/collect/today`, {
    method: 'get',
    query: {
      date: dayjs().format('YYYY-MM-DD'),
    },
  })

  return markRaw(res)
}, {
  server: false,
})

const { data: countList } = await useAsyncData(`renarrate-count`, async () => {
  const res = await $fetch(`/api/collect/count`, {
    method: 'post',
  })

  return markRaw(res)
})

useSeoMeta({
  title: `ブログアーカイブ - のん (能年玲奈)`,
  description: `のん (能年玲奈) のブログアーカイブ。2007 年から 2016 年までの記事を収録。`,
})
</script>

<template>
  <main class="relative">
    <div class="w-full max-w-prose mx-auto py-12 pc:py-20 flex flex-col gap-12">
      <h1 class="sr-only">
        のん (能年玲奈) のブログアーカイブ
      </h1>

      <section>
        <h2 class="text-xl pc:text-2xl font-bold mb-4 pc:mb-6">
          あの日の今日
        </h2>

        <div v-if="todayStatus === 'pending' || todayStatus === 'idle'" class="flex items-center">
          <p>読み込み中...</p>
        </div>

        <div v-else-if="!todayList?.length" class="flex items-center">
          <p>
            今日の更新はお休みです〜
          </p>
        </div>

        <ul v-else class="flex flex-col gap-4">
          <li v-for="item in todayList" :key="item.id">
            <NuxtLink
              class="block"
              :to="`/renarrate/${item.id.slice(0, 4)}/${item.id.slice(4)}`"
              prefetch-on="interaction"
            >
              <article class="relative pl-4 group">
                <div class="absolute left-0 top-1 bottom-1 w-1 rounded-full transition-colors duration-300 bg-primary/60 group-hover:bg-primary" />

                <h3 class="text-lg pc:text-xl font-bold">
                  {{ item.title }}
                </h3>

                <time class="block text-sm pc:text-base opacity-60 mb-1" :datetime="item.ISODate">
                  {{ item.date }}
                </time>

                <p class="opacity-80 hover:opacity-90 transition-opacity pc:text-lg">
                  {{ item.content }}
                </p>
              </article>
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-xl pc:text-2xl font-bold mb-4 pc:mb-6">
          年別アーカイブ
        </h2>

        <ul class="flex flex-wrap gap-x-4 gap-y-2 pc:text-lg">
          <li v-for="item in countList" :key="item.year">
            <NuxtLink
              class="underline underline-offset-2"
              :to="`/renarrate/${item.year}`"
              prefetch-on="interaction"
            >
              {{ `${item.year} · ${item.total}` }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <p class="pc:text-lg">
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
