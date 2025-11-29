import HeroBox from '../../../components/heroSearchBox/HeroBox';

export default function IranOutPage() {
  return (
    <main className="a-container relative px-0 pb-8">
      <div className="a-card products-box">
        {/* محتوای تب فعال (فعلاً همون فرم، اگر بعداً خواستی می‌تونی یه ورژن مخصوص خارجی بسازی) */}
        <div
          className="tab-view z-10"
          style={{ height: 'auto', ['--slide-transition-from' as any]: '100%', ['--slide-transition-to' as any]: '-100%' }}
        >
          <div role="tabpanel">
            <HeroBox />
            سبینعتابیساعسیبان
          </div>
        </div>
      </div>

      {/* اگر برای پرواز خارجی محتوا/توضیح جدا می‌خوای، اینجا اضافه کن */}
    </main>
  );
}
