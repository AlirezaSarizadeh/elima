export default function LicensePricingTable() {
  // تعرفه‌ها را بر اساس اعتبار و نوع تحویل تنظیم کردیم
  const pricingData = [
    {
      type: "تحویل عادی",
      badgeColor: "bg-sky-100 text-sky-700",
      prices: [
        { label: "۱ ساله", value: "۱.۴۵۰.۰۰۰ تومان" },
        { label: "۳ ساله", value: "۱.۹۵۰.۰۰۰ تومان" },
        { label: "۵ ساله", value: "۲.۴۵۰.۰۰۰ تومان" },
      ],
    },
    {
      type: "تحویل فوری",
      badgeColor: "bg-orange-100 text-orange-700",
      prices: [
        { label: "۱ ساله", value: "۱.۸۵۰.۰۰۰ تومان" },
        { label: "۳ ساله", value: "۲.۳۵۰.۰۰۰ تومان" },
        { label: "۵ ساله", value: "۲.۸۵۰.۰۰۰ تومان" },
      ],
    },
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1.5 h-8 bg-sky-950 rounded-full"></span>
        <h2 className="text-xl font-bold text-gray-800">
          تعرفه گواهینامه‌های بین‌المللی
        </h2>
      </div>

      {/* دسکتاپ */}
      <div className="hidden md:block bg-white rounded-3xl border border-gray-200 overflow-hidden">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="py-5 px-4 font-bold">نوع خدمت</th>
              <th className="py-5 px-4 font-medium">اعتبار ۱ ساله</th>
              <th className="py-5 px-4 font-medium">اعتبار ۳ ساله</th>
              <th className="py-5 px-4 font-medium">اعتبار ۵ ساله</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pricingData.map((row, index) => (
              <tr
                key={index}
                className="group hover:bg-sky-50/60 transition-colors"
              >
                <td className="py-6 px-4">
                  <span
                    className={`font-bold ${row.badgeColor} px-3 py-1 rounded-lg text-sm`}
                  >
                    {row.type}
                  </span>
                </td>
                {row.prices.map((price, idx) => (
                  <td
                    key={idx}
                    className="py-6 px-4 font-bold text-gray-700 group-hover:text-sky-700 transition-colors"
                  >
                    {price.value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* موبایل */}
      <div className="md:hidden flex flex-col gap-4">
        {pricingData.map((row, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <span className="text-gray-500 font-medium text-sm">
                نوع خدمت:
              </span>
              <span
                className={`font-bold ${row.badgeColor} px-3 py-1 rounded-lg text-sm`}
              >
                {row.type}
              </span>
            </div>

            <div className="space-y-3">
              {row.prices.map((price, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{price.label}</span>
                  <span className="font-bold text-gray-800 text-base">
                    {price.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
