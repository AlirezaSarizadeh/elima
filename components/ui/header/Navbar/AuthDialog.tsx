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
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircleOutline as CheckCircleIcon,
} from '@mui/icons-material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuthStore } from '../../../../lib/authStore.ts'

type Props = { open: boolean; onClose: () => void }
type AuthMode = 'login' | 'register'

const brandColors = {
  navy: '#1a3454',
  orange: '#f97316',
  lightBg: '#f8fafc',
  textSecondary: '#64748b',
  border: '#e2e8f0',
}

const normalizePhoneInput = (raw: string): string => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩'
  let out = ''
  for (const ch of raw) {
    const idxP = persianDigits.indexOf(ch)
    if (idxP !== -1) { out += String(idxP); continue }
    const idxA = arabicDigits.indexOf(ch)
    if (idxA !== -1) { out += String(idxA); continue }
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
  const [successName, setSuccessName] = useState<string | null>(null) // ✅ UX: success state

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

  const fullNameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)

  // ✅ UX fix: reset کامل وقتی dialog بسته میشه
  const resetAll = () => {
    setMode('login')
    setSuccessName(null)
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

  useEffect(() => { if (!open) resetAll() }, [open])

  const handleClose = () => {
    if (isSubmitting) return
    onClose()
  }

  // ✅ UX fix: وقتی mode عوض میشه، فقط password و errors پاک میشن (phone حفظ میشه)
  const switchMode = (next: AuthMode) => {
    if (isSubmitting || next === mode) return
    setMode(next)
    setPassword('')
    setPasswordConfirm('')
    setShowPassword(false)
    setShowPasswordConfirm(false)
    setFormError(null)
    setFieldErrors({})
    setSuccessName(null)
  }

  const title = useMemo(
    () => mode === 'login' ? 'ورود به حساب کاربری' : 'ساخت حساب کاربری',
    [mode]
  )

  const clearFieldError = (key: string) => {
    if (fieldErrors[key]) setFieldErrors((prev) => { const n = { ...prev }; delete n[key]; return n })
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
      // اگر بک‌اند لاگین هم mobile_number می‌خواد، اینجا هم تغییر بده
      await postJson('/api/auth/login', { phone: normalizedPhone, password })
    } else {
      await postJson('/api/auth/register', {
        full_name: fullName.trim(),
        mobile_number: normalizedPhone, // ✅ FIX: server expects mobile_number
        password,
        password_confirmation: passwordConfirm,
      })
    }

    await fetchMe()

    const displayName = fullName.trim() || normalizedPhone
    setSuccessName(displayName)

    setTimeout(() => {
      handleClose()
    }, 1800)
  } catch (err: any) {
    setFormError(err?.message ?? 'خطای نامشخص')
  } finally {
    setIsSubmitting(false)
  }
}

  const handleEnter = (field: 'fullName' | 'phone' | 'password' | 'passwordConfirm') => {
    if (isSubmitting) return
    if (mode === 'login') {
      if (field === 'phone') return passwordRef.current?.focus()
      if (field === 'password') return void handleSubmit()
      return
    }
    if (field === 'fullName') return phoneRef.current?.focus()
    if (field === 'phone') return passwordRef.current?.focus()
    if (field === 'password') return passwordConfirmRef.current?.focus()
    if (field === 'passwordConfirm') return void handleSubmit()
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
      // ✅ UX fix: روی موبایل وقتی keyboard باز میشه dialog اسکرول‌پذیر میشه
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 6,
          overflow: 'hidden',
          bgcolor: '#fff',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          backgroundImage: 'none',
          // موبایل: حداکثر ارتفاع و اسکرول داخلی
          maxHeight: { xs: 'calc(100vh - 32px)', sm: 'none' },
        },
      }}
    >
      <Box sx={{ position: 'relative', direction: 'rtl', p: 0 }}>

        {/* Header */}
        <Box sx={{
          height: 150,
          bgcolor: brandColors.navy,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          px: 2,
        }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, textAlign: 'center' }}>
            {successName ? '🎉 خوش آمدید!' : title}
          </Typography>

          {/* ✅ UX fix: دکمه X در گوشه راست بالا (RTL-friendly) */}
          <IconButton
            onClick={handleClose}
            disabled={isSubmitting}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: 'rgba(255,255,255,0.6)',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Toggle ورود / ثبت‌نام */}
          {!successName && (
            <Stack direction="row" sx={{ mt: 1.5, gap: 1 }}>
              {(['login', 'register'] as AuthMode[]).map((m) => (
                <Button
                  key={m}
                  size="small"
                  onClick={() => switchMode(m)}
                  sx={{
                    borderRadius: 999,
                    px: 2,
                    py: 0.6,
                    fontWeight: 'bold',
                    bgcolor: mode === m ? '#fff' : 'transparent',
                    color: mode === m ? brandColors.navy : '#fff',
                    borderColor: 'rgba(255,255,255,0.35)',
                    border: '1px solid',
                    '&:hover': { bgcolor: mode === m ? '#fff' : 'rgba(255,255,255,0.1)' },
                  }}
                >
                  {m === 'login' ? 'ورود' : 'ثبت‌نام'}
                </Button>
              ))}
            </Stack>
          )}
        </Box>

        {/* ✅ UX fix: Success State */}
        {successName ? (
          <Fade in>
            <Box sx={{ textAlign: 'center', py: 5, px: 4 }}>
              <CheckCircleIcon sx={{ fontSize: 64, color: '#10b981', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 900, color: brandColors.navy, mb: 1 }}>
                {mode === 'login' ? 'ورود موفق' : 'ثبت‌نام موفق'}
              </Typography>
              <Typography variant="body2" sx={{ color: brandColors.textSecondary }}>
                {mode === 'login'
                  ? `خوش برگشتی 👋`
                  : `حساب شما ساخته شد، خوش آمدی!`}
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Box
            component="form"
            onSubmit={(e) => { e.preventDefault(); void handleSubmit() }}
          >
            <DialogContent sx={{ px: 4, py: 3.5 }}>
              {formError && (
                <Alert severity="error" dir="rtl" sx={{ mb: 2, borderRadius: 3 }}>
                  {formError}
                </Alert>
              )}

              <Fade in key={mode}>
                <Stack spacing={1.6}>
                  {mode === 'register' && (
                    <TextField
                      dir="rtl"
                      fullWidth
                      placeholder="نام و نام خانوادگی"
                      value={fullName}
                      inputRef={fullNameRef}
                      onChange={(e) => { setFullName(e.target.value); clearFieldError('fullName') }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleEnter('fullName') } }}
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
                    onChange={(e) => { setPhone(e.target.value); clearFieldError('phone') }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleEnter('phone') } }}
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
                        input: { textAlign: 'left', fontWeight: 'bold', color: brandColors.navy },
                      },
                    }}
                    inputProps={{ dir: 'ltr', inputMode: 'tel' }}
                  />

                  <TextField
                    dir="rtl"
                    fullWidth
                    placeholder="رمز عبور"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    inputRef={passwordRef}
                    onChange={(e) => { setPassword(e.target.value); clearFieldError('password') }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleEnter('password') } }}
                    error={Boolean(fieldErrors.password)}
                    helperText={fieldErrors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(p => !p)} edge="end" tabIndex={-1}>
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: inputSx,
                    }}
                  />

                  {mode === 'register' && (
                    <TextField
                      dir="rtl"
                      fullWidth
                      placeholder="تکرار رمز عبور"
                      type={showPasswordConfirm ? 'text' : 'password'}
                      value={passwordConfirm}
                      inputRef={passwordConfirmRef}
                      onChange={(e) => { setPasswordConfirm(e.target.value); clearFieldError('passwordConfirm') }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleEnter('passwordConfirm') } }}
                      error={Boolean(fieldErrors.passwordConfirm)}
                      helperText={fieldErrors.passwordConfirm}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPasswordConfirm(p => !p)} edge="end" tabIndex={-1}>
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
                  '&.Mui-disabled': { bgcolor: '#94a3b8', color: '#fff' },
                }}
              >
                {isSubmitting
                  ? 'در حال پردازش...'
                  : mode === 'login' ? 'ورود' : 'ثبت‌نام'}
              </Button>
            </DialogActions>
          </Box>
        )}
      </Box>
    </Dialog>
  )
}