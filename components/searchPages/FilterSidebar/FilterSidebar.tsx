"use client";

import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  Rating,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterSidebar() {
  return (
    <>
      {/* Filter: Price Range */}
      <FilterCard title="بازه قیمتی تورها" defaultOpen>
        <div className="flex flex-col gap-2">
          {['از ۰ تا ۳۶ میلیون تومان', 'از ۳۶ تا ۴۷ میلیون تومان', 'از ۴۷ تا ۵۲ میلیون تومان', 'از ۵۲ میلیون تومان به بالا'].map((item, idx) => (
            <FormControlLabel
              key={idx}
              control={<Checkbox size="small" />}
              label={<span className="text-sm text-gray-600">{item}</span>}
            />
          ))}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500">نمایش تورهای تخفیف دار</span>
            <Switch size="small" />
          </div>
        </div>
      </FilterCard>

      {/* Filter: Hotel Name */}
      <FilterCard title="نام هتل یا اقامتگاه" defaultOpen>
        <TextField
          fullWidth
          placeholder="جستجوی نام هتل..."
          variant="outlined"
          size="small"
          InputProps={{ style: { borderRadius: 10, fontSize: 14 } }}
        />
      </FilterCard>

      {/* Filter: Stars */}
      <FilterCard title="ستاره هتل" defaultOpen>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500">نمایش هتل‌های بدون ستاره</span>
          <Switch size="small" />
        </div>
        <div className="flex flex-col gap-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <FormControlLabel
              key={star}
              control={<Checkbox size="small" />}
              label={
                <div className="flex items-center">
                  <span className="text-sm ml-2">{star}</span>
                  <Rating value={star} readOnly size="small" max={star} />
                </div>
              }
            />
          ))}
        </div>
      </FilterCard>

      {/* Filter: Tour Types */}
      <FilterCard title="نوع تورها">
        {['طبیعت گردی', 'فرهنگی', 'ماجراجویانه', 'ورزشی'].map((type, idx) => (
          <FormControlLabel key={idx} control={<Checkbox size="small" />} label={<span className="text-sm text-gray-600">{type}</span>} />
        ))}
      </FilterCard>

      {/* Filter: Difficulty */}
      <FilterCard title="سطح تورها">
        {['سختی ۱ (سبک)', 'سختی ۲ (متوسط)', 'سختی ۳ (سخت)'].map((lvl, idx) => (
          <FormControlLabel key={idx} control={<Checkbox size="small" />} label={<span className="text-sm text-gray-600">{lvl}</span>} />
        ))}
      </FilterCard>
    </>
  );
}

function FilterCard({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  return (
    <Accordion sx={{ boxShadow: 'none' }} defaultExpanded={defaultOpen} className="!rounded-xl !border !border-gray-200 !bg-white before:!hidden">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <span className="font-semibold text-sm text-gray-800">{title}</span>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}