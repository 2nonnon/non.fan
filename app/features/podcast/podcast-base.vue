<script setup lang="ts">
import { getPodcastInfoById } from '@/features/podcast/data'

const props = defineProps<{
  podcastId: string
}>()

const podcast = getPodcastInfoById(props.podcastId)

if (!podcast)
  throw createError({ statusCode: 404 })

useSeoMeta({
  title: `${podcast.title} - のん (能年玲奈)`,
  description: podcast.description,
})
</script>

<template>
  <main class="relative">
    <div class="w-full mx-auto py-8 pc:py-12">
      <div class="flex justify-center mb-8">
        <div class="w-full aspect-square rounded-lg overflow-hidden max-w-100">
          <iframe class="w-full h-full" :src="`https://omny.fm/shows/innovation-world-era/${podcast.id}/embed?t=0s&in_playlist=innovation-world-era-3&style=Cover&media=Audio&size=Square`" allow="autoplay; clipboard-write; fullscreen" allowfullscreen frameborder="0" title="【のん】番組リスナーと交流！" />
        </div>
      </div>

      <div class="[&>p]:mb-4">
        <slot />
      </div>
    </div>
  </main>
</template>
