export interface DeferredItem {
  id: string
  url: string
  title: string
  savedAt: string
  completed: boolean
  completedAt?: string
  dismissed: boolean
}

export interface Todo {
  id: string
  title: string
  description: string
  createdAt: string
  completed: boolean
  completedAt?: string
  dismissed: boolean
}

export interface Shortcut {
  id: string
  url: string
  title: string
  favIconUrl?: string
  emoji?: string
  customIcon?: string
  createdAt: string
}

export interface QuickLink {
  id: string
  title: string
  url: string
}
