import NavBar from './Components/NavBar'
import BackgroundFX from './Components/BackgroundFX'
import StoryRail from './Components/StoryRail'
import HeroSection from './Components/HeroSection'
import AboutSection from './Components/AboutSection'
import SkillsSection from './Components/SkillsSection'
import JourneySection from './Components/JourneySection'
import FeaturedProjects from './Components/FeaturedProjects'
import EmailSection from './Components/EmailSection'

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-background-primary">
      <BackgroundFX />
      <StoryRail />
      <NavBar />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <JourneySection />
        <FeaturedProjects />
        <EmailSection />
      </div>
    </main>
  )
}
