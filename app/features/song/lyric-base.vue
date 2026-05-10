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
  <main class="relative">
    <div class="w-full mx-auto py-8 pc:py-16 text-center">
      <h1 class="font-bold text-2xl pc:text-3xl mb-1 pc:mb-2">
        {{ track.name }} - {{ track.artist }}
      </h1>
      <p class="text-sm pc:text-base opacity-80 mb-6 pc:mb-8">
        <span v-if="track.lyricist">
          詞: {{ track.lyricist }}
        </span>
        &nbsp;
        <span>
          曲: {{ track.composer }}
        </span>
      </p>

      <div class="[&>p]:odd:mb-1 [&>p]:even:mb-4 pc:[&>p]:even:mb-6 [&>p]:even:opacity-80 [&>p]:even:font-sans [&>p]:even:text-sm pc:text-xl pc:[&>p]:even:text-base">
        <slot />
      </div>
    </div>
  </main>
</template>
