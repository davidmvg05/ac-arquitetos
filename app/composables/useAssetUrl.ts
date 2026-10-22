export const useAssetUrl = () => {
  const config = useRuntimeConfig()
  const withBase = (path: string): string => {
    if (!path) return ''
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
      return path
    }
    const base = (config.app.baseURL || '/').replace(/\/$/, '')
    return `${base}${path.startsWith('/') ? path : `/${path}`}`
  }

  return { withBase }
}
