import type { LayoutData } from './layoutContext'

const API_BASE = process.env.LARAVEL_API_BASE ?? 'https://api.elimagasht.net/api'

export async function getLayoutData(): Promise<LayoutData> {
  const res = await fetch(`${API_BASE}/layouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // هر ۱ ساعت یه‌بار re-fetch
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch layout data: ${res.status}`)
  }

  return res.json()
}