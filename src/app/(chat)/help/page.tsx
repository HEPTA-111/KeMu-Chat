import Image from "next/image";
import React from "react";

import GettingStarted from "@/res/images/getting_started.jpg";
import AskingQuestions from "@/res/images/asking_questions.jpg";
import UnderStanding from "@/res/images/understanding.jpg";
import TroubleShooting from "@/res/images/troubleshooting.jpg";
import FeedBack from "@/res/images/feedback.jpg";
import Updates from "@/res/images/updates.jpg";
import BestPractices from "@/res/images/best_practice.jpg";
import ReferenceGuides from "@/res/images/reference.jpg";

const HelpPage = () => {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Title */}
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Mastering Kemu Chat
          </h2>

          <p className="mt-4 text-gray-900">
            Your Guide to AI-Powered Campus Support. Unlock the full potential
            of your digital university assistant
          </p>
        </div>
        {/* Content */}
        <section>
          {/* Getting Started */}
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold sm:text-2xl">Getting Started</h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <Image
                  alt=""
                  src={GettingStarted}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="lg:py-16">
                <article className="space-y-4 text-gray-600">
                  <p>
                    Welcome to Kemu Chat, your AI-powered campus companion!
                    Here&apos;s how to get started:
                  </p>

                  <p className="font-semibold">Accessing Kemu Chat:</p>
                  <p>
                    Visit the University&apos;s website and search for Kemu Chat
                  </p>
                  <p className="font-semibold">Creating an Account:</p>
                  <ol className="list-decimal pl-5">
                    <li>Click &apos;Sign Up&apos; on the Kemu Chat homepage</li>
                    <li>Use your university email address</li>
                    <li>Create a strong password</li>
                    <li>Verify your email to activate your account</li>
                  </ol>
                  <p className="font-semibold">Logging in:</p>
                  <p>
                    Simply enter your university email and password on the login
                    screen.
                  </p>
                  <p className="font-semibold">Basic interface:</p>
                  <ul>
                    <li>
                      Chat window: Where you&apos;ll interact with Kemu Chat
                    </li>
                    <li>Menu: Access different features and settings</li>
                    <li>History: Review past conversations</li>
                    <li>Help button: Quick access to this guide</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>

          {/* Asking Questions */}
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold sm:text-2xl">
                Asking Questions
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="lg:py-16">
                <article className="space-y-4 text-gray-600">
                  <p>
                    Get the most out of Kemu Chat by asking clear, specific
                    questions:
                  </p>
                  <p className="font-semibold">Tips for effective queries:</p>

                  <ul className="list-disc">
                    <li>
                      Be specific: &quot;What&apos;s the deadline for course
                      registration?&quot; is better than &quot;When do I
                      register?&quot;
                    </li>
                    <li>
                      One topic at a time: Break complex queries into simpler
                      questions
                    </li>
                    <li>
                      Use keywords: Include key terms related to your query
                    </li>
                  </ul>

                  <p className="font-semibold">
                    Examples of well-structured questions:
                  </p>
                  <ul className="list-disc">
                    <li>
                      {" "}
                      &quot;How do I apply for on-campus housing for next
                      semester?&quot;
                    </li>
                    <li>
                      {" "}
                      &quot;What are the prerequisites for BIOL 101?&quot;
                    </li>
                    <li>
                      {" "}
                      &quot;Where can I find information about study abroad
                      programs in Spain?&quot;
                    </li>
                  </ul>
                  <p>Using keywords:</p>
                  <p>
                    Include relevant terms like course codes, department names,
                    or specific services to help Kemu Chat understand your query
                    better.
                  </p>
                </article>
              </div>
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <Image
                  alt="Asking Questions Image"
                  src={AskingQuestions}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Understanding Responses */}
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold sm:text-2xl">
                Understanding Responses
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <Image
                  alt="Kemu Chat response interface"
                  src={UnderStanding}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="lg:py-16">
                <article className="space-y-4 text-gray-600">
                  <p className="font-semibold">
                    Interpreting Kemu Chat&apos;s answers:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>
                      Read carefully: Kemu Chat provides concise, relevant
                      information
                    </li>
                    <li>
                      Look for action items: Note any steps or links provided
                    </li>
                    <li>
                      Check for source references: Kemu Chat may cite university
                      policies or websites
                    </li>
                  </ul>

                  <p className="font-semibold">If you need more clarity:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Ask for elaboration: &quot;Can you explain that in simpler
                      terms?&quot;
                    </li>
                    <li>
                      Request examples: &quot;Can you give me an example of
                      that?&quot;
                    </li>
                    <li>
                      Seek definitions: &quot;What do you mean by [term]?&quot;
                    </li>
                  </ul>

                  <p className="font-semibold">Asking follow-up questions:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Build on previous answers: &quot;Regarding [previous
                      topic], can you tell me more about...?&quot;
                    </li>
                    <li>
                      Seek additional details: &quot;What else should I know
                      about this?&quot;
                    </li>
                    <li>
                      Explore related topics: &quot;How does this relate to
                      [another topic]?&quot;
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold sm:text-2xl">Troubleshooting</h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="lg:py-16">
                <article className="space-y-4 text-gray-600">
                  <p className="font-semibold">Common issues and solutions:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Slow responses: Check your internet connection or try
                      refreshing the page
                    </li>
                    <li>
                      Login problems: Ensure you&apos;re using your correct
                      university email and password
                    </li>
                    <li>
                      Outdated information: Report it to help us update our
                      database
                    </li>
                  </ul>

                  <p className="font-semibold">
                    If Kemu Chat can&apos;t answer:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>Rephrase your question using different keywords</li>
                    <li>Break down complex queries into simpler parts</li>
                    <li>Check our FAQ section for common queries</li>
                  </ul>

                  <p className="font-semibold">Reporting bugs:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Use the &apos;Report an Issue&apos; button in the app
                    </li>
                    <li>
                      Provide details: What were you doing? What went wrong?
                    </li>
                    <li>Include screenshots if possible</li>
                  </ul>
                </article>
              </div>
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <Image
                  alt="Troubleshooting flowchart"
                  src={TroubleShooting}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Providing Feedback */}
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold sm:text-2xl">
                Providing Feedback
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <Image
                  alt="Kemu Chat feedback interface"
                  src={FeedBack}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="lg:py-16">
                <article className="space-y-4 text-gray-600">
                  <p className="font-semibold">Rating responses:</p>
                  <ul className="list-disc pl-5">
                    <li>Use the thumbs up/down icons after each response</li>
                    <li>
                      Your ratings help improve Kemu Chat&apos;s performance
                    </li>
                  </ul>

                  <p className="font-semibold">Suggesting improvements:</p>
                  <ul className="list-disc pl-5">
                    <li>Click &apos;Suggest a Feature&apos; in the app menu</li>
                    <li>Describe your idea clearly and explain its benefits</li>
                    <li>We review all suggestions regularly</li>
                  </ul>

                  <p className="font-semibold">Contacting the team:</p>
                  <ul className="list-disc pl-5">
                    <li>Email: Kemu Chat@[university].edu</li>
                    <li>In-app: Use the &apos;Contact Us&apos; feature</li>
                    <li>We aim to respond within 24 hours</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>

          {/* Updates and New Features */}
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold sm:text-2xl">
                Updates and New Features
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="lg:py-16">
                <article className="space-y-4 text-gray-600">
                  <p className="font-semibold">Staying informed:</p>
                  <ul className="list-disc pl-5">
                    <li>Enable notifications in the app settings</li>
                    <li>Follow Kemu Chat on social media: [links]</li>
                    <li>
                      Check the &apos;What&apos;s New&apos; section in the app
                      regularly
                    </li>
                  </ul>

                  <p className="font-semibold">Upcoming features:</p>
                  <ul className="list-disc pl-5">
                    <li>Enhanced natural language processing</li>
                    <li>Integration with more university systems</li>
                    <li>Personalized study recommendations</li>
                  </ul>
                </article>
              </div>
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <Image
                  alt="Kemu Chat evolution timeline"
                  src={Updates}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold sm:text-2xl">Best Practices</h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <Image
                  alt="Kemu Chat best practices infographic"
                  src={BestPractices}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="lg:py-16">
                <article className="space-y-4 text-gray-600">
                  <p className="font-semibold">Maximizing Kemu Chat:</p>
                  <ul className="list-disc pl-5">
                    <li>Use it regularly to stay informed</li>
                    <li>Explore different features beyond just Q&A</li>
                    <li>Provide feedback to help improve the service</li>
                  </ul>

                  <p className="font-semibold">Integrating into daily life:</p>
                  <ul className="list-disc pl-5">
                    <li>Morning: Check for important announcements</li>
                    <li>Before classes: Verify schedules and locations</li>
                    <li>Evening: Plan tomorrow&apos;s tasks</li>
                  </ul>

                  <p className="font-semibold">Limitations:</p>
                  <ul className="list-disc pl-5">
                    <li>Complex advising needs may require human assistance</li>
                    <li>
                      Emotional support is best sought from university
                      counseling services
                    </li>
                    <li>
                      For emergencies, always contact appropriate authorities
                      directly
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>

          {/* Quick Reference Guide */}
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold sm:text-2xl">
                Quick Reference Guide
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="lg:py-16">
                <article className="space-y-4 text-gray-600">
                  <p className="font-semibold">Common commands:</p>
                  <ul className="list-disc pl-5">
                    <li>&quot;Schedule&quot;: View your class timetable</li>
                    <li>
                      &quot;Deadlines&quot;: List upcoming academic due dates
                    </li>
                    <li>&quot;Campus map&quot;: Navigate university grounds</li>
                  </ul>

                  <p className="font-semibold">
                    Topics Kemu Chat can help with:
                  </p>
                  <ul className="list-disc pl-5">
                    <li>Academic: Course info, registration, grades</li>
                    <li>Administrative: Financial aid, housing, ID cards</li>
                    <li>Campus life: Events, clubs, facilities</li>
                    <li>Career: Job postings, internships, resume help</li>
                  </ul>

                  <p>
                    Remember, Kemu Chat is here to make your university
                    experience smoother and more productive. Don&apos;t hesitate
                    to explore its capabilities!
                  </p>
                </article>
              </div>
              <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                <Image
                  alt="Kemu Chat quick reference cheat sheet"
                  src={ReferenceGuides}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
