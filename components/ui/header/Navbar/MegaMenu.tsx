'use client'

import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import {
  Popper,
  Fade,
  Paper,
  Collapse,
  useMediaQuery,
  useTheme,
  ClickAwayListener,
} from '@mui/material'
import Link from 'next/link'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export type DropdownItem = {
  label: string
  href: string
}

type DropdownData = {
  items: DropdownItem[]
}

type Props = {
  id: number
  label: string
  href?: string           // لینک مستقیم برای آیتم‌های بدون چایلد
  data: DropdownData
  openMenuId: number | null
  setOpenMenuId: Dispatch<SetStateAction<number | null>>
  onLinkClick?: () => void
}

export const MegaMenu = ({ id, label, href = '#', data, openMenuId, setOpenMenuId, onLinkClick }: Props) => {
  const hasChildren = data.items.length > 0

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const isOpen = openMenuId === id
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile || !hasChildren) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setAnchorEl(event.currentTarget)
    setOpenMenuId(id)
  }

  const handleMouseLeave = () => {
    if (isMobile || !hasChildren) return
    timeoutRef.current = setTimeout(() => {
      setOpenMenuId((prevId) => (prevId === id ? null : prevId))
      setAnchorEl(null)
    }, 200)
  }

  const handleClickMobile = () => {
    if (!isMobile || !hasChildren) return
    setOpenMenuId((prevId) => (prevId === id ? null : id))
  }

  const handleClickAway = () => {
    if (isOpen && !isMobile) setOpenMenuId(null)
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  // ── آیتم بدون چایلد: فقط یک Link ساده ────────────────────────────────────
  if (!hasChildren) {
    return (
      <Link
        href={href}
        onClick={onLinkClick}
        className="px-4 py-3 text-sm font-bold rounded-xl text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 whitespace-nowrap"
      >
        {label}
      </Link>
    )
  }

  // ── آیتم با چایلد: دکمه + dropdown ─────────────────────────────────────────
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative w-full md:w-auto" onMouseLeave={handleMouseLeave}>

        <button
          ref={(el) => { if (!anchorEl && isOpen && !isMobile) setAnchorEl(el) }}
          onClick={handleClickMobile}
          onMouseEnter={handleMouseEnter}
          className={`
            group flex items-center justify-between gap-1.5 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300 w-full md:w-auto
            ${isOpen && isMobile
              ? 'bg-blue-50 text-blue-700 shadow-sm'
              : isOpen
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
            }
          `}
        >
          <span className="whitespace-nowrap">{label}</span>
          <ExpandMoreIcon
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`}
            fontSize="small"
          />
        </button>

        {/* دسکتاپ Popper */}
        {!isMobile && (
          <Popper open={isOpen} anchorEl={anchorEl} placement="bottom-start" transition style={{ zIndex: 9999 }}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={200}>
                <Paper
                  elevation={4}
                  onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }}
                  onMouseLeave={handleMouseLeave}
                  sx={{ borderRadius: 3, mt: 1, minWidth: 180, overflow: 'hidden', border: '1px solid #f1f5f9' }}
                >
                  <ul className="flex flex-col py-2">
                    {data.items.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onClick={() => { setOpenMenuId(null); onLinkClick?.() }}
                          className="group/item flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                        >
                          {item.label}
                          <ChevronLeftIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-blue-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Paper>
              </Fade>
            )}
          </Popper>
        )}

        {/* موبایل Collapse */}
        {isMobile && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <div className="mt-2 px-2 overflow-hidden w-full">
              <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-2 shadow-inner">
                <ul className="flex flex-col gap-1">
                  {data.items.map((item, index) => (
                    <li key={index} className="animate-slideInRight" style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}>
                      <Link
                        href={item.href}
                        onClick={() => { setOpenMenuId(null); onLinkClick?.() }}
                        className="group flex items-center justify-between p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-500 group-hover:scale-125 transition-all duration-300"></span>
                          {item.label}
                        </div>
                        <ChevronLeftIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:-translate-x-1 transition-transform duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Collapse>
        )}

        <style jsx global>{`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(10px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideInRight { animation: slideInRight 0.3s ease-out forwards; }
        `}</style>
      </div>
    </ClickAwayListener>
  )
}