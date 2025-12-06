"use client";

import Link from "next/link";
import Image from "next/image";
import { AccessAlarm, LockClock } from "@mui/icons-material";

interface MagazineCardProps {
    title: string;
    image: string;
    description?: string;
    buttonText?: string;
}

const MagazineCard = ({
    title,
    image,
    description,
    buttonText = "مشاهده جزئیات"
}: MagazineCardProps) => {
    // Define a fallback image to use when the provided image is empty or invalid
    const fallbackImage = "/images/placeholder.svg"; // Make sure this file exists

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden w-full">
            {/* Image */}
            <div className="relative h-64">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
                {/* Meta Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap w-full">
                    {/* Title */}

                    <div className="flex items-center justify-between gap-2">
                        {/* Rating */}
                        <span className="bg-green-100 text-gray-700 text-xs px-2 py-1 flex items-center gap-1 c-badge">
                            سفر
                        </span>

                        {/* Clocl */}
                        <span className="text-gray-500 text-xs px-2 py-1 rounded-xl flex items-start pt-1 gap-1 ">
                            <AccessAlarm fontSize="inherit" />
                            1404/04/04
                        </span>

                        {/* Location */}
                        <span className="text-gray-500 text-xs px-2 py-1 rounded-xl flex items-start pt-1 gap-1 ">
                            <Image src={'/images/Callendar-icon.svg'} alt="Location" width={10} height={10} />
                            1404/04/04
                        </span>

                        {/* Avatar */}
                        <span className="text-gray-500 text-xs px-2 py-1 rounded-xl flex items-start pt-1 gap-1 ">
                            <Image src={'/images/avatar-woman.png'} alt="Location" width={12} height={12} />
                            خانم صالحی
                        </span>


                    </div>
                    <h3 className="text-ls font-bold text-gray-800">{title}</h3>
                </div>

                {/* Nights & Days */}
                <p className="text-gray-600 text-sm text-justify line-clamp-3">
                    برج جذاب ترکیه یکی از بزرگترین و زیباترین برج های ترکیه واقع در استانبول می باشد که شما می توانید با خرید یک بلیط چارتری مشاهده نمایید برج جذاب ترکیه یکی از بزرگترین و زیباترین برج های ترکیه واقع در استانبول می باشد که شما می توانید با خرید یک بلیط چارتری مشاهده نمایید
                </p>


                {/* Button */}
                <Link href={'#!'} className="block w-full">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl text-center font-medium">
                       مشاهده وبلاگ
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MagazineCard;