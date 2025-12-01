"use client";

interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (value: string) => void;
}

const Tabs = ({ tabs, active, onChange }: TabsProps) => {
  return (
    <div className="flex items-center gap-3 bg-transparent rounded-xl px-0 py-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-3 rounded-xl text-sm transition 
            ${
              active === tab
                ? "bg-blue-100 border border-transparent text-blue-500 cursor-pointer"
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
