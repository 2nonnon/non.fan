<script setup lang="ts">
import type { Album } from './data'
import { NuxtLink } from '#components'

defineProps<{
  album: Album & {
    category: string
  }
}>()
</script>

<template>
  <dialog :id="album.id" class="mx-auto mt-auto pc:mb-auto w-full h-full bg-base-content text-base-100 rounded-t-3xl pc:rounded-b-3xl max-w-full pc:max-w-[min(calc(100%-3rem),var(--container-content))] max-h-[calc(100%-5rem)] pc:max-h-200 backdrop:backdrop-blur" closedby="any">
    <div class="h-full overflow-hidden relative z-0">
      <button class="absolute top-2 pc:top-4 right-2 pc:right-4 z-50 w-12 h-12 flex items-center justify-center cursor-pointer outline-none" type="button" command="close" :commandfor="album.id">
        <svg class="w-6 pc:w-8 aspect-square" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
        </svg>
      </button>

      <div class="vinyl-container">
        <FVinyl class="w-100! pc:w-116!" :cover="`/cover/${album.cover[0]!}.jpg`" :name="album.name" playing />
      </div>

      <div class="h-full overflow-hidden pt-6 px-6 pc:p-16 flex flex-col items-start gap-6 pc:gap-16">
        <div>
          <div class="text-4xl pc:text-5xl mb-4 pc:mb-8 pr-6">
            <h3 class="inline font-bold">
              {{ album.name }}
            </h3>

            <span>
              <span class="inline-block ml-3 relative -top-1 px-1 rounded text-xs pc:text-sm border border-base-100 opacity-80 whitespace-nowrap">
                {{ album.category }}
              </span>
            </span>
          </div>

          <p class="opacity-80 pc:text-xl">
            {{ album.artist }} · {{ album.date }} · {{ album.trackList.length }} {{ album.trackList.length > 1 ? 'tracks' : 'track' }}
          </p>
        </div>

        <div class="flex-1 w-full overflow-auto scrollbar-hidden">
          <ul class="pc:[writing-mode:vertical-lr] [&>li]:mb-4 pc:[&>li]:not-last:mr-6">
            <li v-for="track in album.trackList" :key="track.id">
              <component :is="track.lyric ? NuxtLink : 'div'" class="flex flex-col items-start" v-bind="track.lyric ? { to: `/music/lyric/${track.id}` } : {}">
                <div class="pc:text-xl leading-6 pc:leading-8">
                  <span>{{ track.name }}</span>&nbsp;
                  <span v-if="track.isCover">(Cover)</span>
                </div>

                <div class="pc:mt-3 flex flex-wrap gap-x-2 pc:gap-x-3 text-sm pc:text-base leading-6 opacity-80">
                  <span v-if="track.lyricist">
                    詞 · {{ track.lyricist }}
                  </span>
                  <span>
                    曲 · {{ track.composer }}
                  </span>
                </div>
              </component>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.vinyl-container {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;

  display: flex;

  transform: translate(32%, 16%);
  filter: blur(4px);

  @media screen and (min-width: 768px) {
    transform: translate(30%, 15%);
  }
}
</style>
