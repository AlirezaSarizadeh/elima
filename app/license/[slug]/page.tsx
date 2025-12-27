import VisaHeader from "../components/VisaHeader";
import VisaPricingTable from "../components/VisaPricingTable";
import VisaDocuments from "../components/VisaDocuments";
import VisaInfoSection from "../components/VisaDescription"; // همان کامپوننت Read More که قبلا ساختیم
import VisaStickySidebar from "../components/VisaStickySidebar";
import Image from "next/image";

export default function VisaDetailPage() {
  return (
    <div className="min-h-screen bg-white py-8 pt-0" dir="rtl">
      <Image src={'/images/emirates-header.webp'} width={1440} height={480} alt="emirates" className="w-full" />
      <div className="container mx-auto px-0 max-w-7xl px-4 -top-10 relative">

        {/* هدر بالای صفحه */}
        <VisaHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

          {/* ستون اصلی (راست) - محتوای متنی و جداول */}
          <main className="lg:col-span-9 order-2 lg:order-1">

            {/* متن توضیحات اولیه (با قابلیت Read More) */}
            <div className="mb-8">
              {/* از همان کامپوننت VisaInfoSection که قبلاً ساختیم استفاده می‌کنیم */}
              {/* اما چون اینجا متن‌های خاص ویزای دبی است، می‌توانید پراپ متن به آن پاس دهید یا محتوا را تغییر دهید */}
              <VisaInfoSection />
            </div>

            <VisaPricingTable />
            <VisaDocuments />

            {/* سایر توضیحات طولانی متنی (سوالات متداول و ...) */}
            <div className="text-justify text-gray-600 leading-8 text-sm space-y-4">
              <h3 className="font-bold text-gray-800 text-lg mt-6 mb-2">انواع ویزای دبی</h3>
              <p>
                ویزای دبی انواع مختلفی دارد که بر اساس هدف شما از سفر تعیین می‌شود. ویزای توریستی دبی برای کسانی صادر می‌شود که به قصد گردشگری وارد این شهر می‌شوند. این ویزا در انواع ۱۴ روزه، یک ماهه و دو ماهه صادر می‌گردد و قابلیت تمدید نیز دارد.
              </p>
              <h3 className="font-bold text-gray-800 text-lg mt-6 mb-2">شرایط اخذ ویزای آنلاین دبی</h3>
              <p>
                برای دریافت ویزای دبی نیاز به مراجعه حضوری به سفارت نیست و تمام مراحل به صورت آنلاین انجام می‌شود. کافیست اسکن مدارک خود را بارگذاری کنید. پس از بررسی مدارک، ویزای شما به صورت الکترونیکی (E-Visa) صادر و ایمیل می‌شود.
              </p>
            </div>

          </main>

          {/* ستون کناری (چپ) - سایدبار چسبنده */}
          <aside className="lg:col-span-3 order-1 lg:order-2 w-full h-full">
            <VisaStickySidebar />
          </aside>

        </div>
      </div>
    </div>
  );
}