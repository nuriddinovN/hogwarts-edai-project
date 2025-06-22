import HowToUseSection from "@/components/Demo";
import FeedbacksSection from "@/components/Fedback";
import Footer from "@/components/footer";
import Header from "@/components/Hero";
import HeroSection from "@/components/HeroSection";
import LearningJourney from "@/components/learningjourney";


export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <LearningJourney/>
      <HowToUseSection/>
      <FeedbacksSection/>
      <Footer/>

    </div>
  );
}
