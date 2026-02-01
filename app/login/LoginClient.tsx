'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Stack,
  Alert,
  Skeleton,
  Divider,
  Chip,
} from '@mui/material'
import {
  PhoneIphone as PhoneIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Shield as ShieldIcon,
  SupportAgent as SupportIcon,
  FlightTakeoff as FlightIcon,
} from '@mui/icons-material'

import { useAuthStore } from '../../lib/authStore.ts'

type AuthMode = 'login' | 'register'

const brandColors = {
  navy: '#1a3454',
  orange: '#f97316',
  lightBg: '#f8fafc',
  textSecondary: '#64748b',
  border: '#e2e8f0',
}

// ---------- Helpers ----------
const normalizePhoneInput = (raw: string): string => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩'
  let out = ''
  for (const ch of raw) {
    const idxP = persianDigits.indexOf(ch)
    if (idxP !== -1) {
      out += String(idxP)
      continue
    }
    const idxA = arabicDigits.indexOf(ch)
    if (idxA !== -1) {
      out += String(idxA)
      continue
    }
    if (/[0-9+]/.test(ch)) out += ch
  }
  return out.replace(/[\s\-\u200c]/g, '')
}

const normalizeTo09 = (value: string): string | null => {
  const v = normalizePhoneInput(value)
  if (/^09\d{9}$/.test(v)) return v
  if (/^9\d{9}$/.test(v)) return `0${v}`
  const m = v.match(/^(?:\+98|0098|98)(9\d{9})$/)
  if (m) return `0${m[1]}`
  return null
}

const isValidIranianMobile = (value: string): boolean => normalizeTo09(value) !== null
const minPasswordLen = 6

async function postJson(url: string, payload: any) {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data?.message || 'خطا در ارتباط با سرور')
  return data
}

