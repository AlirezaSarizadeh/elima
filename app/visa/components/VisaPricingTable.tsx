export default function VisaPricingTable() {
    // داده‌ها را جدا کردیم تا مدیریت آن در حالت موبایل و دسکتاپ راحت‌تر باشد
    const pricingData = [
      {
        type: "عادی",
        badgeColor: "bg-blue-100 text-blue-600",
        prices: [
          { label: "۱۴ روزه", value: "۲۹۰ درهم" },
          { label: "۱ ماهه", value: "۳۱۰ درهم" },
          { label: "۲ ماهه", value: "۵۵۰ درهم" },
        ],
      },
      {
        type: "مولتی",
        badgeColor: "bg-blue-100 text-blue-600", // یا مثلا bg-purple-100 برای تنوع
        prices: [
          { label: "۱۴ روزه", value: "۷۵۵ درهم" },
          { label: "۱ ماهه", value: "۶۵۶۷ درهم" },
          { label: "۲ ماهه", value: "۱۲۱۰ درهم" },
        ],
      },
    ];
  
    return (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-8 bg-blue-950 rounded-full"></span>
          <h2 className="text-xl font-bold text-gray-800">تعرفه ویزاها</h2>
        </div>
  
        {/* --- نمای دسکتاپ (Table) --- */}
        <div className="hidden md:block bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <table className="w-full text-center">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="py-5 px-4 font-bold">نوع ویزا</th>
                <th className="py-5 px-4 font-medium">۱۴ روزه</th>
                <th className="py-5 px-4 font-medium">۱ ماهه</th>
                <th className="py-5 px-4 font-medium">۲ ماهه</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pricingData.map((row, index) => (
                <tr key={index} className="group hover:bg-blue-50/50 transition-colors">
                  <td className="py-6 px-4">
                    <span className={`font-bold ${row.badgeColor} px-3 py-1 rounded-lg text-sm`}>
                      {row.type}
                    </span>
                  </td>
                  {row.prices.map((price, idx) => (
                    <td
                      key={idx}
                      className="py-6 px-4 font-bold text-gray-700 group-hover:text-blue-600 transition-colors"
                    >
                      {price.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* --- نمای موبایل (Cards) --- */}
        <div className="md:hidden flex flex-col gap-4">
          {pricingData.map((row, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              {/* هدر کارت (نوع ویزا) */}
              <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                <span className="text-gray-500 font-medium text-sm">نوع ویزا:</span>
                <span className={`font-bold ${row.badgeColor} px-3 py-1 rounded-lg text-sm`}>
                  {row.type}
                </span>
              </div>
  
              {/* لیست قیمت‌ها */}
              <div className="space-y-3">
                {row.prices.map((price, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{price.label}</span>
                    <span className="font-bold text-gray-800 text-base">{price.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
      </div>
    );
  }