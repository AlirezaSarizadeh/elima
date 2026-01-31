import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyJson } from '../../../../lib/authCookie'

export const runtime = 'nodejs'

type UserShape = { name: string | null; mobile_number: string | null; email: string | null }

export async function GET() {
  const c = await cookies() // ✅ برای نسخه‌های جدید Next
  const token = c.get('auth_token')?.value
  const userCookie = c.get('auth_user')?.value

  if (!token || !userCookie) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const user = verifyJson<UserShape>(userCookie)
  if (!user) {
    const res = NextResponse.json({ user: null }, { status: 401 })
    const isProd = process.env.NODE_ENV === 'production'
    res.cookies.set({ name: 'auth_token', value: '', path: '/', maxAge: 0, httpOnly: true, secure: isProd, sameSite: 'lax' })
    res.cookies.set({ name: 'auth_user', value: '', path: '/', maxAge: 0, httpOnly: true, secure: isProd, sameSite: 'lax' })
    return res
  }

  return NextResponse.json({ user })
}
