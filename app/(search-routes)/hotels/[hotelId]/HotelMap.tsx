"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- فیکس کردن مشکل نمایش آیکون مارکر در لیفلت ---
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

const customIcon = new L.Icon({ 
    iconUrl, 
    iconRetinaUrl, 
    shadowUrl, 
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41] 
});

interface HotelMapProps {
    lat: number;
    lng: number;
    popupText?: string;
}

export default function HotelMap({ lat, lng, popupText }: HotelMapProps) {
    return (
        <MapContainer 
            center={[lat, lng]} 
            zoom={15} 
            scrollWheelZoom={false} 
            className="h-full w-full z-0"
        >
            {/* استفاده از تایل‌های CartoDB برای ظاهر تمیزتر و مدرن‌تر (مناسب تم سایت شما) */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[lat, lng]} icon={customIcon}>
                <Popup className="font-sans text-right">
                    {popupText || "موقعیت هتل"}
                </Popup>
            </Marker>
        </MapContainer>
    );
}