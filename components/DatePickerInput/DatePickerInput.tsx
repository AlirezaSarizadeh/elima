// src/components/ui/ClearableTextField.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@mui/material';
import './DatePickerInput.css'

// تعریف نوع پراپرتی‌ها
interface ClearableTextFieldProps {
    value?: string; // مقدار فعلی فیلد
    onChange: (newValue: string) => void; // تابعی برای تغییر مقدار
    onClear?: () => void; // تابعی که هنگام پاک کردن اجرا می‌شود
    label?: string; // برچسب فیلد
    // می‌توانید سایر پراپرتی‌های استاندارد TextField را نیز بپذیرید
    [key: string]: any;
    onAutocompleteClick?: () => void
}

export const DatePickerInput: React.FC<ClearableTextFieldProps> = ({
    onAutocompleteClick,
    value,
    onChange,
    onClear,
    label,
    ...props
}) => {
    // تابع داخلی برای مدیریت رویداد پاک کردن
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation(); // جلوگیری از انتشار رویداد
        onChange(''); // مقدار را خالی می‌کنیم
        onClear?.(); // اگر تابع onClear پاس داده شده، آن را اجرا می‌کنیم
    };

    return (
        <Box onClick={onAutocompleteClick} sx={{ cursor: 'pointer' }}>
            <TextField
                className='c_datepickerInput'
                {...props} // تمام پراپرتی‌های دیگر را به TextField پاس می‌دهد
                value={value}
                onChange={(e) => onChange(e.target.value)}
                label={label}
                sx={{
                    width:200
                }}
                // اینجا جادو اتفاق می‌افتد
                InputProps={{
                    ...props.InputProps, // اگر InputProps از بیرون پاس داده شد، آن را حفظ می‌کنیم
                    endAdornment: value ? ( // فقط زمانی که مقداری وجود دارد، دکمه را نمایش بده
                        <IconButton
                            aria-label="پاک کردن"
                            onClick={handleClear}
                            size="small"
                            sx={{ ml: 1 }} // فاصله از چپ در حالت RTL
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ) : null,
                }}
            />
        </Box>
    );
};