import HeroSection from './Components/HeroSection'
import NavBar from './Components/NavBar'
import AboutSection from './Components/AboutSection'
import FeaturedProjects from './Components/FeaturedProjects'
import EmailSection from './Components/EmailSection'
import BackgroundFX from './Components/BackgroundFX'

export default function Home() {
  return (
    <main className="flex h-screen flex-col bg-[#0A0A0B] relative overflow-x-hidden">
      <BackgroundFX />
      <NavBar />
      <div
        id="page-scroll"
        className="flex-1 overflow-y-auto scroll-smooth snap-y snap-mandatory scroll-pt-24"
      >
        <HeroSection />
        <AboutSection />
        <FeaturedProjects />
        <EmailSection />
      </div>
    </main>
  )
}
