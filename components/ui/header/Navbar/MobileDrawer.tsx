'use client'

import { Drawer, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

export const MobileDrawer = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="w-64 p-4">
          <p className="font-bold mb-4">منو</p>
          <ul className="space-y-3">
            <li><a href="/tour">تور</a></li>
            <li><a href="/visa">ویزا</a></li>
            <li><a href="/accommodation">اقامت</a></li>
            <li><a href="/ticket">بلیط</a></li>
            <li><a href="/more">بیشتر</a></li>
          </ul>
        </div>
      </Drawer>
    </>
  )
}
