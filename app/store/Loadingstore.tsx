type LoadingListener = (isLoading: boolean) => void

let activeRequests = 0
const listeners = new Set<LoadingListener>()

export function subscribeLoading(listener: LoadingListener): () => void {
  listeners.add(listener)
  // Immediately notify with current state
  listener(activeRequests > 0)

  return () => {
    listeners.delete(listener)
  }
}

function notify() {
  const isLoading = activeRequests > 0
  listeners.forEach((listener) => {
    try {
      listener(isLoading)
    } catch {
      // ignore listener errors
    }
  })
}

export function startRequest() {
  activeRequests += 1
  notify()
}

export function endRequest() {
  activeRequests = Math.max(0, activeRequests - 1)
  notify()
}
 