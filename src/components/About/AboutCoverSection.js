import ContactForm from "../Contact/ContactForm";

const AboutCoverSection = () => {
  return (
    <section className="w-full mb-16 flex flex-col">
      <div className="flex flex-col bg-[#0f4348] text-[#adffb8] h-[80vh] overflow-hidden">
        <div className="animate-slideLeftRight whitespace-nowrap">
          <h1
            className="mt-6 inline-block"
            style={{ fontSize: "9rem", fontWeight: "800" }}
          >
            Our Mission{" "}
          </h1>
          <h1
            className="mt-6 inline-block"
            style={{ fontSize: "9rem", fontWeight: "800" }}
          >
            & Vision
          </h1>
        </div>

        <div className="flex flex-row w-[80vw] mx-auto justify-between">
          <div className="flex flex-row gap-3 text-xs">
            <div className="p-3 border border-[#adffb8] rounded-sm h-[4vh] flex items-center">
              Financial Support
            </div>
            <div className="border border-[#adffb8] p-3 rounded-sm h-[4vh] flex items-center">
              Spiritual Growth
            </div>
            <div className="border border-[#adffb8] p-3 rounded-sm h-[4vh] flex items-center">
              Leadership Development
            </div>
          </div>
          <div>
            <p className="text-xs mb-3">Empowering International Students</p>
            <p className="max-w-lg leading-relaxed">
              The James Foundation is dedicated to empowering international students in the United States through comprehensive financial and spiritual support.
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-1.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#adffb8] opacity-30"></div>
      </div>
      <div className="bg-[#0f4348] h-[90vh] text-[#adffb8]">
        <div className="w-[90vw] mx-auto flex flex-row mt-20 justify-between">
          <div className="w-2/6">
            <p className="text-xs">
              Our Vision
            </p>
            <p className="mt-4">
              To empower international students to thrive academically, grow in their faith, and become impactful leaders in their communities.
            </p>
          </div>
          <div className="w-3/6">
            <p>
              Founded by Rev. James Sarpong-Kumankomah, The James Foundation was born out of a passion to assist international students in the USA who often face financial and cultural challenges while studying in the U.S. Through comprehensive support programs, we address both the physical and spiritual needs of students.
            </p>
            <p className="mt-4">
              Our foundation offers scholarships, grants, and mentorship programs tailored to meet the needs of international students. Through workshops, faith-based counseling, and community-building initiatives, we guide students toward a deeper relationship with God, empowering them to fulfill their God-given potential.
            </p>
          </div>
        </div>
      </div>
           <div className="flex flex-row justify-between w-[85vw] mx-auto gap-4 mt-14">
        <div className="w-[40%]">
          <h1 style={{fontSize: "4.3rem"}} className="font-extrabold">Make an <br /> Impact. <br /> Join Us.</h1>
          <p>
            Get involved with our mission to support international students. <br /> Contact us to learn more about our programs and how you can help.
          </p>
        </div>
        <div className="w-[45%]">
          <ContactForm />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default AboutCoverSection;
