import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DeferredItem, Todo, Shortcut, QuickLink } from '@/types'
import { handleUrlSecurityCheck } from '@/utils/helpers'

const STORAGE_KEYS = {
  deferred: 'tabHarborDeferred',
  todos: 'tabHarborTodos',
  shortcuts: 'tabHarborShortcuts',
  quickLinks: 'quick-links',
} as const

export const useDeferredStore = defineStore('deferred', () => {
  const items = ref<DeferredItem[]>([])
  const isLoading = ref(false)

  async function load() {
    isLoading.value = true
    try {
      const result = await chrome.storage.local.get(STORAGE_KEYS.deferred)
      console.log('Loaded from storage:', result);
      let data = result[STORAGE_KEYS.deferred]
      
      // 如果数据是对象但不是数组，转换为数组
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        console.log('Converting object to array');
        data = Object.values(data)
      }
      
      console.log('Deferred data:', data, 'Is array?', Array.isArray(data));
      items.value = Array.isArray(data) ? data : []
      console.log('Items loaded:', items.value.length);
    } catch (error) {
      console.error('Failed to load deferred:', error)
      items.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function save() {
    try {
      console.log('Saving deferred items to storage:', items.value);
      await chrome.storage.local.set({ [STORAGE_KEYS.deferred]: items.value })
      console.log('Save successful');
    } catch (error) {
      console.error('Failed to save deferred:', error)
    }
  }

  async function add(url: string, title: string) {
    // 验证 URL 安全性
    if (!handleUrlSecurityCheck(url, 'add')) {
      throw new Error('Invalid or unsafe URL');
    }

    const item: DeferredItem = {
      id: crypto.randomUUID(),
      url,
      title,
      savedAt: new Date().toISOString(),
      completed: false,
      dismissed: false,
    }
    console.log('Adding deferred item:', item);
    items.value.unshift(item)
    await save()
    console.log('After save, items count:', items.value.length);
    return item
  }

  async function toggleComplete(id: string) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.completed = !item.completed
      item.completedAt = item.completed ? new Date().toISOString() : undefined
      await save()
    }
  }

  async function remove(id: string) {
    items.value = items.value.filter(i => i.id !== id)
    await save()
  }

  const activeItems = () => items.value.filter(i => !i.completed && !i.dismissed)
  const completedItems = () => items.value.filter(i => i.completed && !i.dismissed)

  return {
    items,
    isLoading,
    load,
    save,
    add,
    toggleComplete,
    remove,
    activeItems,
    completedItems,
  }
})

export const useTodosStore = defineStore('todos', () => {
  const items = ref<Todo[]>([])
  const isLoading = ref(false)

  async function load() {
    isLoading.value = true
    try {
      const result = await chrome.storage.local.get(STORAGE_KEYS.todos)
      let data = result[STORAGE_KEYS.todos]
      
      // 如果数据是对象但不是数组，转换为数组
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        data = Object.values(data)
      }
      
      items.value = Array.isArray(data) ? data : []
    } catch (error) {
      console.error('Failed to load todos:', error)
      items.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function save() {
    try {
      await chrome.storage.local.set({ [STORAGE_KEYS.todos]: items.value })
    } catch (error) {
      console.error('Failed to save todos:', error)
    }
  }

  async function add(title: string, description: string = '') {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: new Date().toISOString(),
      completed: false,
      dismissed: false,
    }
    items.value.unshift(todo)
    await save()
    return todo
  }

  async function toggleComplete(id: string) {
    const index = items.value.findIndex(i => i.id === id)
    if (index === -1) return
    
    const item = items.value[index]
    item.completed = !item.completed
    item.completedAt = item.completed ? new Date().toISOString() : undefined
    
    // 从当前位置移除
    items.value.splice(index, 1)
    
    if (item.completed) {
      // 如果标记为完成，找到第一个已完成任务的位置，插到它前面
      const firstCompletedIndex = items.value.findIndex(i => i.completed)
      if (firstCompletedIndex === -1) {
        // 没有已完成任务，放到末尾
        items.value.push(item)
      } else {
        // 插到第一个已完成任务之前（即已完成任务的开头）
        items.value.splice(firstCompletedIndex, 0, item)
      }
    } else {
      // 如果取消完成，找到第一个已完成任务的位置，插到它前面
      const firstCompletedIndex = items.value.findIndex(i => i.completed)
      if (firstCompletedIndex === -1) {
        // 没有已完成任务，放到末尾
        items.value.push(item)
      } else {
        // 插到第一个已完成任务之前（即未完成任务的末尾）
        items.value.splice(firstCompletedIndex, 0, item)
      }
    }
    
    await save()
  }

  async function remove(id: string) {
    items.value = items.value.filter(i => i.id !== id)
    await save()
  }

  const activeItems = () => items.value.filter(i => !i.completed && !i.dismissed)
  const completedItems = () => items.value.filter(i => i.completed && !i.dismissed)

  return {
    items,
    isLoading,
    load,
    save,
    add,
    toggleComplete,
    remove,
    activeItems,
    completedItems,
  }
})

