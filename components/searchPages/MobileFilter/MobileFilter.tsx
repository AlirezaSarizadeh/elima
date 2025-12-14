"use client";

import React, { useState } from "react";
import {
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Slide,
    Typography,
} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterSidebar from "../../filters/FilterSidebar";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MobileFilter() {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const handleFilterOpen = () => setMobileFilterOpen(true);
    const handleFilterClose = () => setMobileFilterOpen(false);

    return (
        <>
            <div className="flex justify-between items-center w-full lg:!hidden">
                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<FilterListIcon />}
                    onClick={handleFilterOpen}
                    className="lg:!hidden !border-gray-300 !text-gray-700 !rounded-lg"
                >
                    فیلترها
                </Button>
            </div>

            <Dialog
                fullScreen
                open={mobileFilterOpen}
                onClose={handleFilterClose}
                TransitionComponent={Transition}
                dir="rtl"
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'white', color: 'black', boxShadow: 1 }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleFilterClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1, fontWeight: 'bold' }} variant="h6" component="div">
                            فیلترهای پیشرفته
                        </Typography>
                        <Button autoFocus color="primary" onClick={handleFilterClose}>
                            اعمال
                        </Button>
                    </Toolbar>
                </AppBar>

                <div className="p-4 bg-gray-50 min-h-full space-y-4 pb-20">
                    <FilterSidebar />
                </div>

                <div className="fixed bottom-0 right-0 left-0 p-4 bg-white border-t border-gray-200 z-50">
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleFilterClose}
                        className="!bg-blue-600 !font-bold !rounded-xl"
                    >
                        مشاهده نتایج
                    </Button>
                </div>
            </Dialog>
        </>
    );
}