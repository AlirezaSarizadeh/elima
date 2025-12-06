import Image from "next/image";

export default function LinhksContainer() {
    return (
        <footer className="bg-gray-100 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-0">



                {/* TOP SECTIONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

                    {/* Column 5 – Logo + Contact */}
                    <div className="text-gray-700">
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            className="w-40 mb-4"
                        />

                        <p className="text-ls mb-2 text-gray-500 font-light">
                            <span className="font-">تلفن پشتیبانی:</span> 021428040101
                        </p>

                        <p className="text-ls mb-2 text-gray-500 font-light">
                            آدرس دفتر مرکزی:
                            <br />
                            تهران، سعادت‌آباد، خیابان کاج، پلاک 16
                        </p>

                        <p className="text-ls mb-4 text-gray-500 font-light">
                            <span className="font-">آدرس ایمیل:</span> Elimagasht@info.com
                        </p>
                    </div>
                    {/* Column 1 */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">الیماگشت</h3>
                        <ul className="space-y-2 text-gray-500 font-light text-sm">
                            <li>درباره ما</li>
                            <li>تماس با ما</li>
                            <li>بیمه مسافرتی</li>
                            <li>پرسش و پاسخ</li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">خدمات مشتریان</h3>
                        <ul className="space-y-2 text-gray-500 font-light text-sm">
                            <li>راهنمای خرید</li>
                            <li>قوانین و مقررات</li>
                            <li>راهنمای استرداد</li>
                            <li>مرکز پشتیبانی آنلاین</li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">تورهای پرفروش</h3>
                        <ul className="space-y-2 text-gray-500 font-light text-sm">
                            <li>تور دبی</li>
                            <li>تور کیش</li>
                            <li>تور استانبول</li>
                            <li>تور آنتالیا</li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">اطلاعات تکمیلی</h3>
                        <ul className="space-y-2 text-gray-500 font-light text-sm">
                            <li>فروش سازمانی</li>
                            <li>فرصت‌های شغلی</li>
                            <li>سنجش رضایتمندی</li>
                            <li>همکاری با آژانس‌ها</li>
                        </ul>
                    </div>


                </div>
                <div className="flex items-center justify-between my-5">
                    {/* Social Icons */}
                    <div className="flex items-center gap-7 text-blue-600">
                        <Image src={'/images/telegram-icon.svg'} alt="sa" width={28} height={28} />
                        <Image src={'/images/linkedin.svg'} alt="sa" width={28} height={28} />
                        <Image src={'/images/whatsapp.svg'} alt="sa" width={28} height={28} />
                        <Image src={'/images/instagram.svg'} alt="sa" width={28} height={28} />
                    </div>
                    {/* LICENSE LOGOS */}
                    {/* <div className="flex flex-wrap items-center justify-center gap-6 my-5">
                        <img src="/images/license1.png" />
                        <img src="/images/license2.png" />
                        <img src="/images/license3.png" />
                        <img src="/images/license4.png" />
                    </div> */}
                </div>
                {/* COPYRIGHT */}
                <p className="text-center text-gray-400 font-light text-sm mt-0 border-t border-gray-300 pt-6">
                    تمامی حقوق این وب‌گاه محفوظ و مربوط به آژانس مسافرتی الیماگشت است.
                </p>

            </div>
        </footer>
    );
}
