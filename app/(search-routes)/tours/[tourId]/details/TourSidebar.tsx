import BookingForm from "./BookingForm"; // مسیر را چک کنید
import PopularTours from "./PopularTours"; // مسیر را چک کنید

export default function TourSidebar() {
  return (
    <aside className="w-full flex flex-col gap-6 sticky top-4">
      {/* 1. فرم رزرو (بالا) */}
      <BookingForm />

      {/* 2. تورهای پرطرفدار (پایین) */}
      <PopularTours />
    </aside>
  );
}