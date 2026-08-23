/** RGB 颜色 */
export interface RGB {
  r: number
  g: number
  b: number
}

/** 取色配置 */
export interface ExtractOptions {
  /** 提取颜色数量，默认 3 */
  colorCount?: number
  /** 降采样最大边长，默认 100 */
  maxSampleSize?: number
  /** 是否跳过极端颜色，默认 true */
  skipExtremeColors?: boolean
  /** 亮度阈值，默认 30 */
  brightnessThreshold?: number
}

/** 色块配置（内部使用） */
export interface BlobConfig {
  x: number
  y: number
  targetX: number
  targetY: number
  color: RGB
  targetColor: RGB
  radius: number
  /** 缓动系数，越大移动越快 */
  speed: number
  /** 颜色过渡速度 */
  colorSpeed: number
}

/** 组件配置 */
export interface BlurGradientOptions {
  colors?: RGB[]
  /** 动画帧率上限，默认 60 */
  maxFps?: number
  /** 色块漂移速度系数，默认 1 */
  driftSpeed?: number
  /** 是否自动开始动画，默认 true */
  autoStart?: boolean
}
