import { Hero } from "@/components/home/hero";
import { FeaturedSubjects } from "@/components/home/featured-subjects";
import { TrendingQuestions } from "@/components/home/trending-questions";
import { RecentNotes } from "@/components/home/recent-notes";
import { LearningRoadmaps } from "@/components/home/learning-roadmaps";
import { Testimonials } from "@/components/home/testimonials";
import { Stats } from "@/components/home/stats";
import { CTA } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSubjects />
      <TrendingQuestions />
      <RecentNotes />
      <LearningRoadmaps />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
