import DonateSection from "@/src/components/Donate/DonateSection";

export const metadata = {
  title: "Donate - The James Foundation",
  description: "Support international students by making a donation to The James Foundation. Your contribution helps provide financial and spiritual support to students in need.",
  keywords: "donate, donation, international students, financial support, The James Foundation, Rev James",
  openGraph: {
    title: "Donate - The James Foundation",
    description: "Support international students by making a donation to The James Foundation. Your contribution helps provide financial and spiritual support to students in need.",
    type: "website",
  },
};

export default function Donate() { 
    return (
        <DonateSection />
    )
}
