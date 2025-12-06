"use client";

export default function JoinUsSection() {
  return (
    <section className="bg-gray-50 py-8 mt-16">

      <div className="max-w-6xl mx-auto px-0 relative bg-orange-500 rounded-3xl text-white p-10 overflow-hidden flex items-center justify-center ">

        {/* Decorative Lines Left */}
        <div className="absolute left-0 bottom-0 opacity-40">
          <svg width="260" height="260" viewBox="0 0 300 300" fill="none">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="2" />
            <circle cx="200" cy="200" r="90" stroke="white" strokeWidth="2" />
          </svg>
        </div>

        {/* Decorative Palms Right */}
        <div className="absolute top-6 right-20 opacity-50">
          <svg width="90" height="90" viewBox="0 0 100 100">
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
          className="absolute bottom-0 right-4 w-40 h-auto object-contain"
        />

        {/* Content */}
        <div className="max-w-xl text-center">

          {/* Title */}
          <h2 className="text-3xl font-bold text-right lg:text-center mb-4">
            به جمع ما بپیوندید!
          </h2>

          {/* Description */}
          <p className="leading-7 text-center lg:text-right mb-8">
            برای اینکه همیشه از جدیدترین تورها و بهترین پیشنهادهای الیماگشت
            باخبر باشید و در باشگاه مشتریان ویژه ما عضو شوید،
            لطفاً شماره موبایل خود را وارد کنید. با این کار، اولین نفری خواهید بود
            که از سفرهای هیجان‌انگیز ما مطلع می‌شوید و از مزایای ویژه بهره‌مند می‌گردید!
          </p>

          {/* INPUT + BUTTON */}
          <div className="flex flex-col lg:flex-row items-center gap-4 bg-white rounded-xl p-1">

            {/* Input Box */}
            <div className="bg-white flex items-center gap-2 px-4 py-3 rounded-xl w-full text-gray-700">
              <img src="/images/call-calling.svg" className="w-5 opacity-70" />
              <input
                type="text"
                placeholder="شماره موبایل خود را وارد کنید"
                className="w-full outline-none bg-transparent text-sm"
              />
            </div>

            {/* Submit Button */}
            <button className="bg-orange-500 text-white px-12 py-3 rounded-xl font-semibold hover:bg-orange-700 transition">
              تایید
            </button>

          </div>
        </div>

      </div>

    </section>
  );
}
