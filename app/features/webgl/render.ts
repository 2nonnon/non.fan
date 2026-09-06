export interface WebGLRendererOptions {
  scale?: number
}

// 顶点着色器
const vertSrc = `
      attribute vec2 pos;
      void main() {
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `

// 片段着色器
const fragSrc = `
      precision highp float;
      uniform vec3 iResolution;
      uniform float iTime;
      uniform vec4 iMouse;
      uniform vec4 iDate;

      vec3 skytop = vec3(0.05, 0.2, 0.5);
      vec3 light = normalize(vec3(0.1, 0.25, 0.9));
      vec2 cloudrange = vec2(0.0, 10000.0);
      mat3 m = mat3(0.00, 1.60, 1.20, -1.60, 0.72, -0.96, -1.20, -0.96, 1.28);

      float hash(float n) {
          return fract(cos(n) * 114514.1919);
      }

      float noise(in vec3 x) {
          vec3 p = floor(x);
          vec3 f = smoothstep(0.0, 1.0, fract(x));
          float n = p.x + p.y * 10.0 + p.z * 100.0;
          return mix(
              mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                  mix(hash(n + 10.0), hash(n + 11.0), f.x), f.y),
              mix(mix(hash(n + 100.0), hash(n + 101.0), f.x),
                  mix(hash(n + 110.0), hash(n + 111.0), f.x), f.y), f.z);
      }

      float fbm(vec3 p) {
          float f = 0.5000 * noise(p); p = m * p;
          f += 0.2500 * noise(p); p = m * p;
          f += 0.1666 * noise(p); p = m * p;
          f += 0.0834 * noise(p);
          return f;
      }

      vec3 camera(float time) {
          return vec3(5000.0 * sin(1.0 * time), 5000.0 + 1500.0 * sin(0.5 * time), 6000.0 * time);
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 uv = 2.0 * fragCoord.xy / iResolution.xy - 1.0;
          uv.x *= iResolution.x / iResolution.y;

          float time = (iTime + 13.5 + 44.0) * 1.0;
          vec3 campos = camera(time);
          vec3 camtar = camera(time + 0.4);

          vec3 front = normalize(camtar - campos);
          vec3 right = normalize(cross(front, vec3(0.0, 1.0, 0.0)));
          vec3 up = normalize(cross(right, front));
          vec3 fragAt = normalize(uv.x * right + uv.y * up + front);

          vec4 sum = vec4(0, 0, 0, 0);

          float jitter = hash(fragCoord.x * 12.9898 + fragCoord.y * 78.233);

          for (float depth = 0.0; depth < 15000.0; depth += 200.0) {
              float actualDepth = depth + jitter * 200.0;
              vec3 ray = campos + fragAt * actualDepth;
              if (cloudrange.x < ray.y && ray.y < cloudrange.y) {
                  float alpha = smoothstep(0.5, 1.0, fbm(ray * 0.00025));
                  vec3 localcolor = mix(vec3(1.1, 1.05, 1.0), vec3(0.3, 0.3, 0.2), alpha);
                  alpha = (1.0 - sum.a) * alpha;
                  sum += vec4(localcolor * alpha, alpha);
              }
          }

          float alpha = smoothstep(0.7, 1.0, sum.a);
          sum.rgb /= sum.a + 0.0001;

          float sundot = clamp(dot(fragAt, light), 0.0, 1.0);
          vec3 col = 0.8 * skytop;
          col += 0.47 * vec3(1.6, 1.4, 1.0) * pow(sundot, 350.0);
          col += 0.4 * vec3(0.8, 0.9, 1.0) * pow(sundot, 2.0);

          sum.rgb -= 0.6 * vec3(0.8, 0.75, 0.7) * pow(sundot, 13.0) * alpha;
          sum.rgb += 0.2 * vec3(1.3, 1.2, 1.0) * pow(sundot, 5.0) * (1.0 - alpha);

          col = mix(col, sum.rgb, sum.a);
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `

export class WebGLRenderer {
  private canvas: HTMLCanvasElement
  private gl: WebGLRenderingContext
  private scale: number = 0.5

  constructor(canvas: HTMLCanvasElement, options: WebGLRendererOptions = {}) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl')!
    this.scale = options.scale ?? 0.5
  }

  // 编译着色器
  createShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type)!
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    return shader
  }

  start() {
    this.resize()
    window.addEventListener('resize', () => this.resize())

    const canvas = this.canvas
    const gl = this.gl

    const vertShader = this.createShader(gl, gl.VERTEX_SHADER, vertSrc)!
    const fragShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragSrc)!

    const program = gl.createProgram()
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
    }
    gl.useProgram(program)

    // 全屏四边形
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Uniform 位置
    const uResolution = gl.getUniformLocation(program, 'iResolution')
    const uTime = gl.getUniformLocation(program, 'iTime')
    const uMouse = gl.getUniformLocation(program, 'iMouse')
    const uDate = gl.getUniformLocation(program, 'iDate')

    let mouseX = 0
    let mouseY = 0
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = canvas.height - e.clientY
    })

    const startTime = performance.now()

    const render = () => {
      const time = (performance.now() - startTime) / 1000.0
      const now = new Date()

      gl.uniform3f(uResolution, canvas.width, canvas.height, 1.0)
      gl.uniform1f(uTime, time)
      gl.uniform4f(uMouse, mouseX, mouseY, 0.0, 0.0)
      gl.uniform4f(uDate, now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds())

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      requestAnimationFrame(render)
    }

    render()
  }

  resize() {
    const canvas = this.canvas
    const gl = this.gl
    const scale = this.scale

    // 限制实际渲染尺寸
    canvas.width = Math.floor(window.innerWidth * scale)
    canvas.height = Math.floor(window.innerHeight * scale)
    gl.viewport(0, 0, canvas.width, canvas.height)
  }
}
