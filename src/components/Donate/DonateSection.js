"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import PaymentForm from "./PaymentForm";

const DonateSection = () => {
  const containerRef = useRef(null);
  const handUpRef = useRef(null);
  const handDownRef = useRef(null);
  const textRef = useRef(null);
  const backgroundRef = useRef(null);

  // Form state
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const handUp = handUpRef.current;
    const handDown = handDownRef.current;
    const text = textRef.current;
    const background = backgroundRef.current;

    // Initial states - hands positioned diagonally at screen edges (visible)
    gsap.set(handUp, {
      x: 800,
      y: -400,
      opacity: 1,
      scale: 0.5,
    });

    gsap.set(handDown, {
      x: -800,
      y: 400,
      opacity: 1,
      scale: 0.5,
    });

    gsap.set(text, {
      opacity: 0,
      y: 50,
      scale: 0.9,
    });

    gsap.set(background, {
      opacity: 0,
    });

    // Animation timeline
    const tl = gsap.timeline({ delay: 0.5 });

    // Background fade in
    tl.to(background, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    })
      // Hands slide in with linear movement (no easing)
      .to(
        handUp,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 2.5,
          ease: "none",
        },
        "-=0.5"
      )
      .to(
        handDown,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 2.5,
          ease: "none",
        },
        "-=2.5"
      )
      // Text appears between hands with easing
      .to(
        text,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=0.5"
      );

    // Subtle floating animation for hands
    gsap.to([handUp, handDown], {
      y: "+=5",
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3,
    });

    // Text breathing effect
    gsap.to(text, {
      scale: 1.02,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 4,
    });
  }, []);

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseFloat(value));
    }
  };

  const handleDonorInfoChange = (field, value) => {
    setDonorInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!selectedAmount || selectedAmount < 1) {
      alert("Please enter a valid donation amount");
      return;
    }

    if (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email) {
      alert("Please fill in all required fields");
      return;
    }

    // Show payment form
    setShowPayment(true);
  };

  const handlePaymentSuccess = (result) => {
    setPaymentStatus({
      type: "success",
      message: result.message,
    });
    setShowPayment(false);

    // Reset form after successful payment
    setTimeout(() => {
      setSelectedAmount(50);
      setCustomAmount("");
      setDonationType("one-time");
      setDonorInfo({ firstName: "", lastName: "", email: "" });
      setPaymentStatus(null);
    }, 5000);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus({
      type: "error",
      message: error,
    });
  };

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
  const donorName = `${donorInfo.firstName} ${donorInfo.lastName}`.trim();

  return (
    <>
      {/* Nokia-style Animation Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background with white */}
        <div ref={backgroundRef} className="absolute inset-0 bg-white">
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Main content container */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Central Text Container with relative positioning for hands */}
          <div
            ref={textRef}
            className="relative text-center z-10 px-6 max-w-4xl"
          >
            {/* Hand Up - Top Right of text container */}
            <div
              ref={handUpRef}
              className="absolute -top-40 -right-16 md:-top-48 md:-right-20 lg:-top-56 lg:-right-24"
            >
              <Image
                src="/images/hand-up.png"
                alt="Hand reaching up"
                width={400}
                height={400}
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain filter drop-shadow-2xl"
                priority
              />
            </div>

            {/* Hand Down - Bottom Left of text container */}
            <div
              ref={handDownRef}
              className="absolute -bottom-40 -left-16 md:-bottom-48 md:-left-20 lg:-bottom-56 lg:-left-24"
            >
              <Image
                src="/images/hand-down.png"
                alt="Hand reaching down"
                width={400}
                height={400}
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain filter drop-shadow-2xl"
                priority
              />
            </div>

            {/* Text Content */}
            <h1 className="text-gray-900 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
              <span className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 text-gray-800">
                Donate with us,
              </span>
              <span className="block bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 bg-clip-text text-transparent">
                change a life
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-lg md:text-xl mt-6 font-light leading-relaxed">
              Your generosity creates ripples of hope that transform communities
              and change lives forever. Every donation, no matter the size,
              becomes a beacon of light for those in need, providing essential
              support, educational opportunities, and spiritual guidance that
              empowers individuals to overcome challenges and build brighter
              futures for themselves and their families.
            </p>

            {/* Call to action button */}
            <div className="mt-8">
              <button
                onClick={() =>
                  document
                    .getElementById("donation-form")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Make a Donation
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-60 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-40 animate-pulse delay-2000"></div>

          {/* Connection line effect (subtle) */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full opacity-20">
              <defs>
                <linearGradient
                  id="connectionGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <line
                x1="20%"
                y1="80%"
                x2="80%"
                y2="20%"
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex flex-col items-center text-gray-500">
            <span className="text-xs mb-2 font-light">
              Make your donation below
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section
        id="donation-form"
        className="bg-gray-50 py-16 px-6 flex flex-row gap-8"
      >
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Give to a cause today
          </h1>
          <Image
            src="/images/donate.png"
            alt="Donate image"
            width={600}
            height={600}
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain filter drop-shadow-2xl"
            priority
          />{" "}
          <p className="text-sm text-[#656563] text-left max-w-[29rem]">
            Your generosity empowers international students and communities
            worldwide by funding resources, mentorship, and spiritual guidance.
            Every donation supports scholarships, emergency aid, educational
            materials, and community-building.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                $25 Impact
              </h3>
              <p className="text-gray-600 text-xs">
                Provides study materials for one student for a month
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                $100 Impact
              </h3>
              <p className="text-gray-600 text-xs">
                Covers emergency financial assistance for one student
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                $250 Impact
              </h3>
              <p className="text-gray-600 text-xs">
                Sponsors spiritual guidance sessions for multiple students
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="max-w-[80%] mx-auto">
            {/* Payment Status Messages */}
            {paymentStatus && (
              <div
                className={`mb-8 p-4 rounded-lg ${
                  paymentStatus.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center">
                  {paymentStatus.type === "success" ? (
                    <svg
                      className="w-5 h-5 text-green-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-red-600 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span
                    className={`text-sm font-medium ${
                      paymentStatus.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {paymentStatus.message}
                  </span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {!showPayment ? (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {/* Donation Amount Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Select Donation Amount
                    </label>
                    <div className="flex flex-row justify-between gap-4 mb-4">
                      {[25, 50, 100, 250].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountSelect(amount)}
                          className={`w-20 px-2 py-2 border border-gray-300 rounded-lg text-center transition-all duration-200 focus:outline-none ${
                            selectedAmount === amount && !customAmount
                              ? "border-yellow-400 bg-yellow-50"
                              : "hover:border-yellow-400 hover:bg-yellow-50"
                          }`}
                        >
                          <span className="text-md font-bold text-gray-900">
                            ${amount}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">$</span>
                      <input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Donation Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Donation Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          donationType === "one-time"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-200 hover:border-yellow-500 hover:bg-yellow-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="donationType"
                          value="one-time"
                          checked={donationType === "one-time"}
                          onChange={(e) => setDonationType(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-semibold text-sm text-gray-900">
                            One-time Donation
                          </div>
                          <div className="text-xs text-gray-600">
                            Make a single donation today
                          </div>
                        </div>
                      </label>
                      <label
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          donationType === "monthly"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-200 hover:border-yellow-500 hover:bg-yellow-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="donationType"
                          value="monthly"
                          checked={donationType === "monthly"}
                          onChange={(e) => setDonationType(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-semibold text-sm text-gray-900">
                            Monthly Donation
                          </div>
                          <div className="text-xs text-gray-600">
                            Recurring monthly support
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={donorInfo.firstName}
                        onChange={(e) =>
                          handleDonorInfoChange("firstName", e.target.value)
                        }
                        className="p-3 border border-gray-300 placeholder:text-sm rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={donorInfo.lastName}
                        onChange={(e) =>
                          handleDonorInfoChange("lastName", e.target.value)
                        }
                        className="p-3 border border-gray-300 placeholder:text-sm rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={donorInfo.email}
                        onChange={(e) =>
                          handleDonorInfoChange("email", e.target.value)
                        }
                        className="md:col-span-2 p-3 border border-gray-300 placeholder:text-sm rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Continue to Payment Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
                  >
                    Continue to Payment - ${finalAmount}{" "}
                    {donationType === "monthly" ? "/month" : ""}
                  </button>
                </form>
              ) : (
                <div>
                  {/* Payment Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Payment Summary
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Donor: {donorName}</div>
                      <div>Email: {donorInfo.email}</div>
                      <div>
                        Amount: ${finalAmount}{" "}
                        {donationType === "monthly" ? "/month" : ""}
                      </div>
                      <div>
                        Type:{" "}
                        {donationType === "monthly"
                          ? "Monthly Recurring"
                          : "One-time"}
                      </div>
                    </div>
                  </div>

                  {/* Stripe Payment Form */}
                  <PaymentForm
                    amount={finalAmount}
                    donationType={donationType}
                    donorInfo={{
                      name: donorName,
                      email: donorInfo.email,
                    }}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />

                  {/* Back Button */}
                  <button
                    onClick={() => setShowPayment(false)}
                    className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    ← Back to donation details
                  </button>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-green-800 font-medium">
                    Your payment is secured by 256-bit SSL encryption and
                    processed by Stripe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DonateSection;
