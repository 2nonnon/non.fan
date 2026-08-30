<script setup lang="ts">
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

const groupList = categoryList.map(category => category.items.map(item => ({ ...item, category: category.title }))).flat()

const scrollIndex = ref(0)
const isScrolling = ref(false)
let isChanging = false

let scrollTimeout: ReturnType<typeof setTimeout> | null = null

function handleScroll(event: Event) {
  if (isChanging) {
    isChanging = false
    return
  }

  scrollTimeout && clearTimeout(scrollTimeout)

  isScrolling.value = true

  const target = event.target as HTMLElement
  const { scrollTop } = target

  scrollIndex.value = Math.floor(scrollTop / 100)

  scrollTimeout = setTimeout(() => {
    isScrolling.value = false
  }, 100)
}

const scrollRef = useTemplateRef('scrollRef')

watch(scrollIndex, (newIndex) => {
  if (!scrollRef.value || isScrolling.value)
    return

  isChanging = true
  scrollRef.value.scrollTop = newIndex * 100
})

useSeoMeta({
  title: `歌 - のん (能年玲奈)`,
  description: `のん (能年玲奈) の歌を聴く。`,
})
</script>

<template>
  <main class="relative z-0 flex-1 flex flex-col justify-between pt-12 pb-16 pc:pt-20 pc:pb-24">
    <h1 class="relative z-10 font-bold text-4xl pc:text-6xl text-primary-600/95">
      NON Music<br>NON Life
    </h1>

    <div ref="scrollRef" class="group" :style="{ '--count': groupList.length, '--scroll-index': scrollIndex }" @scroll.passive="handleScroll">
      <div class="group-wrapper">
        <div class="group-container">
          <button v-for="group, i in groupList" :key="group.id" class="group-item" :style="{ '--index': i }" type="button" command="show-modal" :commandfor="group.id">
            <div class="group-img">
              <div class="group-img-container">
                <img v-for="j in 9" :key="j" :style="{ '--img-index': j }" :src="`/cover/${group.cover[0]!}.jpg`" alt="">
              </div>
            </div>
          </button>
        </div>
      </div>

      <div class="group-height" />
    </div>

    <div class="relative z-10 flex justify-end">
      <div class="relative flex items-center gap-2 pc:gap-2.5">
        <div
          v-for="i in Array.from({ length: groupList.length + 1 }).map((_, i) => i)" :key="i"
          :class="cn('w-0.5 pc:w-0.75 h-5 pc:h-6 rounded bg-base-content transition-transform', {
            'bg-primary-600 scale-y-250': i === scrollIndex,
            'bg-primary-400 scale-y-150': (i === scrollIndex - 1 || i === scrollIndex + 1),
            'bg-primary-200 scale-y-110': (i === scrollIndex - 2 || i === scrollIndex + 2),
          })"
        />

        <input v-model.number="scrollIndex" type="range" class="absolute inset-0 cursor-pointer z-1 opacity-0" min="0" :max="groupList.length" step="1">
      </div>
    </div>

    <FAlbumDialog v-for="group in groupList" :key="group.id" :album="group" />
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

  @media screen and (min-width: 768px) {
    --card-size: 16rem;
    --card-offset-x: 6rem;
    --card-offset-y: 3rem;
  }

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
  cursor: pointer;
  outline: none !important;
}

.group-img {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 9999px;
  transition: transform 0.3s ease;
}

.group-item:hover .group-img,
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
