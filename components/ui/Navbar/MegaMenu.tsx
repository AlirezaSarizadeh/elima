'use client'

import { Popover } from '@mui/material'
import { useRef } from 'react'
import { MegaMenuItem } from './MegaMenuItem'
import type { MegaMenuCategory } from './megaMenuData'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type Props = {
  id: number
  label: string
  data: MegaMenuCategory
  openMenuId: number | null
  setOpenMenuId: (id: number | null) => void
}

export const MegaMenu = ({ id, label, data, openMenuId, setOpenMenuId }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isOpen = openMenuId === id

  const handleToggle = () => {
    setOpenMenuId(isOpen ? null : id)
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="text-gray-700 hover:text-blue-600 transition font-medium"
      >
        {label}
        <ExpandMoreIcon className="w-4 h-4 text-gray-600" />

      </button>

      <Popover
        open={isOpen}
        anchorEl={buttonRef.current}
        onClose={() => setOpenMenuId(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          className: 'shadow-lg rounded-md mt-3',
        }}
      >
        <div className=" bg-white p-4 w-[600px] max-w-full">
          <MegaMenuItem category={data} />
        </div>
      </Popover>
    </>
  )
}
