<script lang="ts" setup>
import { cn } from '~/libs/utils'

const showMenu = ref(false)
</script>

<template>
  <div class="">
    <div class="flex justify-center items-center">
      <button :class="cn('relative z-9999 cursor-pointer text-white mix-blend-difference delay-400', showMenu && 'delay-0')" @click="showMenu = !showMenu">
        <svg class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path :class="cn('line top', showMenu && 'top--active')" d="M4 5H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path :class="cn('line middle', showMenu && 'middle--active')" d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path :class="cn('line bottom', showMenu && 'bottom--active')" d="M4 19H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div :class="cn('absolute z-9980 w-[200dvh] h-[200dvh] bg-white pointer-events-none bgc', showMenu && 'bgc--active')" />
    </div>

    <div :class="cn('max-w-5xl fixed inset-0 z-9990 transition-opacity duration-400 opacity-0 pointer-events-none', showMenu && 'opacity-100 pointer-events-auto')">
      <nav class="px-6 py-20 text-lg text-black text-center">
        <ul class="flex flex-col gap-4">
          <li>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/sign">
              Sign
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/renarrate">
              Renarrate
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.line {
  transform-box: fill-box;
  transform-origin: center;
}

.top {
  translate: 0 0;
  rotate: 0deg;
  transition:
    rotate 0.2s ease 0s,
    translate 0.2s ease 0.2s;
}

.top--active {
  translate: 0 7px;
  rotate: 45deg;
  transition:
    translate 0.2s ease 0s,
    rotate 0.2s ease 0.2s;
}

.middle {
  opacity: 1;
  transition: opacity 0.2s ease 0.2s;
}

.middle--active {
  opacity: 0;
  transition: opacity 0.2s ease 0s;
}

.bottom {
  translate: 0 0;
  rotate: 0deg;
  transition:
    rotate 0.2s ease 0s,
    translate 0.2s ease 0.2s;
}

.bottom--active {
  translate: 0 -7px;
  rotate: -45deg;
  transition:
    translate 0.2s ease 0s,
    rotate 0.2s ease 0.2s;
}

.bgc {
  clip-path: circle(0% at 50% 50%);
  transition: clip-path 0.4s ease-out;
}

.bgc--active {
  clip-path: circle(100% at 50% 50%);
}
</style>
