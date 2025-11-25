'use client'

import Link from 'next/link'
import { MegaMenuCategory } from './megaMenuData'

type Props = {
  category: MegaMenuCategory
}

export const MegaMenuItem = ({ category }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 text-right">
      {category.sections.map((section, index) => (
        <div key={index}>
          <h4 className="font-bold text-gray-800 mb-3 whitespace-nowrap">{section.title}</h4>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-blue-600 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
