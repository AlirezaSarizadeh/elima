"use client";

import { useState } from "react";
import { useLayout } from "../../../lib/layoutContext";
import Title from "../Title/Title";

export default function FAQ() {
  const { faq } = useLayout();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  if (!faq?.length) return null;

  return (
    <section className="max-w-7xl px-4 mx-auto">
      <Title title="سوالات پرتکرار" icon={<img src={'/images/textalign-right.png'} />} />
      <div className="space-y-4">
        {faq.map((item, i) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-4 cursor-pointer transition"
          >
            <div className="flex items-center justify-between" onClick={() => toggle(i)}>
              <h3 className="font-medium text-gray-800 flex items-center gap-2">
                <span className="text-gray-400">{i + 1}.</span>
                {item.question}
              </h3>
              <span className="text-gray-500 text-xl transition-transform duration-300">
                {openIndex === i ? "▴" : "▾"}
              </span>
            </div>

            {openIndex === i && (
              <p className="text-gray-600 mt-4 leading-7 border-t border-gray-200 pt-3">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}