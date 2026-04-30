export type ThemeId = 'paper' | 'sage' | 'mist' | 'blush' | 'midnight'

export interface ThemeColors {
  ink: string
  paper: string
  warmGray: string
  muted: string
  accentAmber: string
  accentSage: string
  accentSlate: string
  accentRose: string
  cardBg: string
}

export interface Theme {
  id: ThemeId
  name: string
  colors: ThemeColors
}

export interface ThemePreferences {
  themeId: ThemeId
  customBackground?: string
  surfaceOpacity: number
}
