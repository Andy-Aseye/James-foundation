import ContactForm from "../Contact/ContactForm";

const GetInvolvedCoverSection = () => {
  return (
    <section className="w-full mb-16 flex flex-col">
      <div className="flex flex-col bg-[#5a2a46] text-[#ffd1e6] h-[80vh] overflow-hidden">
        <div className="animate-slideLeftRight whitespace-nowrap">
          <h1
            className="mt-6 inline-block"
            style={{ fontSize: "9rem", fontWeight: "800" }}
          >
            Get Involved{" "}
          </h1>
          {/* <h1
            className="mt-6 inline-block"
            style={{ fontSize: "9rem", fontWeight: "800" }}
          >
            With Us
          </h1> */}
        </div>

        <div className="flex flex-row w-[80vw] mx-auto justify-between">
          <div className="flex flex-row gap-3 text-xs">
            <div className="p-3 border border-[#ffd1e6] rounded-sm h-[4vh] flex items-center">
              Mentor
            </div>
            <div className="border border-[#ffd1e6] p-3 rounded-sm h-[4vh] flex items-center">
              Donate
            </div>
            <div className="border border-[#ffd1e6] p-3 rounded-sm h-[4vh] flex items-center">
              Volunteer
            </div>
          </div>
          <div>
            <p className="text-xs mb-3">Support Our Mission</p>
            <p className="max-w-lg leading-relaxed">
              Join us in empowering international students through mentorship,
              financial support, and volunteer opportunities. Your involvement
              can make a lasting difference in students' lives.
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-3.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#ffd1e6] opacity-30"></div>
      </div>
      <div className=" bg-[#5a2a46] h-[90vh] text-[#ffd1e6]">
        <div className="w-[90vw] mx-auto flex flex-row mt-20 justify-between">
          <div className="w-2/6">
            <p className="text-xs">Ways to Get Involved</p>
          </div>
          <div className="w-3/6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Become a Mentor</h3>
              <p>
                Share your experience and guidance with international students.
                As a mentor, you'll help students navigate academic challenges,
                cultural adjustments, and spiritual growth. Your wisdom and
                support can be transformative in a student's journey.
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Make a Donation</h3>
              <p>
                Your financial support helps provide scholarships, emergency
                assistance, and essential resources for international students.
                Every contribution, no matter the size, makes a difference in
                helping students achieve their educational goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Volunteer Opportunities</h3>
              <p>
                Get involved in our various programs supporting international
                students. From organizing cultural events to providing tutoring
                services, there are many ways to contribute your time and
                talents to our mission.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-[85vw] mx-auto gap-4 mt-14">
        <div className="w-[40%]">
          <h1 style={{ fontSize: "4.3rem" }} className="font-extrabold">
            Make a <br /> Difference. <br /> Get Involved.
          </h1>
          <p>
            Ready to support international students? Fill out the form and we'll help you{" "}
            <br />
            find the perfect way to contribute to our mission.
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

export default GetInvolvedCoverSection;
