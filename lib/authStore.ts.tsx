'use client'

import { create } from 'zustand'

export type UserShape = {
  name: string | null
  mobile_number: string | null
  email: string | null
}

type AuthState = {
  user: UserShape | null
  loading: boolean
  fetchMe: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchMe: async () => {
    set({ loading: true })
    try {
      const r = await fetch('/api/auth/me', { cache: 'no-store' })
      if (!r.ok) {
        set({ user: null, loading: false })
        return
      }
      const data = await r.json()
      set({ user: data.user ?? null, loading: false })
    } catch {
      set({ user: null, loading: false })
    }
  },

  logout: async () => {
    // ✅ UI فوری تغییر کند
    set({ user: null, loading: false })
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // حتی اگر خطا شد، user null باقی می‌ماند
    }
  },
}))
