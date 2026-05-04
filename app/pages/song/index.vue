<script setup lang="ts">
// import { NuxtLink } from '#components'
import { data } from '@/features/song/data'
import { cn } from '~/libs/cn'

const categoryList = [
  {
    title: 'Album',
    items: data.album,
  },
  {
    title: 'Single',
    items: data.single,
  },
  {
    title: 'Appears On',
    items: data.appearsOn,
  },
  {
    title: 'OST',
    items: data.OST,
  },
]

const groupList = categoryList.map(category => category.items).flat()

const scrollIndex = ref(0)

function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  const { scrollTop } = target

  scrollIndex.value = Math.floor(scrollTop / 100)
}

useSeoMeta({
  title: `歌 - のん (能年玲奈)`,
  description: `のん (能年玲奈) の歌を聴く。`,
})
</script>

<template>
  <main class="relative z-0 flex-1 flex flex-col justify-between pt-12 pb-16">
    <h1 class="relative z-10 font-bold text-5xl text-primary-600/95">
      NON Music<br>NON Life
    </h1>

    <div class="group" :style="{ '--count': groupList.length, '--scroll-index': scrollIndex }" @scroll.passive="handleScroll">
      <div class="group-wrapper">
        <div class="group-container">
          <div v-for="group, i in groupList" :key="group.id" class="group-item" :style="{ '--index': i }">
            <div class="group-img">
              <div class="group-img-container">
                <img v-for="j in 9" :key="j" :style="{ '--img-index': j }" :src="`/cover/${group.cover[0]!}.jpg`" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="group-height" />
    </div>

    <div class="relative z-10 flex items-center justify-end gap-2">
      <div
        v-for="i in groupList.length" :key="i"
        :class="cn('w-0.5 h-5 rounded bg-base-content transition-transform', {
          'bg-primary-600 scale-y-250': i === scrollIndex,
          'bg-primary-400 scale-y-150': scrollIndex > 0 && (i === scrollIndex - 1 || i === scrollIndex + 1),
          'bg-primary-200 scale-y-110': scrollIndex > 0 && (i === scrollIndex - 2 || i === scrollIndex + 2),
        })"
      />
    </div>

    <!-- <div class="w-full max-w-3xl mx-auto py-12 md:py-16 flex flex-col gap-16">
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
                <component :is="track.lyric ? NuxtLink : 'div'" class="flex items-center gap-4" v-bind="track.lyric ? { to: `/song/${track.id}` } : {}">
                  <img class="shrink-0 md:w-16 md:h-16 rounded" :src="`/cover/${item.cover[0]!}.jpg`" width="48px" height="48px" :alt="`${item.name} 封面`">

                  <div class="flex-1 flex flex-col gap-1">
                    <div>
                      {{ track.name }} - {{ track.artist }}
                    </div>

                    <div class="text-sm opacity-90">
                      <span v-if="track.lyricist" class="mr-2">
                        詞: {{ track.lyricist }}
                      </span>
                      <span>
                        曲: {{ track.composer }}
                      </span>
                    </div>
                  </div>
                </component>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div> -->
  </main>
</template>

<style scoped>
.group {
  position: absolute;
  top: 1rem;
  right: 0;
  bottom: 1rem;
  left: 0;
  z-index: 0;
  margin: auto 0;
  overflow: hidden auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  --card-size: 12rem;
  --card-offset-x: 4rem;
  --card-offset-y: 2rem;

  max-height: calc((var(--count) * var(--card-offset-y) + var(--card-size)));

  @media screen and (max-width: 1280px) {
    left: -1.5rem;
    right: -1.5rem;
  }
}

.group-height {
  height: calc((var(--count) * 100px));
  pointer-events: none;
}

.group-wrapper {
  position: sticky;
  inset: 0;
  z-index: 0;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.group-wrapper::after {
  content: '';
  display: block;
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  box-shadow:
    inset 0 0 6rem 2rem var(--color-base-100),
    inset 0 0 1rem 1rem var(--color-base-100);

  @media (orientation: portrait) {
    box-shadow: inset 0 0 2.5rem var(--color-base-100);
  }
}

.group-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: -1;
  width: var(--card-size);
  height: var(--card-size);

  transition: transform 0.2s linear;
  transform: translate(
    calc(var(--scroll-index) * var(--card-offset-x) * -1 + var(--card-offset-x)),
    calc(var(--scroll-index) * var(--card-offset-y) - var(--card-offset-y))
  );
}

.group-item {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: calc(var(--index) * -2);
  transform: translateX(calc(var(--index) * var(--card-offset-x)))
    translateY(calc(var(--index) * var(--card-offset-y) * -1));
}

.group-img {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 9999px;
  transition: transform 0.3s ease;
}

.group-img:hover,
.group-img:has(.group-img-container:hover) {
  transform: translateX(50%) translateY(25%);
}

.group-img-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  transform: rotateY(-45deg) rotateX(-15deg) rotateZ(15deg);
  transform-style: preserve-3d;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2px;
    transform: translateZ(calc(var(--img-index) * 1px));
    box-shadow: 0 0 1px 0 var(--color-base-100);
  }
}
</style>