export const useShortcutsStore = defineStore('shortcuts', () => {
  const items = ref<Shortcut[]>([])
  const isLoading = ref(false)

  async function load() {
    isLoading.value = true
    try {
      const result = await chrome.storage.local.get(STORAGE_KEYS.shortcuts)
      items.value = (result[STORAGE_KEYS.shortcuts] as Shortcut[] | undefined) || []
    } catch (error) {
      items.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function save() {
    try {
      await chrome.storage.local.set({ [STORAGE_KEYS.shortcuts]: items.value })
    } catch (error) {
      console.error('Failed to save shortcuts:', error)
    }
  }

  async function add(url: string, title: string, favIconUrl?: string) {
    // 验证 URL 安全性
    if (!handleUrlSecurityCheck(url, 'add')) {
      throw new Error('Invalid or unsafe URL');
    }

    const shortcut: Shortcut = {
      id: crypto.randomUUID(),
      url,
      title,
      favIconUrl,
      createdAt: new Date().toISOString(),
    }
    items.value.unshift(shortcut)
    await save()
    return shortcut
  }

  async function remove(id: string) {
    items.value = items.value.filter(i => i.id !== id)
    await save()
  }

  return {
    items,
    isLoading,
    load,
    save,
    add,
    remove,
  }
})

export const useQuickLinksStore = defineStore('quickLinks', () => {
  const links = ref<QuickLink[]>([])

  // 从 localStorage 加载
  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.quickLinks)
      if (saved) {
        links.value = JSON.parse(saved)
      } else {
        // 默认链接
        links.value = [
          { id: '1', title: 'GitHub', url: 'https://github.com' },
          { id: '2', title: 'Google', url: 'https://google.com' },
          { id: '3', title: 'YouTube', url: 'https://youtube.com' },
        ]
        save()
      }
    } catch (error) {
      console.error('Failed to load quick links:', error)
      links.value = []
    }
  }

  // 保存到 localStorage
  function save() {
    try {
      localStorage.setItem(STORAGE_KEYS.quickLinks, JSON.stringify(links.value))
    } catch (error) {
      console.error('Failed to save quick links:', error)
    }
  }

  // 添加链接
  function add(title: string, url: string) {
    // 验证 URL 安全性
    if (!handleUrlSecurityCheck(url, 'add')) {
      throw new Error('Invalid or unsafe URL')
    }

    const link: QuickLink = {
      id: Date.now().toString(),
      title: title.trim(),
      url: url.trim(),
    }
    links.value.push(link)
    save()
    return link
  }

  // 更新链接
  function update(id: string, title: string, url: string) {
    // 验证 URL 安全性
    if (!handleUrlSecurityCheck(url, 'add')) {
      throw new Error('Invalid or unsafe URL')
    }

    const index = links.value.findIndex(link => link.id === id)
    if (index !== -1) {
      links.value[index] = {
        ...links.value[index],
        title: title.trim(),
        url: url.trim(),
      }
      save()
    }
  }

  // 删除链接
  function remove(id: string) {
    links.value = links.value.filter(link => link.id !== id)
    save()
  }

  return {
    links,
    load,
    save,
    add,
    update,
    remove,
  }
})
