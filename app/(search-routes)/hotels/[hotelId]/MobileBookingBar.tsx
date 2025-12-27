"use client";

type MobileBookingBarProps = {
  price: number;
  selectedRoomsCount: number;
  onClick: () => void;
};

export default function MobileBookingBar({
  price,
  selectedRoomsCount,
  onClick,
}: MobileBookingBarProps) {
  const hasSelection = selectedRoomsCount > 0;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9000] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] lg:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] text-gray-500">
            {hasSelection
              ? `${selectedRoomsCount} اتاق انتخاب شده`
              : "برای شروع، اتاقی را انتخاب کنید"}
          </span>
          <span className="text-base font-black text-blue-600">
            {price.toLocaleString()} تومان
          </span>
        </div>

        <button
          type="button"
          onClick={onClick}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl transition-all active:scale-95 text-center"
        >
          {hasSelection ? "اقدام به رزرو" : "انتخاب اتاق"}
        </button>
      </div>
    </div>
  );
}
