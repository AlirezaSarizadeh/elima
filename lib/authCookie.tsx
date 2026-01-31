import crypto from 'node:crypto'

const SECRET = process.env.AUTH_COOKIE_SECRET || 'dev-secret-change-me'

function base64url(input: Buffer | string) {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return b.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function unbase64url(input: string) {
  const pad = input.length % 4
  const padded = input + (pad ? '='.repeat(4 - pad) : '')
  const b64 = padded.replace(/-/g, '+').replace(/_/g, '/')
  return Buffer.from(b64, 'base64')
}

function hmac(data: string) {
  return base64url(crypto.createHmac('sha256', SECRET).update(data).digest())
}

export function signJson(obj: any) {
  const payload = base64url(JSON.stringify(obj))
  const sig = hmac(payload)
  return `${payload}.${sig}`
}

export function verifyJson<T = any>(value: string): T | null {
  const parts = value.split('.')
  if (parts.length !== 2) return null
  const [payload, sig] = parts
  const expected = hmac(payload)

  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return null
  if (!crypto.timingSafeEqual(a, b)) return null

  try {
    const json = unbase64url(payload).toString('utf-8')
    return JSON.parse(json) as T
  } catch {
    return null
  }
}
