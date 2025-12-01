"use client";

interface TourCardProps {
  title: string;
  price: number;
  image: string;
}

const TourCard = ({ title, price, image }: TourCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex p-1">
      <img src={image} className="w-1/3 h-30 object-cover rounded-xl" />

      <div className="p-4 flex items-start justify-evenly flex-col w-2/3">
        <h3 className="font-semibold text-gray-800">{title}</h3>

        <div className="text-sm text-gray-500 mt-2 flex items-center justify-between w-full">
          شروع قیمت از{" "}
          <span className="text-blue-600 font-normal flex items-center justify-between gap-1">
            {price.toLocaleString()} 
            <img src='/images/Price.png' className="object-scale-down" alt="تومان" width="16px" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
