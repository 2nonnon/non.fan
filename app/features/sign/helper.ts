import type { UnencodedFrame } from 'modern-gif'
import { encode } from 'modern-gif'
import workerUrl from 'modern-gif/worker?url'

export function getDuration(length: number) {
  const minK = 2 // 最小系数
  const maxK = 10 // 最大系数（极短路径）
  const refLength = 100 // 参考长度

  // 对数衰减
  const k = minK + (maxK - minK) * Math.exp(-length / (refLength * 2))
  return length * k
}

/**
 *
 * @param t [0, 1]
 */
export function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

const viewBoxRegex = /\s+|,/

export async function generateSignImage(svgEl: SVGElement) {
  const signSvg = svgEl.cloneNode(true) as SVGElement

  const viewBoxStr = signSvg.getAttribute('viewBox')

  if (!viewBoxStr)
    return

  const [_x, _y, width, height] = viewBoxStr.trim().split(viewBoxRegex).map(Number)

  if (!width || !height)
    return

  const fileHandle = await file({
    suggestedName: 'non-sign.gif',
    create: true,
  })

  const paths = Array.from(signSvg.querySelectorAll('path'), (path) => {
    path.removeAttribute('style')

    return path
  })

  const frames: Array<UnencodedFrame> = []

  const serializer = new XMLSerializer()

  const scale = 20

  const scaleCanvas = new OffscreenCanvas(width * scale, height * scale)

  const renderScale = 2

  const renderCanvas = new OffscreenCanvas(width * renderScale, height * renderScale)

  const scaleCtx = scaleCanvas.getContext('2d', {
    willReadFrequently: true,
  })!
  scaleCtx.imageSmoothingEnabled = true
  scaleCtx.imageSmoothingQuality = 'high'

  const renderCtx = renderCanvas.getContext('2d', {
    willReadFrequently: true,
  })!
  renderCtx.imageSmoothingEnabled = true
  renderCtx.imageSmoothingQuality = 'high'

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]!
    const length = Math.ceil(path.getTotalLength())

    const duration = getDuration(length)
    const frameCount = Math.ceil(duration / 30)

    const dashoffsets = Array.from({ length: frameCount }, (_, index) => {
      const t = index / (frameCount - 1)
      const progress = easeInOutSine(t)
      return length * (1 - progress)
    })

    for (let j = 0; j < frameCount; j++) {
      const { promise, resolve } = Promise.withResolvers<void>()

      requestAnimationFrame(async () => {
        const dashoffset = dashoffsets[j]!
        path.setAttribute('stroke-dashoffset', String(dashoffset))
        path.setAttribute('stroke', '#fff')

        const svgString = serializer.serializeToString(signSvg)
        const svgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`

        const img = new Image()
        img.src = svgUrl
        await img.decode()

        scaleCtx.clearRect(0, 0, scaleCanvas.width, scaleCanvas.height)
        scaleCtx.drawImage(img, 0, 0, scaleCanvas.width, scaleCanvas.height)

        renderCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height)
        renderCtx.drawImage(scaleCanvas, 0, 0, renderCanvas.width, renderCanvas.height)

        renderCtx.globalCompositeOperation = 'lighter'
        renderCtx.fillStyle = '#202020'
        renderCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height)

        frames.push({
          width: renderCanvas.width,
          height: renderCanvas.height,
          data: renderCtx.getImageData(0, 0, renderCanvas.width, renderCanvas.height).data,
          delay: j === frameCount - 1 ? 1000 : 30,
        })

        resolve()
      })

      await promise
    }
  }

  const gifBuffer = await encode({
    frames,
    width: renderCanvas.width,
    height: renderCanvas.height,
    workerUrl,
  })

  const blob = new Blob([gifBuffer], { type: 'image/gif' })

  await write(blob, fileHandle)
}

export async function generateSignGif(svgEl: SVGElement) {
  const signSvg = svgEl.cloneNode(true) as SVGElement

  const viewBoxStr = signSvg.getAttribute('viewBox')

  if (!viewBoxStr)
    return

  const [_x, _y, width, height] = viewBoxStr.trim().split(viewBoxRegex).map(Number)

  if (!width || !height)
    return

  const fileHandle = await file({
    suggestedName: 'non-sign.gif',
    create: true,
  })

  const paths = Array.from(signSvg.querySelectorAll('path'), (path) => {
    path.removeAttribute('style')

    return path
  })

  const frames: Array<UnencodedFrame> = []

  const serializer = new XMLSerializer()

  const scale = 20

  const scaleCanvas = new OffscreenCanvas(width * scale, height * scale)

  const renderScale = 2

  const renderCanvas = new OffscreenCanvas(width * renderScale, height * renderScale)

  const scaleCtx = scaleCanvas.getContext('2d', {
    willReadFrequently: true,
  })!
  scaleCtx.imageSmoothingEnabled = true
  scaleCtx.imageSmoothingQuality = 'high'

  const renderCtx = renderCanvas.getContext('2d', {
    willReadFrequently: true,
  })!
  renderCtx.imageSmoothingEnabled = true
  renderCtx.imageSmoothingQuality = 'high'

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]!
    const length = Math.ceil(path.getTotalLength())

    const duration = getDuration(length)
    const frameCount = Math.ceil(duration / 30)

    const dashoffsets = Array.from({ length: frameCount }, (_, index) => {
      const t = index / (frameCount - 1)
      const progress = easeInOutSine(t)
      return length * (1 - progress)
    })

    for (let j = 0; j < frameCount; j++) {
      const { promise, resolve } = Promise.withResolvers<void>()

      requestAnimationFrame(async () => {
        const dashoffset = dashoffsets[j]!
        path.setAttribute('stroke-dashoffset', String(dashoffset))
        path.setAttribute('stroke', '#fff')

        const svgString = serializer.serializeToString(signSvg)
        const svgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`

        const img = new Image()
        img.src = svgUrl
        await img.decode()

        scaleCtx.clearRect(0, 0, scaleCanvas.width, scaleCanvas.height)
        scaleCtx.drawImage(img, 0, 0, scaleCanvas.width, scaleCanvas.height)

        renderCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height)
        renderCtx.drawImage(scaleCanvas, 0, 0, renderCanvas.width, renderCanvas.height)

        renderCtx.globalCompositeOperation = 'lighter'
        renderCtx.fillStyle = '#202020'
        renderCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height)

        frames.push({
          width: renderCanvas.width,
          height: renderCanvas.height,
          data: renderCtx.getImageData(0, 0, renderCanvas.width, renderCanvas.height).data,
          delay: j === frameCount - 1 ? 1000 : 30,
        })

        resolve()
      })

      await promise
    }
  }

  const gifBuffer = await encode({
    frames,
    width: renderCanvas.width,
    height: renderCanvas.height,
    workerUrl,
  })

  const blob = new Blob([gifBuffer], { type: 'image/gif' })

  await write(blob, fileHandle)
}
