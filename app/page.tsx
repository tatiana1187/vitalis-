import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { FeaturedProducts } from '@/components/home/featured-products'
import { About } from '@/components/home/about'
import { WhyUs } from '@/components/home/why-us'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedProducts />
      <About />
      <WhyUs />
    </>
  )
}
