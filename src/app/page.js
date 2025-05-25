import { blogs } from "@/.velite/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import ScrollAnimation from "../components/common/scroll-animation";
import TextParagraphSection from "../components/common/text-paragraph";
import MeetFounder from "../components/Home/MeetFounder";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={blogs} />
      <TextParagraphSection />
      <ScrollAnimation />
      <MeetFounder />
      {/* <FeaturedPosts blogs={blogs} /> */}
      {/* <RecentPosts blogs={blogs} /> */}
    </main>
  );
}
