import type { ExtractOptions, RGB } from './types'

// 全局缓存
const cache = new Map<string, RGB[]>()

/**
 * 加载图片
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`图片加载失败: ${src}`))
    img.src = src
  })
}

/**
 * Canvas 降采样 + 像素读取
 */
function samplePixels(
  img: HTMLImageElement,
  maxSize: number,
): Uint8ClampedArray {
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
  const w = Math.max(1, Math.floor(img.width * scale))
  const h = Math.max(1, Math.floor(img.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, w, h)

  return ctx.getImageData(0, 0, w, h).data
}

/**
 * 中位切分法提取主色调
 */
function medianCut(
  pixels: Uint8ClampedArray,
  count: number,
  skipExtreme: boolean,
  threshold: number,
): RGB[] {
  // 收集有效像素
  const allPixels: RGB[] = []
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i] || 0
    const g = pixels[i + 1] || 0
    const b = pixels[i + 2] || 0
    const a = pixels[i + 3] || 0

    if (a < 128)
      continue

    if (skipExtreme) {
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b
      if (brightness < threshold || brightness > 255 - threshold)
        continue
    }

    allPixels.push({ r, g, b })
  }

  if (allPixels.length === 0) {
    return [{ r: 80, g: 80, b: 120 }]
  }

  // 迭代切分
  const boxes: RGB[][] = [allPixels]

  while (boxes.length < count) {
    // 找体积最大的盒子切分
    let maxIdx = 0
    let maxRange = -1

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i]!

      if (box.length < 2)
        continue

      let rMin = 255
      let rMax = 0
      let gMin = 255
      let gMax = 0
      let bMin = 255
      let bMax = 0

      for (const p of box) {
        if (p.r < rMin)
          rMin = p.r
        if (p.r > rMax)
          rMax = p.r
        if (p.g < gMin)
          gMin = p.g
        if (p.g > gMax)
          gMax = p.g
        if (p.b < bMin)
          bMin = p.b
        if (p.b > bMax)
          bMax = p.b
      }

      const range = Math.max(rMax - rMin, gMax - gMin, bMax - bMin)
      if (range > maxRange) {
        maxRange = range
        maxIdx = i
      }
    }

    if (maxRange <= 0)
      break

    const target = boxes[maxIdx]!

    // 找最长通道
    let rMin = 255
    let rMax = 0
    let gMin = 255
    let gMax = 0
    let bMin = 255
    let bMax = 0

    for (const p of target) {
      if (p.r < rMin)
        rMin = p.r
      if (p.r > rMax)
        rMax = p.r
      if (p.g < gMin)
        gMin = p.g
      if (p.g > gMax)
        gMax = p.g
      if (p.b < bMin)
        bMin = p.b
      if (p.b > bMax)
        bMax = p.b
    }

    const rRange = rMax - rMin
    const gRange = gMax - gMin
    const bRange = bMax - bMin

    let channel: 'r' | 'g' | 'b' = 'r'
    if (gRange >= rRange && gRange >= bRange)
      channel = 'g'
    else if (bRange >= rRange && bRange >= gRange)
      channel = 'b'

    const sorted = [...target].sort((a, b) => a[channel] - b[channel])
    const mid = Math.floor(sorted.length / 2)

    boxes.splice(maxIdx, 1, sorted.slice(0, mid), sorted.slice(mid))
  }

  // 取每个盒子的平均色
  return boxes.map((box) => {
    let r = 0
    let g = 0
    let b = 0

    for (const p of box) {
      r += p.r
      g += p.g
      b += p.b
    }

    const len = box.length

    return { r: Math.round(r / len), g: Math.round(g / len), b: Math.round(b / len) }
  })
}

/**
 * 调整饱和度
 */
function adjustSaturation(color: RGB, factor: number): RGB {
  const gray = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b
  return {
    r: Math.min(255, Math.max(0, Math.round(gray + (color.r - gray) * factor))),
    g: Math.min(255, Math.max(0, Math.round(gray + (color.g - gray) * factor))),
    b: Math.min(255, Math.max(0, Math.round(gray + (color.b - gray) * factor))),
  }
}

/**
 * 调整亮度
 */
function adjustBrightness(color: RGB, factor: number): RGB {
  return {
    r: Math.min(255, Math.max(0, Math.round(color.r + 255 * factor))),
    g: Math.min(255, Math.max(0, Math.round(color.g + 255 * factor))),
    b: Math.min(255, Math.max(0, Math.round(color.b + 255 * factor))),
  }
}

/**
 * 从图片 URL 提取主色调
 */
export async function extractColors(
  imageUrl: string,
  options: ExtractOptions = {},
): Promise<RGB[]> {
  const {
    colorCount = 4,
    maxSampleSize = 100,
    skipExtremeColors = true,
    brightnessThreshold = 30,
  } = options

  // 查缓存
  const cacheKey = `${imageUrl}_${colorCount}_${skipExtremeColors}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!
  }

  const img = await loadImage(imageUrl)
  const pixels = samplePixels(img, maxSampleSize)
  let colors = medianCut(pixels, colorCount, skipExtremeColors, brightnessThreshold)

  // 后处理：调整饱和度和亮度
  colors = colors.map(c => adjustBrightness(adjustSaturation(c, 1.2), -0.05))

  cache.set(cacheKey, colors)
  return colors
}

/**
 * 清除缓存
 */
export function clearCache(): void {
  cache.clear()
}
