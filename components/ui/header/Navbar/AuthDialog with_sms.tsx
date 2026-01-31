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
  Divider,
} from '@mui/material'
import {
  Close as CloseIcon,
  PhoneIphone as PhoneIcon,
  Lock as LockIcon,
  CheckCircleOutline as CheckIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

type AuthStep = 'phone' | 'code' | 'password' | 'success'

// 🎨 پالت رنگی هماهنگ با صفحات جدید
const brandColors = {
  navy: '#1a3454',
  orange: '#f97316',
  lightBg: '#f8fafc',
  textPrimary: '#1a3454',
  textSecondary: '#64748b',
  border: '#e2e8f0',
}

// توابع کمکی
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

const isValidIranianMobile = (value: string): boolean => {
  const v = normalizePhoneInput(value)
  const irMobileRegex = /^(?:\+98|0098|98|0)?9\d{9}$/
  return irMobileRegex.test(v)
}

export const AuthDialog = ({ open, onClose }: Props) => {
  const [step, setStep] = useState<AuthStep>('phone')

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [codeError, setCodeError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const [resendSeconds, setResendSeconds] = useState(0)

  const resetState = () => {
    setStep('phone')
    setPhone('')
    setCode('')
    setPassword('')
    setShowPassword(false)
    setIsSubmitting(false)
    setPhoneError(null)
    setCodeError(null)
    setPasswordError(null)
    setResendSeconds(0)
  }

  const handleClose = () => {
    if (isSubmitting) return
    resetState()
    onClose()
  }

  useEffect(() => {
    if (!open) resetState()
  }, [open])

  useEffect(() => {
    if (resendSeconds <= 0) return
    const id = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [resendSeconds])

  // ---- Actions ----
  const handleSendCode = async () => {
    setPhoneError(null)
    if (!isValidIranianMobile(phone)) {
      setPhoneError('شماره موبایل معتبر نیست')
      return
    }
    setIsSubmitting(true)

    // شبیه‌سازی API
    setTimeout(() => {
      setStep('code')
      setResendSeconds(60)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleVerifyCode = async () => {
    setCodeError(null)
    const normalizedCode = code.replace(/[^0-9]/g, '')
    if (normalizedCode.length < 4) {
      setCodeError('کد تأیید کامل نیست')
      return
    }
    setIsSubmitting(true)

    // شبیه‌سازی API
    setTimeout(() => {
      setStep('success')
      setIsSubmitting(false)
    }, 1000)
  }

  const handleResendCode = () => {
    if (resendSeconds > 0 || isSubmitting) return
    handleSendCode()
  }

  const handleBackToPhone = () => {
    if (isSubmitting) return
    setStep('phone')
    setCode('')
    setCodeError(null)
    setPassword('')
    setPasswordError(null)
  }

  const handleGoToPassword = () => {
    if (isSubmitting) return
    setStep('password')
    setPassword('')
    setPasswordError(null)
    setCodeError(null)
  }

  const handleBackToCode = () => {
    if (isSubmitting) return
    setStep('code')
    setPassword('')
    setPasswordError(null)
  }

  const handlePasswordLogin = async () => {
    setPhoneError(null)
    setPasswordError(null)

    if (!isValidIranianMobile(phone)) {
      setPhoneError('شماره موبایل معتبر نیست')
      return
    }

    const p = password.trim()
    if (p.length < 6) {
      setPasswordError('رمز عبور باید حداقل ۶ کاراکتر باشد')
      return
    }

    setIsSubmitting(true)

    // شبیه‌سازی API (اینجا جایگزین با API واقعی خودتون)
    setTimeout(() => {
      // اگر خواستید شبیه‌سازی خطا:
      // setPasswordError('شماره یا رمز عبور اشتباه است'); setIsSubmitting(false); return;

      setStep('success')
      setIsSubmitting(false)
    }, 1000)
  }

  // ---- Computed ----
  const isPhoneStep = step === 'phone'
  const isCodeStep = step === 'code'
  const isPasswordStep = step === 'password'
  const isSuccessStep = step === 'success'

  const headerTitle = useMemo(() => {
    if (isPhoneStep) return 'ورود به حساب کاربری'
    if (isCodeStep) return 'تایید شماره موبایل'
    if (isPasswordStep) return 'ورود با رمز عبور'
    return 'خوش آمدید!'
  }, [isPhoneStep, isCodeStep, isPasswordStep])

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
        {/* هدر */}
        <Box
          sx={{
            height: 140,
            bgcolor: brandColors.navy,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {/* دایره‌های تزئینی */}
          <Box
            sx={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              bgcolor: 'rgba(249, 115, 22, 0.2)',
              borderRadius: '50%',
              filter: 'blur(30px)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              bgcolor: 'rgba(59, 130, 246, 0.2)',
              borderRadius: '50%',
              filter: 'blur(30px)',
            }}
          />

          {/* آیکون */}
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '20px',
              bgcolor: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1.5,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {isSuccessStep ? (
              <CheckIcon sx={{ color: '#4ade80', fontSize: 32 }} />
            ) : (
              <LockIcon sx={{ color: '#fff', fontSize: 28 }} />
            )}
          </Box>

          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900 }}>
            {headerTitle}
          </Typography>

          {/* بستن */}
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
        </Box>

        {/* محتوا */}
        <DialogContent sx={{ px: 4, py: 4 }}>
          {isPhoneStep && (
            <Fade in>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: brandColors.textSecondary,
                    mb: 3,
                    textAlign: 'center',
                    lineHeight: 1.8,
                  }}
                >
                  برای استفاده از خدمات الیماگشت، لطفاً شماره موبایل خود را وارد کنید.
                </Typography>

                <TextField
                  fullWidth
                  placeholder="شماره موبایل"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (phoneError) setPhoneError(null)
                  }}
                  error={Boolean(phoneError)}
                  helperText={phoneError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: brandColors.textSecondary }} />
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: brandColors.lightBg,
                      borderRadius: 3,
                      '& fieldset': { borderColor: brandColors.border },
                      '&:hover fieldset': { borderColor: '#cbd5e1' },
                      '&.Mui-focused fieldset': {
                        borderColor: brandColors.orange,
                        borderWidth: 1,
                      },
                      input: {
                        textAlign: 'left',
                        dir: 'ltr',
                        fontWeight: 'bold',
                        color: brandColors.navy,
                      },
                    },
                  }}
                />
              </Box>
            </Fade>
          )}

          {isCodeStep && (
            <Fade in>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: brandColors.textSecondary, mb: 3, textAlign: 'center' }}
                >
                  کد ارسال شده به شماره{' '}
                  <Box
                    component="span"
                    sx={{ color: brandColors.navy, fontWeight: 'bold', dir: 'ltr' }}
                  >
                    {phone}
                  </Box>{' '}
                  را وارد کنید.
                </Typography>

                <TextField
                  fullWidth
                  placeholder="- - - -"
                  value={code}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
                    setCode(val)
                    if (codeError) setCodeError(null)
                  }}
                  error={Boolean(codeError)}
                  helperText={codeError}
                  InputProps={{
                    sx: {
                      bgcolor: brandColors.lightBg,
                      borderRadius: 3,
                      fontSize: 24,
                      letterSpacing: 8,
                      textAlign: 'center',
                      '& fieldset': { borderColor: brandColors.border },
                      '&.Mui-focused fieldset': { borderColor: brandColors.orange },
                      input: { textAlign: 'center', fontWeight: 'bold', color: brandColors.navy },
                    },
                  }}
                />

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    onClick={handleBackToPhone}
                    endIcon={<EditIcon sx={{ fontSize: 14, paddingRight: '5px' }} />}
                    sx={{ color: brandColors.textSecondary, fontSize: 12 }}
                  >
                    ویرایش شماره
                  </Button>

                  <Button
                    size="small"
                    onClick={handleResendCode}
                    disabled={resendSeconds > 0 || isSubmitting}
                    sx={{ color: brandColors.orange, fontSize: 12, fontWeight: 'bold' }}
                  >
                    {resendSeconds > 0 ? `${resendSeconds} ثانیه تا ارسال مجدد` : 'ارسال مجدد کد'}
                  </Button>
                </Stack>

                {/* ✅ گزینه جدید: ورود با رمز عبور */}
                <Divider sx={{ my: 3, borderColor: brandColors.border }} />

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleGoToPassword}
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: 3,
                    py: 1.3,
                    fontWeight: 'bold',
                    borderColor: brandColors.border,
                    color: brandColors.navy,
                    bgcolor: '#fff',
                    '&:hover': {
                      borderColor: brandColors.orange,
                      bgcolor: 'rgba(249, 115, 22, 0.06)',
                    },
                    '& .MuiButton-endIcon': {
                      px: 1, // 👈 فاصله آیکون از متن (rtl)
                    },
                  }}
                  endIcon={<LockIcon />}
                >
                  ورود با رمز عبور
                </Button>
              </Box>
            </Fade>
          )}

          {isPasswordStep && (
            <Fade in>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: brandColors.textSecondary,
                    mb: 3,
                    textAlign: 'center',
                    lineHeight: 1.8,
                  }}
                >
                  شماره موبایل و رمز عبور خود را وارد کنید.
                </Typography>

                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    placeholder="شماره موبایل"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (phoneError) setPhoneError(null)
                    }}
                    error={Boolean(phoneError)}
                    helperText={phoneError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: brandColors.textSecondary }} />
                        </InputAdornment>
                      ),
                      sx: {
                        bgcolor: brandColors.lightBg,
                        borderRadius: 3,
                        '& fieldset': { borderColor: brandColors.border },
                        '&:hover fieldset': { borderColor: '#cbd5e1' },
                        '&.Mui-focused fieldset': {
                          borderColor: brandColors.orange,
                          borderWidth: 1,
                        },
                        input: {
                          textAlign: 'left',
                          dir: 'ltr',
                          fontWeight: 'bold',
                          color: brandColors.navy,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    placeholder="رمز عبور"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (passwordError) setPasswordError(null)
                    }}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={() => setShowPassword((p) => !p)}
                            edge="start"
                            sx={{ color: brandColors.textSecondary }}
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        bgcolor: brandColors.lightBg,
                        borderRadius: 3,
                        '& fieldset': { borderColor: brandColors.border },
                        '&:hover fieldset': { borderColor: '#cbd5e1' },
                        '&.Mui-focused fieldset': {
                          borderColor: brandColors.orange,
                          borderWidth: 1,
                        },
                        input: {
                          fontWeight: 'bold',
                          color: brandColors.navy,
                          dir: 'rtl',          // 👈 جهت نوشتن
                          textAlign: 'left',  // 👈 چسبیدن به راست
                        },
                      },
                    }}
                  />

                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    onClick={handleBackToCode}
                    sx={{ color: brandColors.textSecondary, fontSize: 12 }}
                  >
                    بازگشت به ورود با کد
                  </Button>

                  <Button
                    size="small"
                    onClick={handleBackToPhone}
                    endIcon={<EditIcon sx={{ fontSize: 14, paddingRight: '5px' }} />}
                    sx={{ color: brandColors.textSecondary, fontSize: 12 }}
                  >
                    تغییر شماره
                  </Button>
                </Stack>
              </Box>
            </Fade>
          )}

          {isSuccessStep && (
            <Fade in>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h6" sx={{ color: brandColors.navy, fontWeight: 'bold', mb: 1 }}>
                  ورود موفقیت‌آمیز
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.textSecondary }}>
                  شما با موفقیت وارد حساب کاربری خود شدید.
                </Typography>
              </Box>
            </Fade>
          )}
        </DialogContent>

        {/* اکشن‌ها */}
        <DialogActions sx={{ px: 4, pb: 4, pt: 0, flexDirection: 'column', gap: 1 }}>
          {!isSuccessStep ? (
            <Button
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              onClick={isPhoneStep ? handleSendCode : isCodeStep ? handleVerifyCode : handlePasswordLogin}
              sx={{
                bgcolor: brandColors.navy,
                color: '#fff',
                borderRadius: 3,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: 16,
                boxShadow: '0 10px 15px -3px rgba(26, 52, 84, 0.2)',
                '&:hover': {
                  bgcolor: brandColors.orange,
                  boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3)',
                },
              }}
            >
              {isSubmitting
                ? 'در حال پردازش...'
                : isPhoneStep
                  ? 'دریافت کد تایید'
                  : isCodeStep
                    ? 'ورود به حساب'
                    : 'ورود با رمز عبور'}
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={handleClose}
              sx={{
                bgcolor: '#10b981',
                color: '#fff',
                borderRadius: 3,
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#059669' },
              }}
            >
              ورود به سایت
            </Button>
          )}

          {/* دکمه بازگشت‌های پایین */}
          {isCodeStep && (
            <Button fullWidth onClick={handleBackToPhone} sx={{ color: brandColors.textSecondary, mt: 1 }}>
              بازگشت
            </Button>
          )}

          {isPasswordStep && (
            <Button fullWidth onClick={handleBackToCode} sx={{ color: brandColors.textSecondary, mt: 1 }}>
              بازگشت
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  )
}
