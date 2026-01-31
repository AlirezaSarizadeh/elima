'use client'

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  IconButton,
  Stack,
  Fade,
  InputAdornment,
  Alert,
} from '@mui/material'
import {
  Close as CloseIcon,
  PhoneIphone as PhoneIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuthStore } from '../../../../lib/authStore.ts'

type Props = {
  open: boolean
  onClose: () => void
}

type AuthMode = 'login' | 'register'

const brandColors = {
  navy: '#1a3454',
  orange: '#f97316',
  lightBg: '#f8fafc',
  textSecondary: '#64748b',
  border: '#e2e8f0',
}

// helpers
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

export const AuthDialog = ({ open, onClose }: Props) => {
  const [mode, setMode] = useState<AuthMode>('login')

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const fetchMe = useAuthStore((s) => s.fetchMe)

  // ✅ refs برای فوکوس بهتر + اینتر
  const fullNameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)

  const resetState = () => {
    setMode('login')
    setFullName('')
    setPhone('')
    setPassword('')
    setPasswordConfirm('')
    setShowPassword(false)
    setShowPasswordConfirm(false)
    setIsSubmitting(false)
    setFormError(null)
    setFieldErrors({})
  }

  const handleClose = () => {
    if (isSubmitting) return
    resetState()
    onClose()
  }

  useEffect(() => {
    if (!open) resetState()
  }, [open])

  // ✅ وقتی دیالوگ باز شد/حالت عوض شد، فوکوس منطقی بده
  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => {
      if (mode === 'register') {
        fullNameRef.current?.focus()
      } else {
        phoneRef.current?.focus()
      }
    }, 50)
    return () => window.clearTimeout(id)
  }, [open, mode])

  const title = useMemo(
    () => (mode === 'login' ? 'ورود به حساب کاربری' : 'ساخت حساب کاربری'),
    [mode]
  )

  const clearFieldError = (key: string) => {
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const validate = () => {
    const errors: Record<string, string> = {}

    if (mode === 'register' && !fullName.trim()) errors.fullName = 'نام و نام خانوادگی الزامی است'
    if (!isValidIranianMobile(phone)) errors.phone = 'شماره موبایل معتبر نیست'

    if (!password) errors.password = 'رمز عبور الزامی است'
    else if (password.length < minPasswordLen) errors.password = `رمز عبور باید حداقل ${minPasswordLen} کاراکتر باشد`

    if (mode === 'register') {
      if (!passwordConfirm) errors.passwordConfirm = 'تکرار رمز عبور الزامی است'
      else if (passwordConfirm !== password) errors.passwordConfirm = 'رمز عبور و تکرار آن یکسان نیست'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const postJson = async (url: string, payload: any) => {
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

  const handleSubmit = async () => {
    if (isSubmitting) return
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

      // ✅ بعد از ست شدن cookie ها، user را از /api/auth/me لود کن
      await fetchMe()

      // ✅ دیالوگ بسته شود تا Navbar فوراً تغییر کند
      handleClose()
    } catch (err: any) {
      setFormError(err?.message ?? 'خطای نامشخص')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ✅ هندل اینتر: رفتن به مرحله بعد (فوکوس بعدی) یا submit
  const handleEnter = (field: 'fullName' | 'phone' | 'password' | 'passwordConfirm') => {
    if (isSubmitting) return

    if (mode === 'login') {
      if (field === 'phone') {
        passwordRef.current?.focus()
        return
      }
      if (field === 'password') {
        void handleSubmit()
        return
      }
      return
    }

    // register
    if (field === 'fullName') {
      phoneRef.current?.focus()
      return
    }
    if (field === 'phone') {
      passwordRef.current?.focus()
      return
    }
    if (field === 'password') {
      passwordConfirmRef.current?.focus()
      return
    }
    if (field === 'passwordConfirm') {
      void handleSubmit()
      return
    }
  }

  const inputSx = {
    bgcolor: brandColors.lightBg,
    borderRadius: 3,
    '& fieldset': { borderColor: brandColors.border },
    '&:hover fieldset': { borderColor: '#cbd5e1' },
    '&.Mui-focused fieldset': { borderColor: brandColors.orange, borderWidth: 1 },
    input: { fontWeight: 'bold', color: brandColors.navy },
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 6,
          overflow: 'hidden',
          bgcolor: '#fff',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          backgroundImage: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', direction: 'rtl', p: 0 }}>
        {/* Header */}
        <Box
          sx={{
            height: 150,
            bgcolor: brandColors.navy,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            px: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, textAlign: 'center' }}>
            {title}
          </Typography>

          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              color: 'rgba(255,255,255,0.6)',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Mode Switch */}
          <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
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
                px: 2,
                py: 0.6,
                fontWeight: 'bold',
                bgcolor: mode === 'login' ? '#fff' : 'transparent',
                color: mode === 'login' ? brandColors.navy : '#fff',
                borderColor: 'rgba(255,255,255,0.35)',
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
                px: 2,
                py: 0.6,
                fontWeight: 'bold',
                bgcolor: mode === 'register' ? '#fff' : 'transparent',
                color: mode === 'register' ? brandColors.navy : '#fff',
                borderColor: 'rgba(255,255,255,0.35)',
              }}
            >
              ثبت‌نام
            </Button>
          </Stack>
        </Box>

        {/* ✅ فرم: با Enter هم submit می‌شود */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            void handleSubmit()
          }}
        >
          <DialogContent sx={{ px: 4, py: 3.5 }}>
            {formError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>
                {formError}
              </Alert>
            )}

            <Fade in>
              <Stack spacing={1.6}>
                {mode === 'register' && (
                  <TextField
                    fullWidth
                    placeholder="نام و نام خانوادگی"
                    value={fullName}
                    inputRef={fullNameRef}
                    onChange={(e) => {
                      setFullName(e.target.value)
                      clearFieldError('fullName')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleEnter('fullName')
                      }
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
                  inputRef={phoneRef}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    clearFieldError('phone')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleEnter('phone')
                    }
                  }}
                  error={Boolean(fieldErrors.phone)}
                  helperText={fieldErrors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: brandColors.textSecondary }} />
                      </InputAdornment>
                    ),
                    sx: {
                      ...inputSx,
                      input: { textAlign: 'left', dir: 'ltr', fontWeight: 'bold', color: brandColors.navy },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  placeholder="رمز عبور"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  inputRef={passwordRef}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    clearFieldError('password')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleEnter('password')
                    }
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
                        <IconButton onClick={() => setShowPassword((p) => !p)} edge="end" tabIndex={-1}>
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
                    inputRef={passwordConfirmRef}
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value)
                      clearFieldError('passwordConfirm')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleEnter('passwordConfirm')
                      }
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
                          <IconButton
                            onClick={() => setShowPasswordConfirm((p) => !p)}
                            edge="end"
                            tabIndex={-1}
                          >
                            {showPasswordConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: inputSx,
                    }}
                  />
                )}
              </Stack>
            </Fade>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                color: brandColors.textSecondary,
                mt: 1.8,
                textAlign: 'center',
              }}
            >
              مثال شماره: 0912xxxxxxx
            </Typography>
          </DialogContent>

          <DialogActions sx={{ px: 4, pb: 4, pt: 0, flexDirection: 'column', gap: 1 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                bgcolor: brandColors.navy,
                color: '#fff',
                borderRadius: 3,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: 16,
                boxShadow: 'none',
                '&:hover': { bgcolor: brandColors.orange },
              }}
            >
              {isSubmitting ? 'در حال پردازش...' : mode === 'login' ? 'ورود' : 'ثبت‌نام'}
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  )
}
