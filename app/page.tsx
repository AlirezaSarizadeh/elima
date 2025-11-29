import HeroBox from '../components/heroSearchBox/HeroBox';
import DomesticSearchForm from '../components/heroSearchBox/tabs/DomesticSearchForm';

export default function HomePage() {
  return (
    <main className="a-container relative px-0 pb-8">
      <div className="a-card products-box">
        {/* محتوای تب فعال (فعلاً همون فرم، اگر بعداً خواستی می‌تونی یه ورژن مخصوص خارجی بسازی) */}
        <div
          className="tab-view z-10"
          style={{ height: 'auto', ['--slide-transition-from' as any]: '100%', ['--slide-transition-to' as any]: '-100%' }}
        >
          <div role="tabpanel">
            <DomesticSearchForm />
          </div>
        </div>
      </div>

      {/* اگر برای پرواز خارجی محتوا/توضیح جدا می‌خوای، اینجا اضافه کن */}
    </main>
  );
}
