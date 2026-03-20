<script lang="ts" setup>
import { cn } from '~/libs/cn'

const showMenu = ref(false)

function handleMenuClick(e: PointerEvent) {
  if (e.composedPath().some(el => (el as HTMLElement).tagName === 'A'))
    showMenu.value = false
}

const routes = [
  { name: '首页', path: '/' },
  { name: '签名', path: '/sign' },
  { name: '博客存档', path: '/renarrate' },
]
</script>

<template>
  <div class="nav">
    <div class="flex justify-center items-center">
      <button :class="cn('relative z-9999 cursor-pointer text-white mix-blend-difference delay-(--duration-double)', showMenu && 'delay-0')" @click="showMenu = !showMenu">
        <svg class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path :class="cn('line top', showMenu && 'top--active')" d="M4 5H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path :class="cn('line middle', showMenu && 'middle--active')" d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path :class="cn('line bottom', showMenu && 'bottom--active')" d="M4 19H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div :class="cn('fixed z-9980 w-[200dvw] h-[200dvh] bg-neutral-50 pointer-events-none nav-bg', showMenu && 'nav-bg--active')" />
    </div>

    <div :class="cn('max-w-5xl mx-auto fixed inset-0 z-9990 transition-opacity duration-(--duration-double) opacity-0 pointer-events-none', showMenu && 'opacity-100 pointer-events-auto')">
      <nav class="px-6 py-24 text-lg text-neutral-950 text-center">
        <ul class="flex flex-col gap-6 font-medium" @click="handleMenuClick">
          <li v-for="item in routes" :key="item.path">
            <NuxtLink class="nav-item" :to="item.path">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.nav {
  --duration: 0.3s;
  --duration-double: calc(var(--duration) * 2);
}

.nav-item {
  position: relative;
  contain: paint;

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 4px;
    width: 0;
    border-radius: 9999px;
    background-color: var(--color-primary);
    transition: width var(--duration) ease;
  }

  &:hover::before {
    width: 100%;
  }
}

.line {
  transform-box: fill-box;
  transform-origin: center;
}

.top {
  translate: 0 0;
  rotate: 0deg;
  transition:
    rotate var(--duration) ease 0s,
    translate var(--duration) ease var(--duration);
}

.top--active {
  translate: 0 7px;
  rotate: 45deg;
  transition:
    translate var(--duration) ease 0s,
    rotate var(--duration) ease var(--duration);
}

.middle {
  opacity: 1;
  transition: opacity var(--duration) ease var(--duration);
}

.middle--active {
  opacity: 0;
  transition: opacity var(--duration) ease 0s;
}

.bottom {
  translate: 0 0;
  rotate: 0deg;
  transition:
    rotate var(--duration) ease 0s,
    translate var(--duration) ease var(--duration);
}

.bottom--active {
  translate: 0 -7px;
  rotate: -45deg;
  transition:
    translate var(--duration) ease 0s,
    rotate var(--duration) ease var(--duration);
}

.nav-bg {
  clip-path: circle(0% at 50% 50%);
  transition: clip-path var(--duration-double) ease-in-out;
}

.nav-bg--active {
  clip-path: circle(100% at 50% 50%);
}
</style>
