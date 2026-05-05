<script setup lang="ts">
import { NuxtLink } from '#components'
import { podcasts } from '@/features/podcast/data'

useSeoMeta({
  title: `TOPPAN INNOVATION WORLD ERA - のん (能年玲奈)`,
  description: `女優のんが未来をイノベーションするプログラム。豪華ゲストとのトークセッション、声のブログ、イノベーションの最新トピックスをお届けします。のんバージョンは毎月第三週目の金曜・日曜夜配信。`,
})
</script>

<template>
  <main class="relative">
    <h1 class="sr-only">
      のん TOPPAN INNOVATION WORLD ERA
    </h1>

    <div class="w-full mx-auto py-12 pc:py-16 flex flex-col gap-16">
      <ul class="[&>li]:not-last:mb-4">
        <li v-for="podcast in podcasts" :key="podcast.id">
          <NuxtLink class="flex items-start gap-4" :to="`/podcast/${podcast.id}`">
            <img class="shrink-0 md:w-16 md:h-16 rounded" :src="podcast.cover" width="48px" height="48px" :alt="`${podcast.title} 封面`">

            <div class="flex-1 flex flex-col gap-1">
              <div>
                {{ podcast.title }}
              </div>

              <div class="text-sm">
                {{ podcast.description }}
              </div>

              <div class="text-sm opacity-90">
                {{ podcast.date }}
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>
