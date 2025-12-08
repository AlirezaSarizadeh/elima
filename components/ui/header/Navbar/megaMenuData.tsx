// 1. تعریف تایپ‌ها مطابق با کامپوننت DropdownMenu
export type DropdownItem = {
  label: string;
  href: string;
};

export type MenuItem = {
  id: number;
  label: string; // عنوانی که در نوار بالا نمایش داده می‌شود
  items: DropdownItem[]; // لیست آیتم‌های داخل دراپ‌داون
};

// 2. دیتای اصلاح شده (حذف بخش‌بندی‌های تو در تو برای ساده‌سازی)
export const menuData: MenuItem[] = [
  {
    id: 1,
    label: 'تورهای داخلی',
    items: [
      { label: 'تور کیش', href: '/tours/domestic/kish' },
      { label: 'تور مشهد', href: '/tours/domestic/mashhad' },
      { label: 'تور شیراز', href: '/tours/domestic/shiraz' },
      { label: 'تور قشم', href: '/tours/domestic/qeshm' },
      { label: 'تور اصفهان', href: '/tours/domestic/isfahan' },
    ],
  },
  {
    id: 2,
    label: 'تورهای خارجی',
    items: [
      { label: 'تور استانبول', href: '/tours/international/istanbul' },
      { label: 'تور دبی', href: '/tours/international/dubai' },
      { label: 'تور تفلیس', href: '/tours/international/tbilisi' },
      { label: 'تور پاریس', href: '/tours/international/paris' },
      { label: 'تور رم', href: '/tours/international/rome' },
      { label: 'تور آنتالیا', href: '/tours/international/antalya' },
    ],
  },
  {
    id: 3,
    label: 'پرواز',
    items: [
      { label: 'بلیط تهران - مشهد', href: '/flights/domestic/tehran-mashhad' },
      { label: 'بلیط تهران - کیش', href: '/flights/domestic/tehran-kish' },
      { label: 'بلیط تهران - استانبول', href: '/flights/international/istanbul' },
      { label: 'بلیط تهران - دبی', href: '/flights/international/dubai' },
      { label: 'بلیط تهران - نجف', href: '/flights/international/najaf' },
    ],
  },
  {
    id: 4,
    label: 'ویزا',
    items: [
      { label: 'ویزای شینگن', href: '/visa/schengen' },
      { label: 'ویزای کانادا', href: '/visa/canada' },
      { label: 'ویزای امارات', href: '/visa/uae' },
      { label: 'ویزای چین', href: '/visa/china' },
    ],
  },
  {
    id: 5,
    label: 'اطلاعات سفر',
    items: [
      { label: 'وبلاگ گردشگری', href: '/blog' },
      { label: 'نکات ضروری سفر', href: '/tips' },
      { label: 'سوالات متداول', href: '/faq' },
      { label: 'درباره ما', href: '/about' },
      { label: 'تماس با ما', href: '/contact' },
    ],
  },
];