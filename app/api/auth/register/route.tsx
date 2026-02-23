import { NextResponse } from 'next/server'
import { signJson } from '../../../../lib/authCookie'

export const runtime = 'nodejs'

const API_BASE = process.env.LARAVEL_API_BASE!

type UserShape = { name: string | null; mobile_number: string | null; email: string | null }

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // body: { full_name, phone, password, password_confirmation }

    const r = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const data = await r.json().catch(() => ({}))

    if (!r.ok) {
      const msg =
        data?.message ||
        (data?.errors ? Object.values(data.errors).flat().join('، ') : 'خطا در ثبت‌نام')
      return NextResponse.json({ message: msg }, { status: r.status })
    }

    // ✅ API همیشه آرایه برمیگردونه: [{ name, mobile_number, email, token }]
    const userObj = Array.isArray(data) ? data[0] : data
    const token = userObj?.token

    if (!token) {
      return NextResponse.json(
        { message: 'این شماره قبلاً ثبت‌نام شده است، لطفاً وارد شوید' },
        { status: 422 }
      )
    }

    const user: UserShape = {
      name: userObj?.name ?? body?.full_name ?? null,
      mobile_number: userObj?.mobile_number ?? body?.phone ?? null,
      email: userObj?.email ?? null,
    }

    const isProd = process.env.NODE_ENV === 'production'
    const res = NextResponse.json({ ok: true, user })

    const cookieBase = {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 روز
    }

    res.cookies.set({ name: 'auth_token', value: token, ...cookieBase })
    res.cookies.set({ name: 'auth_user', value: signJson(user), ...cookieBase })

    return res
  } catch {
    return NextResponse.json({ message: 'درخواست نامعتبر' }, { status: 400 })
  }
}