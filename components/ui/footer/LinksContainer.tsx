'use client';

import Image from "next/image";
import Link from "next/link";
import { useLayout } from "../../../lib/layoutContext";

export default function LinksContainer() {
  const { menu_footer, social_media, info } = useLayout();

  // پیدا کردن منوهای فوتر بر اساس position
  const footerOne = menu_footer.find(m => m.position === 'menuFooterOne');
  const footerTwo = menu_footer.find(m => m.position === 'menuFooterTwo');
  const footerThree = menu_footer.find(m => m.position === 'menuFooterThree');

  // آیکون شبکه اجتماعی بر اساس عنوان
  const socialIconMap: Record<string, string> = {
    'اینستاگرام': '/images/instagram.svg',
    'تلگرام': '/images/telegram-icon.svg',
    'واتساپ': '/images/whatsapp.svg',
    'لینکدین': '/images/linkedin.svg',
  };

  return (
    <footer className="bg-gray-50 md:pt-12 pt-6 pb-6 text-right" dir="rtl">
      <div className="max-w-7xl px-4 mx-auto">

        {/* TOP SECTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Column – Logo + Contact (از info API) */}
          <div className="text-gray-700">
            <Link href="/" className="inline-block">
              <img
                src={info?.logo_footer || "/images/logo.png"}
                alt="الیماگشت"
                className="w-40 mb-4"
              />
            </Link>

            {info?.phone && (
              <p className="text-sm mb-2 text-gray-500 font-light">
                <span className="font-medium">تلفن پشتیبانی:</span>{" "}
                <a
                  href={info.phone}
                  className="hover:text-blue-600 transition-colors"
                  dir="ltr"
                >
                  {info.phone.replace("tel:", "")}
                </a>
              </p>
            )}

            {info?.address && (
              <p className="text-sm mb-2 text-gray-500 font-light leading-7">
                آدرس دفتر مرکزی:
                <br />
                {info.address}
              </p>
            )}

            {info?.email && (
              <p className="text-sm mb-4 text-gray-500 font-light">
                <span className="font-medium">آدرس ایمیل:</span>{" "}
                <a
                  href={`mailto:${info.email}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {info.email}
                </a>
              </p>
            )}
          </div>

          {/* Column – menuFooterOne */}
          {footerOne && footerOne.items.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">{footerOne.title}</h3>
              <ul className="space-y-2 text-gray-500 font-light text-sm">
                {footerOne.items.map(item => (
                  <li key={item.id}>
                    <Link href={item.link} className="hover:text-blue-600 transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column – menuFooterTwo */}
          {footerTwo && footerTwo.items.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">{footerTwo.title}</h3>
              <ul className="space-y-2 text-gray-500 font-light text-sm">
                {footerTwo.items.map(item => (
                  <li key={item.id}>
                    <Link href={item.link} className="hover:text-blue-600 transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column – menuFooterThree */}
          {footerThree && footerThree.items.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">{footerThree.title}</h3>
              <ul className="space-y-2 text-gray-500 font-light text-sm">
                {footerThree.items.map(item => (
                  <li key={item.id}>
                    <Link href={item.link} className="hover:text-blue-600 transition-colors">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column – تورهای پرفروش (استاتیک — از API نمیاد) */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">تورهای پرفروش</h3>
            <ul className="space-y-2 text-gray-500 font-light text-sm">
              <li><Link href="/tours/dubai" className="hover:text-blue-600 transition-colors">تور دبی</Link></li>
              <li><Link href="/tours/kish" className="hover:text-blue-600 transition-colors">تور کیش</Link></li>
              <li><Link href="/tours/istanbul" className="hover:text-blue-600 transition-colors">تور استانبول</Link></li>
              <li><Link href="/tours/antalya" className="hover:text-blue-600 transition-colors">تور آنتالیا</Link></li>
            </ul>
          </div>

        </div>

        {/* Social Icons (از API) */}
        <div className="flex items-center justify-end my-5">
          <div className="flex items-center gap-6">
            {social_media
              .filter(s => s.status === '1')
              .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
              .map((social, i) => {
                const localIcon = socialIconMap[social.title];
                return (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    title={social.title}
                  >
                    {localIcon ? (
                      <Image src={localIcon} alt={social.title} width={24} height={24} />
                    ) : (
                      // اگه آیکون local نداشت، از تصویر API استفاده کن
                      <img src={social.image} alt={social.title} width={24} height={24} />
                    )}
                  </a>
                );
              })}
          </div>
        </div>

        {/* COPYRIGHT */}
        <p className="text-center text-gray-400 font-light text-sm mt-0 border-t border-gray-200 pt-6">
          تمامی حقوق این وب‌گاه محفوظ و مربوط به آژانس مسافرتی الیماگشت است.
        </p>

      </div>
    </footer>
  );
}