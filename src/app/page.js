import { blogOperations } from "@/src/lib/supabase";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import ScrollAnimation from "../components/common/scroll-animation";
import TextParagraphSection from "../components/common/text-paragraph";
import MeetFounder from "../components/Home/MeetFounder";
import OurTeam from "../components/Team/OurTeam";

export default async function Home() {
  // Get recent blogs for the featured posts section
  const allBlogs = await blogOperations.getPublishedBlogs();
  const recentBlogs = allBlogs
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={[]} />
      <TextParagraphSection />
      <FeaturedPosts blogs={recentBlogs} />
      <ScrollAnimation />
      <MeetFounder />
      <OurTeam />
      {/* <RecentPosts blogs={recentBlogs} /> */}
    </main>
  );
}
