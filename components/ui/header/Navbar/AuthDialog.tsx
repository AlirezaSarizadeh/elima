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
} from '@mui/material'
import {
  Close as CloseIcon,
  PhoneIphone as PhoneIcon,
  Lock as LockIcon,
  ArrowBackIosNew as ArrowBackIcon,
  CheckCircleOutline as CheckIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import Image from 'next/image' // اگر نیاز به لوگو دارید

type Props = {
  open: boolean
  onClose: () => void
}

type AuthStep = 'phone' | 'code' | 'success'

// 🎨 پالت رنگی هماهنگ با صفحات جدید
const brandColors = {
  navy: '#1a3454', // سرمه‌ای برند
  orange: '#f97316', // نارنجی برند
  lightBg: '#f8fafc', // پس‌زمینه روشن
  textPrimary: '#1a3454',
  textSecondary: '#64748b', // slate-500
  border: '#e2e8f0', // slate-200
}

// توابع کمکی (همان قبلی‌ها)
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
    if (!open) resetState()
  }, [open])

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
          borderRadius: 6, // گردی زیاد مثل صفحات جدید (rounded-[3rem] ~ 48px -> borderRadius: 6)
          overflow: 'hidden',
          bgcolor: '#fff',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // سایه نرم
          backgroundImage: 'none', // حذف گرادینت تیره قبلی
        },
      }}
    >
      <Box sx={{ position: 'relative', direction: 'rtl', p: 0 }}>
        
        {/* هدر دکوراتیو */}
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
            {/* دایره‌های تزیینی مشابه صفحه تماس با ما */}
            <Box sx={{
                position: 'absolute', top: -30, right: -30, width: 100, height: 100,
                bgcolor: 'rgba(249, 115, 22, 0.2)', // orange with opacity
                borderRadius: '50%', filter: 'blur(30px)'
            }} />
            <Box sx={{
                position: 'absolute', bottom: -20, left: -20, width: 80, height: 80,
                bgcolor: 'rgba(59, 130, 246, 0.2)', // blue with opacity
                borderRadius: '50%', filter: 'blur(30px)'
            }} />

            {/* لوگو یا آیکون */}
             <Box sx={{ 
                 width: 60, height: 60, borderRadius: '20px', bgcolor: 'rgba(255,255,255,0.1)', 
                 display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5,
                 backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)'
             }}>
                 {isSuccessStep ? <CheckIcon sx={{ color: '#4ade80', fontSize: 32 }} /> : <LockIcon sx={{ color: '#fff', fontSize: 28 }} />}
             </Box>
             
             <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900 }}>
                 {isPhoneStep && 'ورود به حساب کاربری'}
                 {isCodeStep && 'تایید شماره موبایل'}
                 {isSuccessStep && 'خوش آمدید!'}
             </Typography>

             {/* دکمه بستن */}
             <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute', top: 12, left: 12, color: 'rgba(255,255,255,0.6)',
                    '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' }
                }}
             >
                 <CloseIcon />
             </IconButton>
        </Box>

        {/* محتوای اصلی */}
        <DialogContent sx={{ px: 4, py: 4 }}>
          
          {isPhoneStep && (
            <Fade in>
              <Box>
                <Typography variant="body2" sx={{ color: brandColors.textSecondary, mb: 3, textAlign: 'center', lineHeight: 1.8 }}>
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
                      '&.Mui-focused fieldset': { borderColor: brandColors.orange, borderWidth: 1 }, // نارنجی برند
                      input: { textAlign: 'left', dir: 'ltr', fontWeight: 'bold', color: brandColors.navy },
                    },
                  }}
                />
              </Box>
            </Fade>
          )}

          {isCodeStep && (
            <Fade in>
              <Box>
                <Typography variant="body2" sx={{ color: brandColors.textSecondary, mb: 3, textAlign: 'center' }}>
                  کد ارسال شده به شماره <Box component="span" sx={{ color: brandColors.navy, fontWeight: 'bold', dir: 'ltr' }}>{phone}</Box> را وارد کنید.
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
                        endIcon={<EditIcon sx={{ fontSize: 14 , paddingRight:'5px' }} />}
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

        {/* دکمه‌ها */}
        <DialogActions sx={{ px: 4, pb: 4, pt: 0, flexDirection: 'column', gap: 1 }}>
            {!isSuccessStep ? (
                <Button
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={isPhoneStep ? handleSendCode : handleVerifyCode}
                    sx={{
                        bgcolor: brandColors.navy, // رنگ اصلی دکمه سرمه‌ای
                        color: '#fff',
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 'bold',
                        fontSize: 16,
                        boxShadow: '0 10px 15px -3px rgba(26, 52, 84, 0.2)', // سایه سرمه‌ای
                        '&:hover': {
                            bgcolor: brandColors.orange, // هاور نارنجی
                            boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3)', // سایه نارنجی
                        }
                    }}
                >
                    {isSubmitting ? 'در حال پردازش...' : isPhoneStep ? 'دریافت کد تایید' : 'ورود به حساب'}
                </Button>
            ) : (
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleClose}
                    sx={{
                        bgcolor: '#10b981', // سبز موفقیت
                        color: '#fff',
                        borderRadius: 3,
                        py: 1.5,
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#059669' }
                    }}
                >
                     ورود به سایت
                </Button>
            )}

            {/* دکمه بازگشت (فقط در مرحله کد) */}
            {isCodeStep && (
                <Button 
                    fullWidth 
                    onClick={handleBackToPhone}
                    sx={{ color: brandColors.textSecondary, mt: 1 }}
                >
                    بازگشت
                </Button>
            )}
        </DialogActions>

      </Box>
    </Dialog>
  )
}