import { ThemeId } from '@/stores/theme';
import { Settings } from '@/stores/settings';
import { DeferredItem, QuickLink, Todo } from '@/types/item';

export interface configV1 {
  extensionVersion: string,
  configVersion: number,
  exportedAt: number,
  theme: {
    themeId: ThemeId,
  },
  settings: Settings,
  quickLinks: [QuickLink],
  deferred: [DeferredItem],
  todos: [Todo],
}