"use client";

import Select from "react-select";

const classOptions = [
  { value: "economy", label: "اکونومی" },
  { value: "premium", label: "پریمیوم اکونومی" },
  { value: "business", label: "بیزینس" },
  { value: "first", label: "فرست کلاس" },
];

export default function FlightClassSelect({ value, onChange }: any) {
  return (
    <Select
      placeholder="کلاس پرواز"
      value={value}
      onChange={onChange}
      options={classOptions}
      isSearchable={false}
      className="heroSearchBox_select"
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (base) => ({
          ...base,
          height: "48px",
          borderRadius: "8px",
          borderColor: "#111",
          paddingRight: "8px",
        }),
      }}
    />
  );
}
