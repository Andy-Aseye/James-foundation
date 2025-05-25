const ResourcesCoverSection = () => {
  return (
    <section className="w-full mb-16 flex flex-col">
      <div className="flex flex-col bg-[#2d6ef0] text-[#e0e2da] h-[80vh] overflow-hidden">
        <div className="animate-slideLeftRight whitespace-nowrap">
          <h1
            className="mt-6 inline-block"
            style={{ fontSize: "9rem", fontWeight: "800" }}
          >
            Resources
          </h1>
        </div>

        <div className="flex flex-row w-[80vw] mx-auto justify-between">
          <div className="flex flex-row gap-3 text-xs">
            <div className="p-3 border border-[#e0e2da] rounded-sm h-[4vh] flex items-center">
              Financial Aid
            </div>
            <div className="border border-[#e0e2da] p-3 rounded-sm h-[4vh] flex items-center">
              Spiritual Support
            </div>
            <div className="border border-[#e0e2da] p-3 rounded-sm h-[4vh] flex items-center">
              Student Resources
            </div>
          </div>
          <div>
            <p className="text-xs mb-3">Student Support Programs</p>
            <p className="max-w-lg leading-relaxed">
              Access our comprehensive range of resources designed to support international
              students through their academic journey, including financial aid programs,
              spiritual guidance, and practical assistance.
            </p>
          </div>
        </div>
      </div>
      <div
        className="relative h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-2.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#e0e2da] opacity-30"></div>
      </div>
      <div className=" h-[90vh] bg-[#2d6ef0] text-[#e0e2da]">
        <div className="w-[90vw] mx-auto flex flex-row mt-20 justify-between">
          <div className="w-2/6">
            <p className="text-xs">Available Resources</p>
          </div>
          <div className="w-3/6">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Financial Assistance Programs</h3>
              <p className="mb-2">
                Access information about our scholarships, grants, and emergency relief funds
                designed to help international students cover tuition, books, housing, and
                other academic expenses.
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Spiritual Development</h3>
              <p className="mb-2">
                Explore our faith-based counseling services, devotional gatherings,
                prayer services, and workshops focused on spiritual growth and
                discovering God's purpose.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Student Support Services</h3>
              <p className="mb-2">
                Find resources for leadership training, mentorship programs,
                cultural integration support, and skill-building workshops to help
                you thrive in your academic journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesCoverSection;
