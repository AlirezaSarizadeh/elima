"use client";

import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FilterCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function FilterCard({ title, children, defaultOpen = false }: FilterCardProps) {
  return (
    <Accordion
      defaultExpanded={defaultOpen}
      disableGutters // حذف فاصله‌های پیش‌فرض مزاحم
      elevation={0} // حذف سایه برای فلت شدن
      sx={{
        '&.MuiAccordion-root': {
            borderRadius: '12px !important', // گوشه‌های گرد
            border: '1px solid #e5e7eb', // رنگ border-gray-200
            marginBottom: '10px',
            backgroundColor: '#fff',
            // حذف خط جداکننده پیش‌فرض متریال
            '&:before': {
                display: 'none',
            },
            '&.Mui-expanded': {
                margin: '0 0 10px 0', // جلوگیری از پرش مارجین هنگام باز شدن
            }
        },
        '& .MuiAccordionSummary-root': {
            minHeight: '48px',
            '&.Mui-expanded': {
                minHeight: '48px',
            }
        },
        '& .MuiAccordionSummary-content': {
            margin: '12px 0',
            '&.Mui-expanded': {
                margin: '12px 0',
            }
        }
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#9ca3af' }} />} // رنگ آیکون خاکستری
      >
        <span className="font-bold text-sm text-gray-800">{title}</span>
      </AccordionSummary>
      
      <AccordionDetails sx={{ paddingTop: 0, paddingBottom: 2 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
}