<script setup lang="ts">
import { pick } from 'es-toolkit'

const route = useRoute()

const key = `${route.params.year}${route.params.rest}`

const { data } = await useAsyncData(`renarrate-${key}`, async () => {
  const res = await $fetch(`/api/collect/detail`, {
    method: 'post',
    body: {
      key,
    },
  })

  return markRaw(pick(res, ['url', 'title', 'date', 'content', 'html']))
})

if (!data.value)
  throw createError({ statusCode: 404 })

useSeoMeta({
  title: `${data.value.title} - のん (能年玲奈)`,
  description: `${data.value.content.slice(0, 50)}...`,
})
</script>

<template>
  <main class="relative">
    <div v-if="data" class="w-full max-w-prose mx-auto py-8 pc:py-16">
      <h1 class="text-3xl pc:text-4xl font-bold mb-2 pc:mb-4">
        {{ data.title }}
      </h1>
      <p class="text-sm pc:text-base opacity-60 mb-6 pc:mb-8">
        {{ data.date }}
      </p>

      <div class="text-base-content/90 pc:text-lg prose prose-invert prose-img:inline prose-img:m-0">
        <NHastRender :html="data.html" />
      </div>

      <div class="flex items-center justify-between gap-4 mt-12 text-sm pc:text-base">
        <NuxtLink class="opacity-60 hover:opacity-100 transition-opacity" :to="`/renarrate/${route.params.year}`">
          Back to {{ route.params.year }} archive
        </NuxtLink>

        <NuxtLink class="opacity-60 hover:opacity-100 transition-opacity" :to="data.url" target="_blank" rel="noopener noreferrer nofollow" external>
          View original
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
