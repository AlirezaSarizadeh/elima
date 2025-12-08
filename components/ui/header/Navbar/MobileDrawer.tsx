'use client'

import { Collapse } from '@mui/material'
import Link from 'next/link'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { DropdownItem } from './megaMenuData'

type Props = {
  id: number
  label: string
  items: DropdownItem[]
  isOpen: boolean
  onToggle: () => void
  onLinkClick: () => void
}

export const MobileAccordionItem = ({ label, items, isOpen, onToggle, onLinkClick }: Props) => {
  return (
    <div className="w-full">
      {/* دکمه اصلی آکاردئون */}
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300
          ${isOpen 
            ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
          }
        `}
      >
        <span className="font-bold text-sm flex items-center gap-3">
          {/* نقطه وضعیت */}
          <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isOpen ? 'bg-blue-500 scale-125' : 'bg-gray-300'}`}></span>
          {label}
        </span>
        
        <ExpandMoreIcon
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}
        />
      </button>

      {/* بدنه آکاردئون */}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="mt-1 pr-3">
          <div className="border-r-2 border-gray-100 py-1">
            <ul className="flex flex-col gap-1">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="animate-slideInRight"
                  style={{ animationDelay: `${index * 40}ms`, opacity: 0 }}
                >
                  <Link
                    href={item.href}
                    onClick={onLinkClick}
                    className="flex items-center justify-between py-2.5 px-3 mr-2 text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200"
                  >
                    {item.label}
                    <ChevronLeftIcon className="w-4 h-4 text-gray-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Collapse>

      <style jsx global>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  )
}