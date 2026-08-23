<script setup lang="ts">
import type { BlurGradientOptions } from './types'
import { GradientRenderer } from './gradient-renderer'

const props = withDefaults(defineProps<BlurGradientOptions>(), {
  maxFps: 60,
  driftSpeed: 1,
  autoStart: true,
  colors: () => [],
})

const renderer = shallowRef<GradientRenderer | null>(null)

watch(
  () => props.colors,
  (newColors) => {
    if (!renderer.value)
      return

    renderer.value.updateColors(newColors)
  },
)

const canvasRef = useTemplateRef('canvasRef')

defineExpose({
  start: () => {
    if (!renderer.value)
      return

    renderer.value.start()
  },
  pause: () => {
    if (!renderer.value)
      return

    renderer.value.pause()
  },
  resume: () => {
    if (!renderer.value)
      return

    renderer.value.start()
  },
})

onMounted(() => {
  if (!canvasRef.value)
    return

  renderer.value = new GradientRenderer(canvasRef.value, props.colors, props.maxFps, props.driftSpeed)

  if (props.autoStart)
    renderer.value.start()
})
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>

<style scoped>

</style>
