<script setup lang="ts">
import { getTrackInfoById } from '@/features/song/data'

const props = defineProps<{
  trackId: string
}>()

const track = getTrackInfoById(props.trackId)

if (!track)
  throw createError({ statusCode: 404 })

useSeoMeta({
  title: `${track.name} - ${track.artist}`,
  description: `${track.name} 是能年玲奈演唱的一首歌曲，由${track.lyricist}作词，${track.composer}作曲。`,
})
</script>

<template>
  <main class="relative px-6">
    <div class="w-full max-w-3xl mx-auto py-8 md:py-12">
      <h1 class="text-2xl font-bold mb-1">
        {{ track.name }} - {{ track.artist }}
      </h1>
      <p class="text-sm opacity-90 mb-6">
        <span v-if="track.lyricist">
          词: {{ track.lyricist }}
        </span>
        <span>
          曲: {{ track.composer }}
        </span>
      </p>

      <div class="[&>p]:odd:mb-1 [&>p]:even:mb-4 [&>p]:even:opacity-80 [&>p]:even:text-sm">
        <slot />
      </div>
    </div>
  </main>
</template>
