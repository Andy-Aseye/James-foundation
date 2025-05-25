import React from "react";

const SecondSlide = () => {
  return (
    <div className="flex row">
      <div className="w-1/2 flex flex-col gap-3 relative">
        <h1 className="absolute top-0 left-0 text-5xl font-bold">Rev. James</h1>
        <div
          className="w-[20vw] ml-40 h-[55vh] bg-cover bg-center transform rotate-[-3deg] mt-20"
          style={{ backgroundImage: "url('/images/bg-1.jpg')" }}
        ></div>
      </div>
      <div className="w-1/2 flex flex-col text-sm">
        <div className="pb-5" style={{ borderBottom: "1px grey solid" }}>
          <p className="text-start leading-relaxed">
            Community outreach, and spiritual growth. Known for his approachable
            nature and heart for people, Pastor Jennings leads with humility and
            grace. He is also a loving husband and father, finding joy in
            family, faith, and fellowship. His mission is to shepherd others
            toward deeper relationship with God through love, service, and sound
            doctrine. Passionate about preaching the Word, he brings clarity,
            compassion, and conviction to every message. He holds a Master of
            Divinity and has served congregations across the Midwest, focusing
            on discipleship.
          </p>
          <p className="text-start mt-4 leading-relaxed">
            Pastor Michael Jennings is a devoted servant of Christ with over 15
            years of ministry experience. Passionate about preaching the Word,
            he brings clarity, compassion, and conviction to every message. He
            holds a Master of Divinity and has served congregations across the
            Midwest, focusing on discipleship.
          </p>
        </div>
        <div className="flex flex-row mt-10 gap-4">
          <button className="bg-[#7cffb7] px-4 py-2 rounded-2xl text-[#003b35]">
            Contact
          </button>
          <button className="border-[#7cffb7] border px-4 py-2 rounded-tl-2xl rounded-br-2xl text-[#7cffb7]">
            LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondSlide;
