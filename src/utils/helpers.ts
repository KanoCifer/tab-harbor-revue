/**
 * 从 URL 获取 favicon 地址
 */
export function getFaviconUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    return `${urlObj.origin}/favicon.ico`
  } catch {
    return ''
  }
}

/**
 * 获取字符串的首字母（大写）
 */
export function getInitial(str: string): string {
  return str.charAt(0).toUpperCase()
}

/**
 * 根据字符串生成随机颜色
 */
export function getRandomColor(str: string): string {
  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8',
    '#f7dc6f', '#bb8fce', '#85c1e2', '#f8b739', '#52b788',
    '#e63946', '#457b9d', '#2a9d8f', '#e9c46a', '#f4a261',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}
