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
  data: DropdownData
  openMenuId: number | null
  // اصلاح تایپ برای سازگاری با useState
  setOpenMenuId: Dispatch<SetStateAction<number | null>>
  onLinkClick?: () => void // پراپ برای بستن منوی موبایل (دراور)
}

export const MegaMenu = ({ id, label, data, openMenuId, setOpenMenuId, onLinkClick }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const isOpen = openMenuId === id
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // --- هندلرهای دسکتاپ (Hover) ---
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    
    setAnchorEl(event.currentTarget)
    setOpenMenuId(id)
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    
    timeoutRef.current = setTimeout(() => {
      // استفاده از تابع کالبک برای جلوگیری از بستن اشتباهی منوی جدید
      setOpenMenuId((prevId: number | null) => (prevId === id ? null : prevId))
      setAnchorEl(null)
    }, 200)
  }

  // --- هندلر موبایل (Click) ---
  const handleClickMobile = () => {
    if (!isMobile) return
    // اگر باز است ببند، اگر بسته است باز کن
    setOpenMenuId((prevId: number | null) => (prevId === id ? null : id))
  }

  // بستن منو با کلیک بیرون (فقط دسکتاپ، چون موبایل داخل دراور است)
  const handleClickAway = () => {
    if (isOpen && !isMobile) {
      setOpenMenuId(null)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        className="relative w-full md:w-auto" // در موبایل تمام عرض را بگیرد
        onMouseLeave={handleMouseLeave}
      >
        {/* --- دکمه اصلی منو --- */}
        <button
          ref={(el) => {
            if (!anchorEl && isOpen && !isMobile) setAnchorEl(el)
          }}
          onClick={handleClickMobile}
          onMouseEnter={handleMouseEnter}
          className={`
            group flex items-center justify-between gap-1.5 px-4 py-3 text-sm font-bold rounded-xl transition-all duration-300 w-full md:w-auto
            ${isOpen && isMobile
              ? 'bg-blue-50 text-blue-700 shadow-sm' // استایل فعال موبایل
              : isOpen
                ? 'text-blue-600 bg-blue-50' // استایل فعال دسکتاپ
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' // حالت عادی
            }
          `}
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            {/* در موبایل وقتی باز است، یک نقطه آبی کنار متن نشان دهیم */}
            {isMobile && isOpen && (
               <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            )}
            {label}
          </span>
          
          <ExpandMoreIcon
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}
          />
        </button>

        {/* --- منوی شناور دسکتاپ (Popper) --- */}
        {!isMobile && (
          <Popper
            open={isOpen}
            anchorEl={anchorEl}
            placement="bottom-start"
            transition
            style={{ zIndex: 1300, paddingTop: '12px' }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={250}>
                <Paper
                  elevation={0}
                  className="overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] min-w-[240px]"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                  }}
                >
                  <ul className="p-2 space-y-1">
                    {data.items.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onClick={() => setOpenMenuId(null)}
                          className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 group/item"
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

        {/* --- لیست آکاردئونی موبایل (Collapse) --- */}
        {isMobile && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <div className="mt-2 px-2 overflow-hidden w-full">
              <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-2 shadow-inner">
                <ul className="flex flex-col gap-1">
                  {data.items.map((item, index) => (
                    <li
                      key={index}
                      className="animate-slideInRight"
                      style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                           setOpenMenuId(null) // بستن آکاردئون
                           if (onLinkClick) onLinkClick() // بستن دراور اصلی
                        }}
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

        {/* استایل انیمیشن */}
        <style jsx global>{`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .animate-slideInRight {
            animation: slideInRight 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </ClickAwayListener>
  )
}