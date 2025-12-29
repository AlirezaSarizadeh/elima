import VisaHeader from "../components/LicenseHeader";
import VisaPricingTable from "../components/LicensePricingTable";
import VisaDocuments from "../components/LicenseDocuments";
import VisaInfoSection from "../components/LicenseDescription";
import Image from "next/image";
import LicenseHeader from "../components/LicenseHeader";
import LicenseInfoSection from "../components/LicenseInfoSection";
import LicenseDocuments from "../components/LicenseDocuments";

export default function IntlLicensePage() {
  return (
    <div className="min-h-screen bg-white py-8 pt-0" dir="rtl">
      {/* بنر بالای صفحه – بهتره عکس مرتبط با رانندگی/جاده بذاری */}
      <Image
        src="/images/international-license-header.png"
        width={1440}
        height={480}
        alt="گواهینامه بین‌المللی"
        className="w-full h-auto  md:h-[680px] object-cover"
      />


      <div className="container mx-auto max-w-7xl px-4 -top-10 relative">

        {/* هدر بالای صفحه */}
        <LicenseHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

          {/* ستون اصلی (راست) */}
          <main className="lg:col-span-12 order-2 lg:order-1">

            {/* توضیحات اولیه + Read More */}
            <div className="mb-8">
              <LicenseInfoSection />
            </div>

            {/* تعرفه‌ها */}
            <VisaPricingTable />

            {/* مدارک مورد نیاز */}
            <LicenseDocuments />

            {/* توضیحات تکمیلی / FAQ کوتاه */}
            <div className="text-justify text-gray-600 leading-8 text-sm space-y-4 mt-8">
              <h3 className="font-bold text-gray-800 text-lg mt-6 mb-2">
                انواع گواهینامه بین‌المللی رانندگی
              </h3>
              <p>
                گواهینامه بین‌المللی معمولاً در اعتبارهای مختلف مانند{" "}
                <strong>۱ ساله، ۳ ساله و ۵ ساله</strong> صادر می‌شود. تمامی این
                نسخه‌ها ترجمه رسمی گواهینامه ملی شما بوده و برای رانندگی در
                اکثر کشورهای دنیا قابل استفاده است؛ اما باید همزمان{" "}
                <strong>اصل گواهینامه ایرانی</strong> را نیز همراه داشته باشید.
              </p>

              <h3 className="font-bold text-gray-800 text-lg mt-6 mb-2">
                شرایط اخذ گواهینامه بین‌المللی برای ایرانیان
              </h3>
              <p>
                متقاضی باید دارای گواهینامه رانندگی معتبر از ایران باشد و
                <strong> حداقل ۱۸ سال</strong> سن داشته باشد. این گواهینامه به
                تنهایی جای کارت شناسایی یا گواهینامه داخلی را نمی‌گیرد و صرفاً
                ترجمه رسمی آن برای استفاده در خارج از کشور است. فرآیند ثبت‌نام
                از طریق این سایت به صورت کامل{" "}
                <strong>آنلاین و بدون نیاز به مراجعه حضوری</strong> انجام می‌شود.
              </p>

              <h3 className="font-bold text-gray-800 text-lg mt-6 mb-2">
                در چه کشورهایی قابل استفاده است؟
              </h3>
              <p>
                گواهینامه بین‌المللی ارائه‌شده توسط این مجموعه در بیش از{" "}
                <strong>۱۵۰ کشور</strong> مورد پذیرش شرکت‌های اجاره خودرو و
                پلیس راهنمایی و رانندگی است. با این حال، توصیه می‌کنیم قبل از
                سفر، شرایط کشور مقصد را بررسی کنید تا از قوانین محلی مطمئن شوید.
              </p>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
