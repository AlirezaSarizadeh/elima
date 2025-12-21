"use client";

interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (value: string) => void;
}

const Tabs = ({ tabs, active, onChange }: TabsProps) => {
  return (
    // تغییر ۱: اضافه کردن overflow-x-auto برای اسکرول افقی
    // کلاس no-scrollbar برای مخفی کردن اسکرول‌بار (توضیحات پایین را بخوانید)
    <div className="flex items-center gap-3 bg-transparent rounded-xl px-0 py-1 w-full overflow-x-auto no-scrollbar scroll-smooth">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          // تغییر ۲ و ۳: اضافه کردن whitespace-nowrap و shrink-0
          className={`px-4 py-3 rounded-xl text-sm transition whitespace-nowrap shrink-0
            ${
              active === tab
                ? "bg-blue-100 border border-transparent text-blue-500 cursor-pointer font-medium"
                : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-200 cursor-pointer"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;