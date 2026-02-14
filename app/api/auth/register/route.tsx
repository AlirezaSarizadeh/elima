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

    const token = data[0]?.token
    if (!token) {
      return NextResponse.json({ message: 'این شماره قبلا ثبت نام شده است ، لطفا وارد شوید' }, { status: 500 })
    }

    // ✅ اینجا مهمه: اگر API name نداد، از full_name استفاده کن
    const user: UserShape = {
      name: data?.name ?? body?.full_name ?? null,
      mobile_number: data?.mobile_number ?? body?.phone ?? null,
      email: data?.email ?? null,
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
