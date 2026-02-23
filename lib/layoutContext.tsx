'use client'

import { createContext, useContext } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export type MenuItem = {
  id: number
  sort_order: string
  menu_id: string
  title: string
  link: string
  parent_id: string | null
  status: string
  children: MenuItem[]
}

export type Menu = {
  id: number
  title: string
  position: string
  status: string
  items: MenuItem[]
}

export type SocialMedia = {
  sort_order: string
  status: string
  title: string
  link: string
  image: string
}

export type FAQ = {
  id: number
  sort_order: string
  question: string
  answer: string
  category_id: string
  status: string
}

export type SiteInfo = {
  logo_header: string
  logo_footer: string
  address: string
  phone: string
  email: string
}

export type LayoutData = {
  menu_header: Menu
  menu_footer: Menu[]
  social_media: SocialMedia[]
  faq: FAQ[]
  info: SiteInfo
}

// ─── Context ─────────────────────────────────────────────────────────────────

const LayoutContext = createContext<LayoutData | null>(null)

export const LayoutProvider = ({
  children,
  data,
}: {
  children: React.ReactNode
  data: LayoutData
}) => {
  return <LayoutContext.Provider value={data}>{children}</LayoutContext.Provider>
}

export const useLayout = (): LayoutData => {
  const ctx = useContext(LayoutContext)
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider')
  return ctx
}