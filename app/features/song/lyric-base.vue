<script setup lang="ts">
import type { RGB } from './blur-gradient/types'
import { getTrackInfoById } from '@/features/song/data'
import { extractColors } from './blur-gradient/color-extractor'

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

const colors = shallowRef<RGB[]>([])

onMounted(async () => {
  colors.value = await extractColors(`/cover/${track.cover[0]!}.jpg`)
})
</script>

<template>
  <main class="relative z-0 h-full flex">
    <div class="flex-1 min-w-0 flex justify-end items-center absolute inset-0 pc:relative pc:inset-auto -z-1 blur-xs pc:blur-none">
      <div class="flex-1 min-w-0 px-12 max-w-240 flex justify-center items-center">
        <FTurntable class="w-[42vh]! max-w-full" :cover="`/cover/${track.cover[0]!}.jpg`" :name="track.name" playing />
      </div>
    </div>

    <div class="flex-1 min-w-0 h-full">
      <div class="h-full py-16 pc:py-24 px-6 flex flex-col gap-6 pc:gap-8 text-center pc:text-start">
        <div>
          <h1 class="font-bold text-2xl pc:text-3xl mb-2">
            {{ track.name }} - {{ track.artist }}
          </h1>
          <p class="text-sm pc:text-base opacity-80">
            <span v-if="track.lyricist">
              詞: {{ track.lyricist }}
            </span>
        &nbsp;
            <span>
              曲: {{ track.composer }}
            </span>
          </p>
        </div>

        <div class="flex-1 overflow-auto scrollbar-hidden lyric-mask [&>p]:odd:mb-1 [&>p]:even:mb-4 pc:[&>p]:even:mb-6 [&>p]:even:opacity-80 [&>p]:even:font-hanzi [&>p]:even:text-sm pc:text-xl pc:[&>p]:even:text-base">
          <slot />
        </div>
      </div>
    </div>

    <div class="absolute inset-0 -z-10">
      <FBlurGradient :colors="colors" />
    </div>
  </main>
</template>

<style scoped>
.lyric-mask {
  mask-image: linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%);

  &::before,
  &::after {
    content: '';
    display: block;
  }

  &::before {
    height: 42%;
  }

  &::after {
    height: 52%;
  }
}
</style>
