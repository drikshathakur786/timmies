import Hero from '@/components/home/Hero'
import StatsBar from '@/components/home/StatsBar'
import FeaturedSection from '@/components/home/FeaturedSection'
import TrendingSection from '@/components/home/TrendingSection'
import ExperienceSection from '@/components/home/ExperienceSection'
import AppSection from '@/components/home/AppSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedSection />
      <TrendingSection />
      <ExperienceSection />
      <AppSection />
    </>
  )
}