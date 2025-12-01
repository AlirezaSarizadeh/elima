

export default function FeatureHeroOne() {
    return (
        <section className="max-w-6xl mx-auto px-4 py-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* RIGHT CONTENT */}
                <div>

                    {/* Small Title */}
                    <p className="text-blue-600 text-2xl font-medium mb-3">
                        از هر نقطه ایران همسفر الیما باشید
                    </p>

                    {/* Main Title */}
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed mb-4">
                        پیشنهادات ویژه متناسب با هدف شما.
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 mb-8">
                        کارشناسان الیماتک برای راهنمایی و ارائه مشاوره دقیق و کارشناسی به شما، ساعت‌ها وقت می‌گذارند.
                        این مشاوره حاصل سال‌ها تجربه الیماتک در اخذ انواع ویزای کشور‌های مختلف است.
                    </p>

                    {/* Features */}
                    <div className="space-y-4">

                        {/* Item */}
                        <div className="flex items-center justify-start gap-2.5 bg-white shadow-md border border-gray-100 p-4 rounded-2xl">
                            <img src="/images/lead_1-icon_1.svg" className="w-20 h-20" />
                            <span className="text-gray-700 font-semibold text-3xl">بهترین قیمت‌ها</span>

                        </div>

                        {/* Item */}
                        <div className="flex items-center justify-start gap-2.5 bg-white shadow-md border border-gray-100 p-4 rounded-2xl">
                            <img src="/images/lead_1-icon_2.svg" className="w-20 h-20" />
                            <span className="text-gray-700 font-semibold text-3xl">رتبه‌ی یک سفر</span>

                        </div>

                        {/* Item */}
                        <div className="flex items-center justify-start gap-2.5 bg-white shadow-md border border-gray-100 p-4 rounded-2xl">
                            <img src="/images/lead_1-icon_3.svg" className="w-20 h-20" />
                            <span className="text-gray-700 font-semibold text-3xl">پشتیبانی ۲۴ ساعته</span>
                        </div>

                    </div>
                </div>

                {/* LEFT IMAGES */}
                <div className="relative w-full flex justify-center">

                    <img src='/images/lead_1.png' />

                </div>


            </div>

        </section>
    );
}
