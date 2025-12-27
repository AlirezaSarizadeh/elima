import Image from "next/image";
import Destinations from "../../components/domestic_tour/features/Destinations";
import FeatureHero from "../../components/domestic_tour/features/FeatureHero";
import TestimonialSlider from "../../components/domestic_tour/features/TestimonialSlider";
import WhyUs from "../../components/domestic_tour/features/WhyUs";
import MagazineSection from "../../components/domestic_tour/magazine/MagazineSection";

// 🔵 نسخه‌ی جدید سرچ برای گواهینامه (بعداً کامپوننتش رو هم می‌سازیم)
import LicenseSearchForm from "../../components/heroSearchBox/tabs/LicenseSearchForm";

// 🔵 نسخه‌ی جدید سکشن لیست پکیج‌ها برای گواهینامه
import LicenseSection from "./components/LicenseSection";

export default function InternationalLicensePage() {
  return (
    <main className="a-container relative px-0 pb-8 mx-auto">
      {/* هدر و باکس سرچ گواهینامه بین‌المللی */}
      <div className="a-card products-box max-w-7xl px-4 mx-auto">
        <Image
          src={"/images/license-hero-pic.png"}
          width={1920}
          height={815}
          alt="دریافت گواهینامه بین‌المللی رانندگی به صورت آنلاین"
          className="w-full rounded-4xl rounded-t-[0] hero-fade-image" // 👈 این کلاس اضافه شد
        />

        {/* تب/فرم جستجوی گواهینامه بین‌المللی */}
        <div
          className="tab-view z-10 bottom-15 w-[98%] m-auto relative"
          style={{
            height: "auto",
            ["--slide-transition-from" as any]: "100%",
            ["--slide-transition-to" as any]: "-100%",
          }}
        >
          <div role="tabpanel">
            <LicenseSearchForm />
          </div>
        </div>
      </div>


      {/* لیست پکیج‌های گواهینامه بین‌المللی */}
      <LicenseSection />

      {/* بقیه سکشن‌ها که بعداً می‌تونیم یکی‌یکی گواهینامه‌ای‌شون کنیم */}
      <FeatureHero />
      <Destinations />
      <WhyUs />
      <TestimonialSlider />
      <MagazineSection />
    </main>
  );
}
