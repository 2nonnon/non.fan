<script setup lang="ts">
import { data } from '@/features/song/data'

const categoryList = [
  {
    title: '专辑',
    items: data.album,
  },
  {
    title: '单曲',
    items: data.single,
  },
  {
    title: '参与',
    items: data.appearsOn,
  },
  {
    title: 'OST',
    items: data.OST,
  },
]

useSeoMeta({
  title: `歌曲`,
  description: `能年玲奈歌曲列表`,
})
</script>

<template>
  <main class="relative px-6">
    <h1 class="sr-only">
      能年玲奈歌曲列表
    </h1>

    <div class="w-full max-w-3xl mx-auto py-8 md:py-12 flex flex-col gap-12">
      <section v-for="category in categoryList" :key="category.title">
        <h2 class="font-bold text-2xl mb-8">
          {{ category.title }}
        </h2>

        <div class="flex flex-col gap-8">
          <section v-for="item in category.items" :key="item.id">
            <h3 class="font-bold text-lg mb-4">
              {{ item.name }} ({{ item.date }})
            </h3>

            <ul class="[&>li]:not-last:mb-4">
              <li v-for="track in item.trackList" :key="track.id">
                <div class="flex items-center gap-4">
                  <img class="shrink-0 md:w-16 md:h-16 rounded" :src="`/cover/${item.cover[0]!}.jpg`" width="48px" height="48px" :alt="`${item.name} 封面`">

                  <div class="flex-1 flex flex-col gap-1">
                    <div>
                      {{ track.name }} - {{ track.artist }}
                    </div>

                    <div>
                      <span v-if="track.lyricist" class="mr-2">
                        词: {{ track.lyricist }}
                      </span>
                      <span>
                        曲: {{ track.composer }}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  </main>
</template>
