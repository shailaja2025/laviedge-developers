import SEO from '../Components/layout/SEO';
import Hero from '../Components/sections/Hero';
import About from '../Components/sections/About';
import HomeVisuals from '../Components/sections/HomeVisuals';
import FeaturedProjects from '../Components/sections/FeaturedProjects';
import WhyLaviedge from '../Components/sections/WhyLaviedge';
import FinalCTA from '../Components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <SEO path="/" />
      <Hero />
      <About />
      <HomeVisuals />
      <FeaturedProjects />
      <WhyLaviedge />
      <FinalCTA />
    </>
  );
}
