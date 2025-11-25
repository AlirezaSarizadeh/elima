'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

export const AuthDialog = ({ open, onClose }: Props) => {
  const [step, setStep] = useState(1)

  const next = () => setStep(step + 1)
  const back = () => setStep(step - 1)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>ورود / ثبت‌نام</DialogTitle>
      <DialogContent>
        {step === 1 && <p>مرحله ۱: وارد کردن شماره موبایل</p>}
        {step === 2 && <p>مرحله ۲: کد تایید</p>}
        {step === 3 && <p>مرحله ۳: اطلاعات کاربر</p>}
      </DialogContent>
      <DialogActions>
        {step > 1 && <Button onClick={back}>قبلی</Button>}
        {step < 3 ? (
          <Button onClick={next}>بعدی</Button>
        ) : (
          <Button onClick={onClose}>پایان</Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
