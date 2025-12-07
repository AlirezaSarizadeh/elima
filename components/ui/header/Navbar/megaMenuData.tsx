export type MegaMenuCategory = {
  label: string // نمایش در منو
  sections: {
    title: string
    links: { label: string; href: string }[]
  }[]
}

export const megaMenuData: MegaMenuCategory[] = [
  {
    label: 'تورهای داخلی',
    sections: [
      {
        title: 'تورهای محبوب',
        links: [
          { label: 'کیش', href: '/tours/domestic/kish' },
          { label: 'مشهد', href: '/tours/domestic/mashhad' },
          { label: 'شیراز', href: '/tours/domestic/shiraz' },
        ],
      },
    ],
  },
  {
    label: 'تورهای خارجی',
    sections: [
      {
        title: 'تور آسیا',
        links: [
          { label: 'استانبول', href: '/tours/international/istanbul' },
          { label: 'تفلیس', href: '/tours/international/tbilisi' },
        ],
      },
      {
        title: 'تور اروپا',
        links: [
          { label: 'پاریس', href: '/tours/international/paris' },
          { label: 'رم', href: '/tours/international/rome' },
        ],
      },
    ],
  },
  {
    label: 'پرواز',
    sections: [
      {
        title: 'تور خارجی',
        links: [
          { label: 'تهران - مشهد', href: '/flights/domestic/tehran-mashhad' },
          { label: 'تهران - کیش', href: '/flights/domestic/tehran-kish' },
        ],
      },
      {
        title: 'تور خارجی',
        links: [
          { label: 'تهران - استانبول', href: '/flights/international/istanbul' },
          { label: 'تهران - دبی', href: '/flights/international/dubai' },
        ],
      },
    ],
  },
  {
    label: 'ویزا',
    sections: [
      {
        title: 'خدمات ویزا',
        links: [
          { label: 'ویزای شینگن', href: '/visa/schengen' },
          { label: 'ویزای کانادا', href: '/visa/canada' },
          { label: 'ویزای امارات', href: '/visa/uae' },
        ],
      },
    ],
  },
  {
    label: 'اطلاعات سفر',
    sections: [
      {
        title: 'راهنما',
        links: [
          { label: 'وبلاگ گردشگری', href: '/blog' },
          { label: 'نکات سفر', href: '/tips' },
          { label: 'سوالات متداول', href: '/faq' },
        ],
      },
    ],
  },
]
