import type { BlobConfig, RGB } from './types'

/**
 * Canvas 渐变渲染器
 * 负责绘制色块并驱动位移动画
 */
export class GradientRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private blobs: BlobConfig[] = []
  private animId = 0
  private running = false
  private lastFrameTime = 0
  private frameInterval: number
  private resizeObserver: ResizeObserver
  private dpr: number

  constructor(
    canvas: HTMLCanvasElement,
    colors: RGB[],
    maxFps = 60,
    driftSpeed = 1,
  ) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.frameInterval = 1000 / maxFps
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)

    // 初始化色块
    this.blobs = colors.map(color => this.createBlob(color, driftSpeed))

    // 监听容器尺寸变化
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(canvas)
    this.resize()
  }

  private createBlob(color: RGB, driftSpeed: number): BlobConfig {
    const x = 0.1 + Math.random() * 0.8
    const y = 0.1 + Math.random() * 0.8
    return {
      x,
      y,
      targetX: 0.1 + Math.random() * 0.8,
      targetY: 0.1 + Math.random() * 0.8,
      color: { ...color },
      targetColor: { ...color },
      radius: 0.5 + Math.random() * 0.2,
      speed: (0.001 + Math.random() * 0.003) * driftSpeed,
      colorSpeed: 0.02 + Math.random() * 0.02,
    }
  }

  private resize() {
    const w = this.canvas.clientWidth
    const h = this.canvas.clientHeight
    this.canvas.width = w * this.dpr
    this.canvas.height = h * this.dpr
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  }

  /**
   * 更新色块位置（缓动插值）
   */
  private updatePositions() {
    for (const blob of this.blobs) {
      // 位置缓动
      blob.x += (blob.targetX - blob.x) * blob.speed
      blob.y += (blob.targetY - blob.y) * blob.speed

      // 颜色缓动
      blob.color.r += (blob.targetColor.r - blob.color.r) * blob.colorSpeed
      blob.color.g += (blob.targetColor.g - blob.color.g) * blob.colorSpeed
      blob.color.b += (blob.targetColor.b - blob.color.b) * blob.colorSpeed

      // 到达目标附近 → 分配新目标
      const dist = Math.hypot(blob.targetX - blob.x, blob.targetY - blob.y)
      if (dist < 0.005) {
        blob.targetX = 0.05 + Math.random() * 0.9
        blob.targetY = 0.05 + Math.random() * 0.9
      }
    }
  }

  /**
   * 绘制所有色块
   */
  private draw() {
    const w = this.canvas.clientWidth
    const h = this.canvas.clientHeight

    this.ctx.clearRect(0, 0, w, h)

    for (const blob of this.blobs) {
      const cx = blob.x * w
      const cy = blob.y * h
      const r = blob.radius * Math.max(w, h)

      const cr = Math.round(blob.color.r)
      const cg = Math.round(blob.color.g)
      const cb = Math.round(blob.color.b)

      const gradient = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.6)`)
      gradient.addColorStop(0.4, `rgba(${cr}, ${cg}, ${cb}, 0.25)`)
      gradient.addColorStop(0.7, `rgba(${cr}, ${cg}, ${cb}, 0.08)`)
      gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`)

      this.ctx.fillStyle = gradient
      this.ctx.fillRect(0, 0, w, h)
    }
  }

  /**
   * 动画主循环（带帧率限制）
   */
  private loop = (timestamp: number) => {
    if (!this.running)
      return

    const delta = timestamp - this.lastFrameTime
    if (delta >= this.frameInterval) {
      this.lastFrameTime = timestamp - (delta % this.frameInterval)
      this.updatePositions()
      this.draw()
    }

    this.animId = requestAnimationFrame(this.loop)
  }

  /** 启动动画 */
  start() {
    if (this.running)
      return
    this.running = true
    this.lastFrameTime = performance.now()
    this.animId = requestAnimationFrame(this.loop)
  }

  /** 暂停动画 */
  pause() {
    this.running = false
    cancelAnimationFrame(this.animId)
  }

  /** 销毁渲染器 */
  destroy() {
    this.pause()
    this.resizeObserver.disconnect()
    this.blobs = []
  }

  /**
   * 平滑过渡到新颜色（切歌时调用）
   */
  updateColors(colors: RGB[]) {
    // 如果色块数量变了，重建
    if (colors.length !== this.blobs.length) {
      this.blobs = colors.map((color, i) => {
        const existing = this.blobs[i]
        if (existing) {
          return {
            ...existing,
            targetColor: { ...color },
          }
        }
        return this.createBlob(color, 1)
      })
    }
    else {
      // 数量相同，只更新目标颜色（会平滑过渡）
      this.blobs.forEach((blob, i) => {
        if (colors[i]) {
          blob.targetColor = { ...colors[i] }
        }
      })
    }
  }
}
