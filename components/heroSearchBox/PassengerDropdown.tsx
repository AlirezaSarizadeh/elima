"use client";

import { useState, useRef, useEffect } from "react";

export default function PassengerDropdown() {
  const [open, setOpen] = useState(false);

  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);

  const ref = useRef<any>(null);

  const total = adult + child + infant;

  // بستن منو با کلیک بیرون
  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-white border border-gray-900 rounded-lg h-12 px-3 flex items-center gap-2 w-full justify-between"
      >
        <span>👤</span>
        <span className="text-sm">{total} مسافر</span>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className="absolute w-full top-full mt-2 z-50 bg-white shadow-lg rounded-xl p-4 border border-gray-200"
        >
          {/* Row - Adult */}
          <PassengerRow
            title="بزرگسال"
            subtitle="(۱۲ سال به بالا)"
            count={adult}
            setCount={setAdult}
          />

          {/* Row - Child */}
          <PassengerRow
            title="کودک"
            subtitle="(۲ تا ۱۲ سال)"
            count={child}
            setCount={setChild}
          />

          {/* Row - Infant */}
          <PassengerRow
            title="نوزاد"
            subtitle="(۱۰ روز تا ۲ سال)"
            count={infant}
            setCount={setInfant}
            disableMinus={infant === 0}
            disablePlus={infant >= adult}
          />
        </div>
      )}
    </div>
  );
}

// COMPONENT: Each Passenger Row
function PassengerRow({
  title,
  subtitle,
  count,
  setCount,
  disableMinus,
  disablePlus,
}: any) {
  return (
    <div
      className="flex items-center justify-between mb-4 last:mb-0"
      tabIndex={0}
    >
      <div className="flex flex-col text-right">
        <span className="font-medium">{title}</span>
        <span className="text-gray-400 text-sm">{subtitle}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Plus */}
        <button
          type="button"
          disabled={disablePlus}
          onClick={() => setCount(count + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border 
          ${disablePlus ? "opacity-30 cursor-not-allowed" : ""}
          `}
        >
          ➕
        </button>

        {/* Count */}
        <span className="w-6 text-center">{count}</span>

        {/* Minus */}
        <button
          type="button"
          disabled={disableMinus || count === 0}
          onClick={() => setCount(count - 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border 
          ${disableMinus || count === 0 ? "opacity-30 cursor-not-allowed" : ""}
          `}
        >
          ➖
        </button>
      </div>
    </div>
  );
}
