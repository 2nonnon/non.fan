<script setup lang="ts">
import type { RGB } from './blur-gradient/types'
import { getTrackInfoById } from '@/features/song/data'
import { extractColors } from './blur-gradient/color-extractor'

const props = defineProps<{
  trackId: string
}>()

const trackInfo = getTrackInfoById(props.trackId)

if (!trackInfo)
  throw createError({ statusCode: 404 })

const [track, album] = trackInfo

const trackIndex = album.trackList.findIndex(t => t.id === track.id)

const preTrack = album.trackList[trackIndex - 1] || album.trackList[album.trackList.length - 1]!
const nextTrack = album.trackList[trackIndex + 1] || album.trackList[0]!

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
  <main class="relative z-0 h-full flex flex-col">
    <div class="flex-1 flex overflow-hidden">
      <div class="flex-1 min-w-0 flex justify-end items-center absolute inset-0 pc:relative pc:inset-auto -z-1 blur-xs pc:blur-none">
        <div class="flex-1 min-w-0 px-12 max-w-240 flex justify-center items-center">
          <FTurntable class="w-[42vh]! max-w-full" :cover="`/cover/${track.cover[0]!}.jpg`" :name="track.name" playing />
        </div>
      </div>

      <div class="flex-1 min-w-0 h-full">
        <div class="h-full pt-16 pc:pt-24 pb-6 px-6 flex flex-col gap-6 pc:gap-8 text-center pc:text-start">
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
    </div>

    <nav class="h-16 pc:h-20 bg-white/2">
      <div class="h-full mx-auto flex items-center justify-center gap-6 pc:gap-8">
        <NuxtLink class="cursor-pointer" to="/music" aria-label="返回歌曲列表">
          <svg class="w-6 pc:w-8 aspect-square" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
          </svg>
        </NuxtLink>

        <NuxtLink class="cursor-pointer" :to="`/music/lyric/${preTrack.id}`" :aria-label="`上一首歌曲: ${preTrack.name}`">
          <svg class="w-6 pc:w-8 aspect-square" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z" />
            <path d="M3 20V4" />
          </svg>
        </NuxtLink>

        <div>
          <svg class="w-6 pc:w-8 aspect-square" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
          </svg>
        </div>

        <NuxtLink class="cursor-pointer" :to="`/music/lyric/${nextTrack.id}`" :aria-label="`下一首歌曲: ${nextTrack.name}`">
          <svg class="w-6 pc:w-8 aspect-square" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 4v16" />
            <path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" />
          </svg>
        </NuxtLink>

        <button class="cursor-pointer" type="button" command="show-modal" :commandfor="album.id">
          <svg class="w-6 pc:w-8 aspect-square" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 5H3" />
            <path d="M11 12H3" />
            <path d="M11 19H3" />
            <path d="M21 16V5" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </button>
      </div>
    </nav>

    <FAlbumDialog :album="{ ...album, category: track.category }" />

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
