'use client'

import { useEffect } from 'react'
import { useAuthStore } from '../../../../lib/authStore.ts'

export default function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const fetchMe = useAuthStore((s) => s.fetchMe)

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  return <>{children}</>
}
