import Destinations from '../components/domestic_tour/features/Destinations';
import DestinationsSection from '../components/domestic_tour/features/Destinations';
import FeatureHero from '../components/domestic_tour/features/FeatureHero';
import TestimonialSlider from '../components/domestic_tour/features/TestimonialSlider';
import WhyUs from '../components/domestic_tour/features/WhyUs';
import MagazineSection from '../components/domestic_tour/magazine/MagazineSection';
import PopularHotelsSection from '../components/domestic_tour/popularHotels/PopularHotelsSection';
import RecentlySearch from '../components/domestic_tour/RecentlySearch/RecentlySearch';
import ToursSection from '../components/domestic_tour/tour_category/ToursSection';
import HeroBox from '../components/heroSearchBox/HeroBox';
import DomesticSearchForm from '../components/heroSearchBox/tabs/DomesticSearchForm';

export default function HomePage() {
  return (
    <main className="a-container relative px-0 pb-8 mx-auto">

      {/* Upper Search Tabs : */}
      <div className="a-card products-box max-w-7xl mx-auto">
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

      {/* Dynamic Content Accourding To Tab Url Will Show Here : */}


      <RecentlySearch />

      <ToursSection />

      <PopularHotelsSection />

      <FeatureHero />

      <Destinations />

      <WhyUs />

      <TestimonialSlider />

      <MagazineSection />
    </main>
  );
}
