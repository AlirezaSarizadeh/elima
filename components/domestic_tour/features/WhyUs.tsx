export default function WhyUs() {
    const features = [
        {
            title: "پاسخ‌گویی 24 ساعته",
            desc: "پشتیبانی و پاسخگویی در هر ساعت از شبانه‌روز",
            icon: "/images/whyus_icon_2.svg"
        },
        {
            title: "دسترسی آسان و راحت",
            desc: "رزرو سریع، ساده و بدون دردسر با چند کلیک",
            icon: "/images/whyus_icon_2.svg"
        },
        {
            title: "کمترین نرخ بلیت",
            desc: "مناسب‌ترین قیمت‌ها با بهترین کیفیت خدمات",
            icon: "/images/whyus_icon_2.svg"
        },
        {
            title: "خدمات آنلاین",
            desc: "امکان رزرو و مدیریت سفر به‌صورت آنلاین",
            icon: "/images/whyus_icon_2.svg"
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-0 py-16">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* RIGHT TEXT + FEATURES */}
                <div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-4">
                        از هر نقطه ایران همسفر الیما باشید
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 mb-8 leading-7">
                        از هر نقطه ایران همسفر الیما باشید از هر نقطه ایران همسفر الیما باشید
                        از هر نقطه ایران همسفر الیما باشید از هر نقطه ایران همسفر الیما باشید
                        از هر نقطه ایران همسفر الیما باشید از هر نقطه ایران همسفر الیما باشید.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {features.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-2xl shadow-md border flex-col border-gray-100 flex gap-3 items-start"
                            >
                                <img src={item.icon} className="w-16 h-20" />

                                {/* Text */}
                                <div>
                                    <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                {/* LEFT IMAGE AREA */}
                <div className="relative flex justify-center lg:justify-start">

                    {/* Background Circle */}
                    <div className="absolute w-80 h-80 bg-yellow-300 rounded-full top-10 left-5 -z-10"></div>


                    {/* Colored Floating Circles */}
                    <div className="absolute top-0 right-20 w-12 h-12 rounded-full bg-purple-500 opacity-80 blur-sm"></div>
                    <div className="absolute bottom-10 right-5 w-10 h-10 rounded-full bg-blue-400 opacity-80 blur-sm"></div>

                    {/* Mascot / Character */}
                    <img
                        src="/images/whyus_pic.png" // عکس تستی
                        alt="mascot"
                        className="relative w-full h-auto object-contain z-10"
                    />
                </div>



            </div>

        </section>
    );
}