export default function LoginClient({ redirectTo }: { redirectTo: string }) {
  const router = useRouter()

  // Auth store
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const fetchMe = useAuthStore((s) => s.fetchMe)

  // UI state
  const [mode, setMode] = useState<AuthMode>('login')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // fields
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // toggles
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  // errors
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // اگر کاربر لاگین است، این صفحه را نبیند
  useEffect(() => {
    if (user) router.replace(redirectTo || '/')
  }, [user, router, redirectTo])

  const title = useMemo(
    () => (mode === 'login' ? 'ورود به حساب' : 'ساخت حساب کاربری'),
    [mode]
  )

  const subtitle = useMemo(
    () => (mode === 'login' ? 'به حساب خود وارد شوید' : 'ثبت‌نام کنید و وارد شوید'),
    [mode]
  )

  const inputSx = {
    bgcolor: brandColors.lightBg,
    borderRadius: 3,
    '& fieldset': { borderColor: brandColors.border },
    '&:hover fieldset': { borderColor: '#cbd5e1' },
    '&.Mui-focused fieldset': { borderColor: brandColors.orange, borderWidth: 1 },
    input: { fontWeight: 'bold', color: brandColors.navy },
  }

  const clearFieldError = (key: string) => {
    if (!fieldErrors[key]) return
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const validate = () => {
    const errors: Record<string, string> = {}

    if (mode === 'register' && !fullName.trim()) errors.fullName = 'نام و نام خانوادگی الزامی است'
    if (!isValidIranianMobile(phone)) errors.phone = 'شماره موبایل معتبر نیست'

    if (!password) errors.password = 'رمز عبور الزامی است'
    else if (password.length < minPasswordLen) errors.password = `رمز عبور حداقل ${minPasswordLen} کاراکتر`

    if (mode === 'register') {
      if (!passwordConfirm) errors.passwordConfirm = 'تکرار رمز عبور الزامی است'
      else if (passwordConfirm !== password) errors.passwordConfirm = 'رمز عبور و تکرار یکسان نیست'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    setFormError(null)
    if (!validate()) return

    const normalizedPhone = normalizeTo09(phone)!
    setIsSubmitting(true)

    try {
      if (mode === 'login') {
        await postJson('/api/auth/login', { phone: normalizedPhone, password })
      } else {
        await postJson('/api/auth/register', {
          full_name: fullName.trim(),
          phone: normalizedPhone,
          password,
          password_confirmation: passwordConfirm,
        })
      }

      await fetchMe()
      router.replace(redirectTo || '/')
    } catch (err: any) {
      setFormError(err?.message ?? 'خطای نامشخص')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        py: { xs: 2, sm: 4 },
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 60%)',
      }}
    >
      {/* Shell */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 980,
          borderRadius: 6,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.18)',
          border: '1px solid #eef2f7',
          bgcolor: '#fff',
        }}
      >
        {/* Two-column responsive layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            minHeight: { xs: 'auto', md: 540 },
          }}
        >
          {/* Left panel (Brand / Info) */}
          <Box
            sx={{
              position: 'relative',
              bgcolor: brandColors.navy,
              color: '#fff',
              p: { xs: 3, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            {/* decorative blobs */}
            <Box
              sx={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                bgcolor: 'rgba(249, 115, 22, 0.18)',
                borderRadius: '50%',
                filter: 'blur(30px)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: 220,
                height: 220,
                bgcolor: 'rgba(59, 130, 246, 0.18)',
                borderRadius: '50%',
                filter: 'blur(30px)',
              }}
            />

            <Box sx={{ position: 'relative' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Image src="/images/logo-LIGHT.png" alt="logo" width={170} height={46} />
                <Chip
                  size="small"
                  label="ورود امن"
                  icon={<ShieldIcon sx={{ color: '#fff !important' }} />}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.12)',
                    color: '#fff',
                    fontWeight: 900,
                    borderRadius: 999,
                    px: 1,
                  }}
                />
              </Box>

              <Typography variant="h5" sx={{ mt: 3, fontWeight: 1000, lineHeight: 1.25 }}>
                تجربه‌ی رزرو سریع و مطمئن
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.82)', lineHeight: 1.9 }}>
                با ورود به حساب کاربری، وضعیت سفارش‌ها، کیف پول و اطلاعات حساب شما همیشه در دسترس است.
              </Typography>


            </Box>

            {/* bottom small note */}
            <Typography variant="caption" sx={{ position: 'relative', color: 'rgba(255,255,255,0.7)', mt: 3 }}>
              با ورود، شرایط و قوانین استفاده از خدمات را می‌پذیرید.
            </Typography>
          </Box>

          {/* Right panel (Form) */}
          <Box
            sx={{
              p: { xs: 3, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Header of form */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 1000, color: brandColors.navy }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: brandColors.textSecondary, mt: 0.7 }}>
                {subtitle}
              </Typography>

              {/* Tabs */}
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                  size="small"
                  variant={mode === 'login' ? 'contained' : 'outlined'}
                  onClick={() => {
                    if (isSubmitting) return
                    setMode('login')
                    setFormError(null)
                    setFieldErrors({})
                  }}
                  sx={{
                    borderRadius: 999,
                    px: 2.4,
                    py: 0.8,
                    fontWeight: 900,
                    bgcolor: mode === 'login' ? brandColors.navy : 'transparent',
                    color: mode === 'login' ? '#fff' : brandColors.navy,
                    borderColor: 'rgba(26,52,84,0.25)',
                    '&:hover': { bgcolor: mode === 'login' ? brandColors.navy : 'rgba(26,52,84,0.06)' },
                  }}
                >
                  ورود
                </Button>

                <Button
                  size="small"
                  variant={mode === 'register' ? 'contained' : 'outlined'}
                  onClick={() => {
                    if (isSubmitting) return
                    setMode('register')
                    setFormError(null)
                    setFieldErrors({})
                  }}
                  sx={{
                    borderRadius: 999,
                    px: 2.4,
                    py: 0.8,
                    fontWeight: 900,
                    bgcolor: mode === 'register' ? brandColors.navy : 'transparent',
                    color: mode === 'register' ? '#fff' : brandColors.navy,
                    borderColor: 'rgba(26,52,84,0.25)',
                    '&:hover': { bgcolor: mode === 'register' ? brandColors.navy : 'rgba(26,52,84,0.06)' },
                  }}
                >
                  ثبت‌نام
                </Button>
              </Stack>
            </Box>

            {/* Loading hint */}
            {loading && !user && (
              <Box sx={{ mb: 2 }}>
                <Skeleton variant="rounded" height={14} sx={{ borderRadius: 999, mb: 1 }} />
                <Skeleton variant="rounded" height={14} sx={{ borderRadius: 999, width: '70%' }} />
              </Box>
            )}

            {formError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
                {formError}
              </Alert>
            )}

            {/* Fields */}
            <Stack spacing={1.6}>
              {mode === 'register' && (
                <TextField
                  fullWidth
                  placeholder="نام و نام خانوادگی"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value)
                    clearFieldError('fullName')
                  }}
                  error={Boolean(fieldErrors.fullName)}
                  helperText={fieldErrors.fullName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: brandColors.textSecondary }} />
                      </InputAdornment>
                    ),
                    sx: inputSx,
                  }}
                />
              )}

              <TextField
                fullWidth
                placeholder="شماره موبایل"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  clearFieldError('phone')
                }}
                error={Boolean(fieldErrors.phone)}
                helperText={fieldErrors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: brandColors.textSecondary }} />
                    </InputAdornment>
                  ),
                  sx: { ...inputSx, input: { textAlign: 'left', dir: 'ltr', fontWeight: 'bold' } },
                }}
              />

              <TextField
                fullWidth
                placeholder="رمز عبور"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  clearFieldError('password')
                }}
                error={Boolean(fieldErrors.password)}
                helperText={fieldErrors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: brandColors.textSecondary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),                  
                  sx: inputSx,
                }}
              />

              {mode === 'register' && (
                <TextField
                  fullWidth
                  placeholder="تکرار رمز عبور"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value)
                    clearFieldError('passwordConfirm')
                  }}
                  error={Boolean(fieldErrors.passwordConfirm)}
                  helperText={fieldErrors.passwordConfirm}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: brandColors.textSecondary }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPasswordConfirm((p) => !p)} edge="end">
                          {showPasswordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: inputSx,
                  }}
                />
              )}
            </Stack>

            <Button
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              onClick={handleSubmit}
              sx={{
                mt: 2.4,
                bgcolor: brandColors.navy,
                color: '#fff',
                borderRadius: 3,
                py: 1.45,
                fontWeight: 900,
                fontSize: 16,
                boxShadow: '0 10px 15px -3px rgba(26, 52, 84, 0.18)',
                '&:hover': {
                  bgcolor: brandColors.orange,
                  boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.28)',
                },
              }}
            >
              {isSubmitting ? 'در حال پردازش...' : mode === 'login' ? 'ورود' : 'ثبت‌نام'}
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => router.replace('/')}
              sx={{ mt: 1.2, borderRadius: 3, fontWeight: 800, color: brandColors.textSecondary }}
            >
              بازگشت به صفحه اصلی
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
