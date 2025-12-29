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
  Divider,
  Fade,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

type AuthStep = 'phone' | 'code' | 'success'

// 🎨 پالت جدید بر اساس لوگو (بدون زرد)
const brandColors = {
  navy: '#202040',
  blue: '#204070',
  cyan: '#1BA4D7',   // جایگزین زرد
  orange: '#D45B3E', // نارنجی/قرمز لوگو
}

const LOGO_SRC = '/images/logo.png' // مسیر لوگوی خودت

// تبدیل اعداد فارسی/عربی به انگلیسی و حذف کاراکترهای اضافی
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
    if (/[0-9+]/.test(ch)) {
      out += ch
    }
  }

  // حذف فاصله، خط تیره و نیم‌فاصله
  return out.replace(/[\s\-\u200c]/g, '')
}

// چک کردن موبایل ایران
const isValidIranianMobile = (value: string): boolean => {
  const v = normalizePhoneInput(value)
  const irMobileRegex = /^(?:\+98|0098|98|0)?9\d{9}$/
  return irMobileRegex.test(v)
}

export const AuthDialog = ({ open, onClose }: Props) => {
  const [step, setStep] = useState<AuthStep>('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [codeError, setCodeError] = useState<string | null>(null)
  const [resendSeconds, setResendSeconds] = useState(0)

  const resetState = () => {
    setStep('phone')
    setPhone('')
    setCode('')
    setIsSubmitting(false)
    setPhoneError(null)
    setCodeError(null)
    setResendSeconds(0)
  }

  const handleClose = () => {
    if (isSubmitting) return
    resetState()
    onClose()
  }

  useEffect(() => {
    if (!open) {
      resetState()
    }
  }, [open])

  // تایمر برای ارسال مجدد کد
  useEffect(() => {
    if (resendSeconds <= 0) return
    const id = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [resendSeconds])

  const handleSendCode = async () => {
    setPhoneError(null)

    if (!isValidIranianMobile(phone)) {
      setPhoneError('شماره موبایل را به‌درستی وارد کنید (مثلاً ۰۹۱۲۱۲۳۴۵۶۷)')
      return
    }

    const normalized = normalizePhoneInput(phone)
    // اینجا اگر خواستی می‌تونی برای API به فرمت مشخص تبدیلش کنی
    // مثلاً:
    // const apiPhone = normalized.startsWith('0') ? `98${normalized.slice(1)}` : normalized

    setIsSubmitting(true)
    try {
      // 🔌 اینجا API ارسال کد SMS را صدا بزن
      // await sendOtp({ phone: apiPhone })

      setStep('code')
      setResendSeconds(60) // ۶۰ ثانیه تا ارسال مجدد
    } catch (e) {
      setPhoneError('در ارسال کد مشکلی پیش آمد. لطفاً دوباره تلاش کنید.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyCode = async () => {
    setCodeError(null)

    const normalizedCode = code.replace(/[^0-9]/g, '')
    if (normalizedCode.length < 4) {
      setCodeError('کد تأیید را کامل وارد کنید')
      return
    }

    setIsSubmitting(true)
    try {
      // 🔌 اینجا API تأیید کد را صدا بزن
      // const result = await verifyOtp({ phone: normalizePhoneInput(phone), code: normalizedCode })

      setStep('success')
    } catch (e) {
      setCodeError('کد وارد شده صحیح نیست. لطفاً دوباره تلاش کنید.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToPhone = () => {
    if (isSubmitting) return
    setStep('phone')
    setCode('')
    setCodeError(null)
  }

  const handleResendCode = () => {
    if (resendSeconds > 0 || isSubmitting) return
    handleSendCode()
  }

  const isPhoneStep = step === 'phone'
  const isCodeStep = step === 'code'
  const isSuccessStep = step === 'success'

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'hidden',
          bgcolor: 'transparent',
          boxShadow: '0 24px 70px rgba(0,0,0,0.7)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          p: 1,
          bgcolor: brandColors.navy,
          backgroundImage: `
            radial-gradient(circle at top, ${brandColors.blue} 0, ${brandColors.navy} 55%, #050510 100%)
          `,
          color: '#fff',
          direction: 'rtl',
        }}
      >
        {/* هاله‌های پس‌زمینه */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.4,
            backgroundImage: `
              radial-gradient(circle at 10% 0%, rgba(255,255,255,0.22) 0, transparent 45%),
              radial-gradient(circle at 90% 100%, rgba(27,164,215,0.25) 0, transparent 50%)
            `,
          }}
        />

        {/* دکمه بستن */}
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            zIndex: 2,
            color: 'rgba(255,255,255,0.7)',
            '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* هدر */}
        <Box
          sx={{
            px: 4,
            pt: 3.5,
            pb: 2,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Stack direction="row" alignItems="center"  spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '.04em',
                  fontSize: 14,
                  color: '#fff',
                }}
              >
                ورود / ثبت‌نام
              </Typography>
            </Box>
          </Stack>

          {/* نوار مرحله */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ mt: 2.5 }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  height: 3,
                  borderRadius: 999,
                  bgcolor: 'rgba(255,255,255,0.14)',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: isPhoneStep ? '33%' : isCodeStep ? '66%' : '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(90deg, ${brandColors.cyan}, ${brandColors.orange})`,
                    transition: 'width .35s ease-out',
                  }}
                />
              </Box>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 64, textAlign: 'left' }}
            >
              {isPhoneStep && 'مرحله ۱ از ۲'}
              {isCodeStep && 'مرحله ۲ از ۲'}
              {isSuccessStep && 'انجام شد'}
            </Typography>
          </Stack>
        </Box>

        <Divider
          sx={{
            borderColor: 'rgba(255,255,255,0.08)',
            borderBottomWidth: 1,
          }}
        />

        {/* محتوا */}
        <DialogContent
          sx={{
            position: 'relative',
            zIndex: 1,
            pt: 3,
            pb: 2.5,
            px: 4,
          }}
        >
          {isPhoneStep && (
            <Fade in>
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, mb: 1, fontSize: 15.5 }}
                >
                  شماره موبایل خود را وارد کنید
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.75)',
                    mb: 2.5,
                    fontSize: 13,
                  }}
                >
                  برای ارسال بلیت‌ها، پیگیری رزرو و اطلاع‌رسانی پرواز، از همین
                  شماره استفاده می‌کنیم.
                </Typography>

                <TextField
                  label="شماره موبایل"
                  placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (phoneError) setPhoneError(null)
                  }}
                  onBlur={() => {
                    if (phone && !isValidIranianMobile(phone)) {
                      setPhoneError(
                        'شماره موبایل را به‌درستی وارد کنید (مثلاً ۰۹۱۲۱۲۳۴۵۶۷)'
                      )
                    }
                  }}
                  fullWidth
                  type="tel"
                  autoFocus
                  error={Boolean(phoneError)}
                  helperText={phoneError || ' '}
                  FormHelperTextProps={{
                    sx: {
                      mt: 1,
                      fontSize: 11,
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: 'rgba(255,255,255,0.8)',
                      '&.Mui-focused': {
                        color: brandColors.cyan,
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      direction: 'ltr',
                      textAlign: 'center',
                      bgcolor: 'rgba(3,8,40,0.9)',
                      borderRadius: 2,
                      color: '#fff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.18)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.4)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: brandColors.cyan,
                        boxShadow: `0 0 0 1px ${brandColors.cyan}40`,
                      },
                    },
                    inputProps: {
                      style: {
                        textAlign: 'center',
                        letterSpacing: '0.06em',
                      },
                    },
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: 'block',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 11,
                  }}
                >
                  با ادامه‌دادن، قوانین حریم خصوصی و شرایط استفاده از خدمات
                  آژانس را می‌پذیرید.
                </Typography>
              </Box>
            </Fade>
          )}

          {isCodeStep && (
            <Fade in>
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, mb: 1, fontSize: 15.5 }}
                >
                  کد تأیید را وارد کنید
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.75)',
                    mb: 2.5,
                    fontSize: 13,
                  }}
                >
                  کدی که برای شماره{' '}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {phone || 'شماره وارد شده'}
                  </Box>{' '}
                  ارسال شده را اینجا وارد کنید.
                </Typography>

                <TextField
                  label="کد پیامکی"
                  placeholder="•••••"
                  value={code}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6)
                    setCode(val)
                    if (codeError) setCodeError(null)
                  }}
                  fullWidth
                  type="tel"
                  error={Boolean(codeError)}
                  helperText={codeError || ' '}
                  FormHelperTextProps={{
                    sx: {
                      mt: 1,
                      fontSize: 11,
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: 'rgba(255,255,255,0.8)',
                      '&.Mui-focused': {
                        color: brandColors.cyan,
                      },
                    },
                  }}
                  InputProps={{
                    sx: {
                      direction: 'ltr',
                      textAlign: 'center',
                      bgcolor: 'rgba(3,8,40,0.9)',
                      borderRadius: 2,
                      color: '#fff',
                      fontSize: 20,
                      letterSpacing: '0.35em',
                      '& input': {
                        textAlign: 'center',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.18)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.4)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: brandColors.orange,
                        boxShadow: `0 0 0 1px ${brandColors.orange}40`,
                      },
                    },
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2.5 }}
                >
                  <Button
                    onClick={handleBackToPhone}
                    size="small"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.06)' },
                    }}
                  >
                    ویرایش شماره
                  </Button>

                  <Button
                    onClick={handleResendCode}
                    size="small"
                    disabled={resendSeconds > 0 || isSubmitting}
                    sx={{
                      fontSize: 12,
                      minWidth: 'auto',
                      px: 0,
                      color: brandColors.cyan,
                      '&.Mui-disabled': {
                        color: 'rgba(255,255,255,0.8)',
                      },
                    }}
                  >
                    {resendSeconds > 0
                      ? `ارسال مجدد کد تا ${resendSeconds} ثانیه`
                      : 'ارسال مجدد کد'}
                  </Button>
                </Stack>
              </Box>
            </Fade>
          )}

          {isSuccessStep && (
            <Fade in>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    backgroundImage: `linear-gradient(90deg, ${brandColors.cyan}, ${brandColors.orange})`,
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  خوش آمدید 👋
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    mb: 2.5,
                    fontSize: 13.5,
                  }}
                >
                  حالا می‌توانید رزروهای خود را مدیریت کنید، بلیت جدید بگیرید و
                  وضعیت پروازها را دنبال کنید.
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11.5,
                  }}
                >
                  هر زمان از این دستگاه وارد شوید، نیازی به وارد کردن دوباره
                  اطلاعات نخواهید داشت.
                </Typography>
              </Box>
            </Fade>
          )}
        </DialogContent>

        {/* اکشن‌ها */}
        <DialogActions
          sx={{
            px: 4,
            pb: 3,
            pt: 1.5,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {!isSuccessStep ? (
            <Button
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              onClick={isPhoneStep ? handleSendCode : handleVerifyCode}
              sx={{
                borderRadius: 999,
                py: 1.2,
                fontWeight: 600,
                fontSize: 14.5,
                textTransform: 'none',
                background:'#313c5f',
                // backgroundImage: `linear-gradient(135deg, ${brandColors.orange}, ${brandColors.cyan})`,
                boxShadow:
                  '0 12px 30px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.1)',
                '&:hover': {
                  // backgroundImage: `linear-gradient(135deg, ${brandColors.cyan}, ${brandColors.orange})`,
                  boxShadow:
                    '0 16px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.1)',
                },
              }}
            >
              {isSubmitting
                ? 'لطفاً صبر کنید...'
                : isPhoneStep
                ? 'دریافت کد تأیید'
                : 'تأیید و ورود'}
            </Button>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderRadius: 999,
                py: 1.1,
                fontWeight: 500,
                fontSize: 14,
                textTransform: 'none',
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#fff',
                  bgcolor: 'rgba(255,255,255,0.06)',
                },
              }}
            >
              شروع سفر بعدی
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  )
}
