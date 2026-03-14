interface MessageEvent {
  data: {
    event: 'start' | 'stop'
  }
}

function setup(): void {
  let timerId: number
  const interval: number = 16.6

  globalThis.onmessage = (e: MessageEvent) => {
    if (e.data.event === 'start') {
      globalThis.clearInterval(timerId)
      timerId = globalThis.setInterval(() => {
        globalThis.postMessage({})
      }, interval)
    }

    if (e.data.event === 'stop') {
      globalThis.clearInterval(timerId)
    }
  }
}

function createWorker(): Worker {
  const blob = new Blob([`(${setup.toString()})()`])
  const url = URL.createObjectURL(blob)
  return new Worker(url)
}

const handlerMap = new Map<number, Set<() => void>>()
let runCount = 1
let worker: Worker | null = null

if (globalThis.Worker) {
  worker = createWorker()
  worker.onmessage = () => {
    runCount += 1
    for (const [k, v] of handlerMap) {
      if (runCount % k === 0) {
        for (const fn of v) fn()
      }
    }
  }
}

export function workerTimer(handler: () => void, time: number): (() => void) {
  const groupId = Math.round(time / 16.6)
  const fns = handlerMap.get(groupId) ?? new Set()
  fns.add(handler)
  handlerMap.set(groupId, fns)

  if (handlerMap.size === 1 && fns.size === 1) {
    worker?.postMessage({ event: 'start' })
  }

  return () => {
    fns.delete(handler)
    if (fns.size === 0)
      handlerMap.delete(groupId)
    if (handlerMap.size === 0) {
      runCount = 0
      worker?.postMessage({ event: 'stop' })
    }
  }
}
