<script setup lang="ts">
interface CollectItem {
  id: string
  title: string
  date: string
  content: string
}

const route = useRoute()
const request = useRequestURL()

const page = ref(+(route.query.p || 1))
const size = ref(+(route.query.s || 20))

const { data } = await useAsyncData(`renarrate`, async () => {
  const { list } = await $fetch(`${request.origin}/collect/index.json`, { method: 'get' }) as {
    list: Array<CollectItem>
  }

  const res = list.slice((Math.min(page.value - 1, 0)) * size.value, page.value * size.value)

  return markRaw({
    list: res,
    total: list.length,
  })
}, {
  watch: [page, size],
})

function generateLink(item: CollectItem): string {
  return `/renarrate/${item.id}`
}

console.log(data.value)
</script>

<template>
  <div v-if="data" class="w-full max-w-screen-md mx-auto">
    <h1>renarrate list {{ data.total }}</h1>
    <ul class="flex flex-col gap-4">
      <li v-for="item in data.list" :key="item.id" class="flex flex-col gap-2">
        <NuxtLink :to="generateLink(item)">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content.slice(0, 100) }}</p>
          <p>{{ item.date }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
