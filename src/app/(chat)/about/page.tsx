import AboutCard from "@/components/custom/AboutCard";
import {
  BrainCircuit,
  Clock1,
  EarthLock,
  GraduationCap,
  Headset,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div>
      <section className="bg-gray-50 text-black">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">About Kemu Chat</h2>

            <p className="mt-4 text-gray-900">
              Kemu Chat is an innovative AI-powered chatbot designed to
              revolutionize the university experience for students. Our mission
              is to provide instant, reliable, and comprehensive support for all
              aspects of campus life, academics, and administrative needs.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Our Vision */}
            <AboutCard
              icon={<GraduationCap />}
              title=" Empowering Student Success"
              content="At Kemu Chat, we envision a future where every student has immediate access to the information and support they need to thrive in their academic journey. We're committed to breaking down information barriers and streamlining the university experience."
            />

            {/* How Kemu Chat Works */}
            <AboutCard
              icon={<BrainCircuit />}
              title="AI-Driven Assistance"
              content="Powered by advanced artificial intelligence, Kemu Chat processes and understands student queries in real-time. It taps into a vast database of university information to provide accurate, personalized responses 24/7."
            />

            {/*  Key Features */}
            <AboutCard
              icon={<Headset />}
              title="Comprehensive Support"
              content="From course registration guidance to campus event updates, financial aid information to academic policy clarifications, Kemu Chat is your all-in-one university companion. Our platform evolves continuously to meet the changing needs of students."
            />

            {/* Privacy and Security */}
            <AboutCard
              icon={<EarthLock />}
              title="Your Trust, Our Priority"
              content="We understand the importance of data protection. Kemu Chat employs state-of-the-art security measures to ensure that all student interactions and information remain confidential and secure."
            />

            {/* Accessibility */}
            <AboutCard
              icon={<Clock1 />}
              title="Support Anytime, Anywhere"
              content="Kemu Chat is available 24/7 across multiple platforms, including web, mobile app, and popular messaging services. Access the help you need, whenever and wherever you need it."
            />

            {/*  Continuous Improvement*/}
            <AboutCard
              icon={<TrendingUp />}
              title="Growing With You"
              content="We're committed to constant enhancement. Kemu Chat learns from every interaction, and we regularly update our knowledge base to ensure you always have access to the most current and relevant information."
            />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring focus:ring-primary/10"
            >
              Get Started Today
            </Link>
            <p className="mt-4 text-gray-900">
              Experience the future of university support. Start chatting with
              Kemu Chat today and unlock a smarter way to navigate your academic
              journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
