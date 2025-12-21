import Image from "next/image";
import Link from "next/link";

export default function LinksContainer() {
  return (
    <footer className="bg-gray-50 md:pt-12 pt-6 pb-6 text-right" dir="rtl">
      <div className="max-w-7xl px-4 mx-auto">
        
        {/* TOP SECTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Column 5 – Logo + Contact */}
          <div className="text-gray-700">
            <Link href="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="الیماگشت"
                className="w-40 mb-4"
              />
            </Link>

            <p className="text-ls mb-2 text-gray-500 font-light">
              <span className="font-medium">تلفن پشتیبانی:</span>{" "}
              <a href="tel:021428040101" className="hover:text-blue-600 transition-colors" dir="ltr">
                021-428040101
              </a>
            </p>

            <p className="text-ls mb-2 text-gray-500 font-light leading-7">
              آدرس دفتر مرکزی:
              <br />
              تهران، سعادت‌آباد، خیابان کاج، پلاک 16
            </p>

            <p className="text-ls mb-4 text-gray-500 font-light">
              <span className="font-medium">آدرس ایمیل:</span>{" "}
              <a href="mailto:Elimagasht@info.com" className="hover:text-blue-600 transition-colors">
                Elimagasht@info.com
              </a>
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">الیماگشت</h3>
            <ul className="space-y-2 text-gray-500 font-light text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">درباره ما</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">تماس با ما</Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-blue-600 transition-colors">بیمه مسافرتی</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600 transition-colors">پرسش و پاسخ</Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2 text-gray-500 font-light text-sm">
              <li>
                <Link href="/guide" className="hover:text-blue-600 transition-colors">راهنمای خرید</Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-blue-600 transition-colors">قوانین و مقررات</Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-blue-600 transition-colors">راهنمای استرداد</Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-blue-600 transition-colors">مرکز پشتیبانی آنلاین</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">تورهای پرفروش</h3>
            <ul className="space-y-2 text-gray-500 font-light text-sm">
              <li>
                <Link href="/tours/dubai" className="hover:text-blue-600 transition-colors">تور دبی</Link>
              </li>
              <li>
                <Link href="/tours/kish" className="hover:text-blue-600 transition-colors">تور کیش</Link>
              </li>
              <li>
                <Link href="/tours/istanbul" className="hover:text-blue-600 transition-colors">تور استانبول</Link>
              </li>
              <li>
                <Link href="/tours/antalya" className="hover:text-blue-600 transition-colors">تور آنتالیا</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">اطلاعات تکمیلی</h3>
            <ul className="space-y-2 text-gray-500 font-light text-sm">
              <li>
                <Link href="/b2b" className="hover:text-blue-600 transition-colors">فروش سازمانی</Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-blue-600 transition-colors">فرصت‌های شغلی</Link>
              </li>
              <li>
                <Link href="/survey" className="hover:text-blue-600 transition-colors">سنجش رضایتمندی</Link>
              </li>
              <li>
                <Link href="/agencies" className="hover:text-blue-600 transition-colors">همکاری با آژانس‌ها</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-end my-5">
          <div className="flex items-center gap-6">
            <a href="https://telegram.me/elima" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
               <Image src={'/images/telegram-icon.svg'} alt="telegram" width={24} height={24} />
            </a>
            <a href="https://linkedin.com/in/elima" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
               <Image src={'/images/linkedin.svg'} alt="linkedin" width={24} height={24} />
            </a>
            <a href="https://wa.me/989123456789" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
               <Image src={'/images/whatsapp.svg'} alt="whatsapp" width={24} height={24} />
            </a>
            <a href="https://instagram.com/elima" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
               <Image src={'/images/instagram.svg'} alt="instagram" width={24} height={24} />
            </a>
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