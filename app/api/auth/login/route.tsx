import { NextResponse } from 'next/server'
import { signJson } from '../../../../lib/authCookie'

export const runtime = 'nodejs'

const API_BASE = process.env.LARAVEL_API_BASE!

type UserShape = { name: string | null; mobile_number: string | null; email: string | null }

export async function POST(req: Request) {
  try {
    const body = await req.json() // { phone, password }

    const r = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      const msg =
        data?.message ||
        (data?.errors ? Object.values(data.errors).flat().join('، ') : 'خطا در ورود')
      return NextResponse.json({ message: msg }, { status: r.status })
    }

    // لاگین شما گاهی آرایه برمی‌گردونه
    const userObj = Array.isArray(data) ? data?.[0] : data
    const token = userObj?.token
    if (!token) {
      return NextResponse.json({ message: 'توکن در پاسخ سرور وجود ندارد' }, { status: 500 })
    }

    const user: UserShape = {
      name: userObj?.name ?? null,
      mobile_number: userObj?.mobile_number ?? body?.phone ?? null,
      email: userObj?.email ?? null,
    }

    const res = NextResponse.json({ ok: true, user })
    const isProd = process.env.NODE_ENV === 'production'

    res.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    res.cookies.set({
      name: 'auth_user',
      value: signJson(user),
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch {
    return NextResponse.json({ message: 'درخواست نامعتبر' }, { status: 400 })
  }
}
