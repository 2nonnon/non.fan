<script setup lang="ts">
import { RendererHastRender } from '#components'
import { pick } from 'es-toolkit'

interface CollectData {
  url: string
  title: string
  date: string
  content: string
  html: string
}

const route = useRoute()
const request = useRequestURL()

const key = route.params.key as string

const { data } = await useAsyncData(`renarrate-${key}`, async () => {
  const path = `${request.origin}/collect/${key}`

  const res = await $fetch(`${path}/data.json`, { method: 'get' }) as CollectData

  return markRaw(pick(res, ['url', 'title', 'date', 'content', 'html']))
})

if (import.meta.client) {
  console.log(data.value)
}

if (!data.value)
  throw createError({ statusCode: 404 })
</script>

<template>
  <div v-if="data" class="w-full max-w-screen-md mx-auto">
    <h1>{{ data.title }}</h1>
    <p>{{ data.date }}</p>
    <div class="prose">
      <RendererHastRender :html="data.html" />
    </div>
  </div>
</template>
