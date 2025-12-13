import ResponsiveGallery from "./ResponsiveGallery";
import TourAdditionalInfo from "./TourAdditionalInfo";
import TourDetailsCard from "./TourDetailsCard";
import TourItinerary from "./TourItinerary";
import TourReviews from "./TourReviews";
import PopularTours from "./PopularTours";
import './global.css'

export default function page() {
    return (
        <div className="min-h-screen bg-gray-50/50" dir="rtl">
            <div className="container mx-auto px-4 py-6 max-w-7xl">
                
                {/* بخش گالری - تمام عرض در بالا */}
                <section className="mb-8">
                    <ResponsiveGallery />
                </section>

                {/* چیدمان اصلی صفحه: سایدبار + محتوا */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* ---------------- ستون اصلی محتوا (راست) ---------------- */}
                    {/* در سایز بزرگ ۹ واحد از ۱۲ واحد را می‌گیرد */}
                    <main className="lg:col-span-9 flex flex-col gap-8">
                        <TourDetailsCard />
                        <TourItinerary />
                        <TourAdditionalInfo />
                        <TourReviews />
                    </main>

                    {/* ---------------- ستون کناری / سایدبار (چپ) ---------------- */}
                    {/* در سایز بزرگ ۳ واحد را می‌گیرد و در موبایل زیر محتوا می‌رود */}
                    <aside className="lg:col-span-3 w-full sticky top-25">
                        <PopularTours />
                    </aside>

                </div>
            </div>
        </div>
    );
}