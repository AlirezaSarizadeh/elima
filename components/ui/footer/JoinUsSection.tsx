"use client";

export default function JoinUsSection() {
  return (
    <section className="bg-gray-50 py-8 mt-16 px-4 md:px-0">
      <div className="max-w-6xl mx-auto relative bg-orange-500 rounded-3xl text-white p-6 md:p-10 lg:p-16 overflow-hidden flex flex-col lg:flex-row items-center justify-center min-h-[400px]">
        
        {/* --- المان‌های تزئینی (فقط در دسکتاپ و تبلت نمایش داده می‌شوند) --- */}
        
        {/* Decorative Lines Left */}
        <div className="absolute left-0 bottom-0 opacity-40 hidden md:block pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 300 300" fill="none" className="lg:w-[260px] lg:h-[260px]">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="90" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Decorative Palms Right */}
        <div className="absolute top-6 right-10 lg:right-20 opacity-50 hidden md:block pointer-events-none">
          <svg width="70" height="70" viewBox="0 0 100 100" className="lg:w-[90px] lg:h-[90px]">
            <path
              d="M40 90V50M40 50C20 40 10 20 30 25C50 30 60 10 50 20C40 30 80 40 65 45C50 50 70 70 50 60C30 50 10 60 25 65C40 70 30 90 40 90Z"
              stroke="white"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>

        {/* Mascot Right */}
        <img
          src="/images/joinus-object.svg"
          alt="mascot"
          className="absolute bottom-0 right-[-20px] lg:right-4 w-32 lg:w-40 h-auto object-contain hidden md:block pointer-events-none"
        />

        {/* --- محتوای اصلی --- */}
        <div className="w-full max-w-2xl text-center z-10">
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            به جمع ما بپیوندید!
          </h2>

          {/* Description */}
          <p className="leading-7 text-sm md:text-base mb-8 opacity-90 px-2 md:px-0 text-justify md:text-center">
            برای اینکه همیشه از جدیدترین تورها و بهترین پیشنهادهای الیماگشت
            باخبر باشید و در باشگاه مشتریان ویژه ما عضو شوید،
            لطفاً شماره موبایل خود را وارد کنید. با این کار، اولین نفری خواهید بود
            که از سفرهای هیجان‌انگیز ما مطلع می‌شوید و از مزایای ویژه بهره‌مند می‌گردید!
          </p>

          {/* INPUT + BUTTON */}
          <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row items-center gap-2 shadow-lg">
            
            {/* Input Box */}
            <div className="flex-1 flex items-center gap-3 px-3 py-2 w-full">
              <img src="/images/call-calling.svg" className="w-5 h-5 opacity-60 shrink-0" alt="phone icon" />
              <input
                type="tel"
                placeholder="شماره موبایل خود را وارد کنید"
                className="w-full outline-none bg-transparent text-gray-700 text-sm py-2 placeholder-gray-400 text-right dir-rtl"
                dir="rtl"
              />
            </div>

            {/* Submit Button */}
            <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors w-full sm:w-auto text-sm md:text-base shadow-md">
              تایید و عضویت
            </button>
            
          </div>
        </div>

      </div>
    </section>
  );
}