import HeroBox from "../components/heroSearchBox/HeroBox";


export default function HomePage() {
  return (
    <main className="a-container relative px-0 pb-8">
      <div className="a-card products-box">
        
        {/* محتوای تب فعال */}
        <div
          className="tab-view z-10"
          style={{ height: 'auto', ['--slide-transition-from' as any]: '100%', ['--slide-transition-to' as any]: '-100%' }}
        >
          <div role="tabpanel">
            {/* همین کامپوننتی که الان داری و تاریخش اوکی شده */}
            <HeroBox />
          </div>
        </div>
      </div>

      {/* 👇 اینجا بقیه‌ی کد خودت برای خدمات دیگه، FAQ، متن سئو و ... دقیقاً مثل قبل بمونه */}
      {/* ... بقیه‌ی JSX که خودت از علی‌بابا کپی کرده بودی ... */}
    </main>
  );
}
