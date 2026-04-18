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
  description: `「${track.name}」は、のん (能年玲奈) が歌う楽曲です。作詞は${track.lyricist}、作曲は${track.composer}が担当しています。`,
})
</script>

<template>
  <main class="relative px-6">
    <div class="w-full max-w-3xl mx-auto py-8 md:py-12 text-center">
      <h1 class="text-2xl font-bold mb-1">
        {{ track.name }} - {{ track.artist }}
      </h1>
      <p class="text-sm opacity-90 mb-6">
        <span v-if="track.lyricist">
          詞: {{ track.lyricist }}
        </span>
        &nbsp;
        <span>
          曲: {{ track.composer }}
        </span>
      </p>

      <div class="[&>p]:odd:mb-1 [&>p]:even:mb-4 [&>p]:even:opacity-80 [&>p]:even:text-sm [&>p]:even:font-sans">
        <slot />
      </div>
    </div>
  </main>
</template>
