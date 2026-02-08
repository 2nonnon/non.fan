<script setup lang="ts">
import VisualImg from '~/assets/images/visual.png'

useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: VisualImg,
      fetchpriority: 'high',
    },
  ],
})
</script>

<template>
  <div class="h-dvh relative overflow-hidden select-none">
    <div class="max-w-5xl w-full h-full mx-auto flex flex-col relative">
      <header class="px-6 py-4 sticky top-0 flex items-center justify-between gap-4 z-50">
        <svg class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5.98283 10.9499C8.29347 10.9499 11.5838 7.94995 11.5838 7.94995C11.5838 7.94995 8.48032 -0.0185049 6.2856 2.69994C4.16631 5.32494 4.54474 10.9499 5.98283 10.9499Z" fill="#6BB82E" />
          <path d="M16.8086 1.19995C13.6262 1.19994 11.5838 7.94995 11.5838 7.94995C11.5838 7.94995 14.7099 11.9068 17.8683 8.99995C19.0092 7.94994 20.617 1.19996 16.8086 1.19995Z" fill="#6BB82E" />
          <path d="M7.99619 22.8C11.932 20.175 11.5838 7.94995 11.5838 7.94995M11.5838 7.94995C11.5838 7.94995 8.29347 10.9499 5.98283 10.9499C4.54474 10.9499 4.16631 5.32494 6.2856 2.69994C8.48032 -0.0185049 11.5838 7.94995 11.5838 7.94995ZM11.5838 7.94995C11.5838 7.94995 13.6262 1.19994 16.8086 1.19995C20.617 1.19996 19.0092 7.94994 17.8683 8.99995C14.7099 11.9068 11.5838 7.94995 11.5838 7.94995Z" stroke="white" stroke-width="0.6" stroke-linecap="round" />
        </svg>

        <svg class="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 5H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4 12H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4 19H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </header>

      <main class="flex-1 flex flex-col justify-between items-center px-6 relative z-0">
        <h1 class="w-full text-center text-white mt-10">
          俳優、アーティスト
        </h1>

        <!-- visual -->
        <div class="w-full aspect-2/3 max-w-[min(100%,calc(100vh*2/3*0.6))] flex justify-center items-center relative -z-10">
          <div class="w-full aspect-818/460 relative peer">
            <img class="mask-[url(#visual-mask)] w-7/10 absolute -top-17/20 left-1/2 -translate-x-1/2" :src="VisualImg" draggable="false" alt="">

            <img class="mask-[url(#visual-mask)] w-7/10 absolute -bottom-17/20 left-1/2 -translate-x-1/2 rotate-180" :src="VisualImg" draggable="false" alt="">

            <div class="w-full h-full filter-[url(#inner-shadow)]">
              <div class="w-full h-full bg-white mask-[url(#non-mask)]" />
            </div>
          </div>

          <div class="[--opacity-light:clamp(0.3,1vw/30px,0.6)] absolute w-screen h-[calc(100vh+14rem)] top-1/2 left-1/2 -translate-1/2 -z-10 peer-hover:[&_#light]:opacity-(--opacity-light) peer-active:[&_#light]:opacity-(--opacity-light) pointer-events-none">
            <!-- background -->
            <div class="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,#1a1a1a_36%,#000_100%)] bg-cover -z-20">
              <div class="absolute inset-0 filter-[url(#noise-filter)] mix-blend-color-dodge" />
            </div>

            <!-- light -->
            <div class="absolute inset-0 mx-auto flex items-center justify-center pointer-events-none -z-10 mask-[radial-gradient(circle_at_center,transparent_5.5rem,black_5.6rem)]">
              <div id="light" class="w-full aspect-2/3 max-w-[min(100%,calc(100vh*2/3*0.6))] flex justify-center items-center relative opacity-0 transition-opacity duration-500">
                <div class="w-7/10 h-full absolute rounded-[50%] bg-[#C21F30] blur-[12vw]" />
              </div>
            </div>
          </div>
        </div>

        <p class="text-[0.625rem] text-white mb-10 self-end">
          やまないガール<br>
          変わること恐れない<br>
          やまないガール<br>
          どこまでも燦々と
        </p>
      </main>
    </div>

    <svg class="absolute" width="0" height="0">
      <defs>
        <mask id="non-mask" maskContentUnits="objectBoundingBox">
          <svg width="1" height="1" viewBox="0 0 818 460" preserveAspectRatio="none">
            <path
              d="M802.282 366.534C805.982 347.872 814.621 291.452 813.965 241.796C812.991 168.132 810.476 91.2428 791.5 54.1003C774.013 19.872 751.696 10 716.613 10C681.53 10 664.248 21.7862 650.414 48.3053C630.944 85.6284 628.974 174.374 627 174.374C625.026 174.374 600.765 92.5034 577.4 57.1447C559.244 29.6682 535.539 10.9818 496.599 10.9818C471.587 10.9818 456.684 17.8571 439.161 33.5721C419.952 50.799 411.465 94.3802 409.5 94.1914C407.535 94.0025 398.447 51.3195 379.777 34.5546C361.361 18.0183 343.117 11.166 318.5 12.5057C277.612 14.7309 261.958 33.5721 251.273 63.0378C236.67 103.308 233.76 173.043 231.803 173.043C229.846 173.043 203.571 89.5572 179.233 54.1984C159.149 25.0208 126.663 12.3978 95.5104 14.9105C54.8472 18.1904 30.2087 44.3397 19.5 81.6629C3.99689 135.696 3.99829 186.893 4 249.647V251.618C4 315.274 11.5032 373.488 30 405.9C48.4968 438.312 69.9269 450.001 104 450C137.215 450 162.791 430.374 173.5 401.891C189.494 359.348 190.545 287.514 192.5 287.631C194.455 287.748 221.094 382.249 253.22 418.59C271.717 439.514 297.763 450.776 329.154 448.056C354.578 445.853 368.871 438.015 385.618 418.59C399.986 401.925 407.062 364.305 410 364.305C412.938 364.305 419.691 417.387 449.87 435.287C469.741 447.074 491.777 448.715 504.423 448.204C528.761 447.222 554.843 435.224 565.718 404.839C578.374 369.481 583.564 286.128 585.5 286.128C587.436 286.128 615.397 369.298 630 392.87C644.603 416.443 670.894 443.986 716.613 443.986C778.918 443.986 798.583 385.196 802.282 366.534Z
                M404 150C357.333 150 324 188.095 324 228.095C324 274.762 359.238 310 404 310C448.762 310 484 275.714 484 228.095C484 188.095 450.667 150 404 150Z"
              stroke="white"
              fill="white"
              fill-rule="evenodd"
            />
          </svg>
        </mask>

        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />

          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />

          <feColorMatrix
            type="matrix"
            values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.2 0
              "
            in="grayNoise"
          />
        </filter>

        <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feFlood flood-color="#000" result="flood" />

          <feComposite in="flood" in2="SourceAlpha" operator="out" result="inverted" />

          <feGaussianBlur in="inverted" stdDeviation="24" result="blurred" />

          <feOffset dx="0" dy="0" in="blurred" result="offsetBlurred" />

          <feComposite in="offsetBlurred" in2="SourceAlpha" operator="in" result="shadow" />

          <feComponentTransfer in="shadow" result="finalShadow">
            <feFuncA type="linear" slope="0.7" />
          </feComponentTransfer>

          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="finalShadow" />
          </feMerge>
        </filter>

        <mask id="visual-mask" maskContentUnits="objectBoundingBox">
          <svg width="1" height="1" viewBox="0 0 240 240" preserveAspectRatio="none">
            <path d="M224.575 149.042C210.038 136.035 205.269 147.492 188.392 137.855C120.185 98.9043 267.468 -1.13362 106.292 0.00971921C-28.5367 0.966154 -6.39437 104.763 19.4867 219.013C24.96 243.174 37.2621 239.847 50.8131 238.771C64.3642 237.696 94.7423 220.208 126.969 219.013C163.896 217.643 190.331 254.817 220.625 233.262C224.683 230.374 233.299 220.521 237.346 210.066C241.393 199.61 243.21 165.716 224.575 149.042Z" fill="white" />
          </svg>
        </mask>
      </defs>
    </svg>
  </div>
</template>

<style scoped></style>
