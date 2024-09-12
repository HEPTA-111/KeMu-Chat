import FaqDropdown from "@/components/custom/FaqDropdown";

const faqs = [
  {
    question: "What kind of information can Kemu Chat provide?",
    answer:
      "Kemu Chat can provide a wide range of information including course details, campus events, administrative procedures, academic policies, and general university information. It's designed to assist with most aspects of student life and academic queries.",
  },
  {
    question: "How do I access Kemu Chat?",
    answer:
      "Kemu Chat can be accessed through our university's official website, mobile app, or directly via popular messaging platforms. Simply log in with your student credentials to start chatting.",
  },
  {
    question: "Is Kemu Chat available 24/7?",
    answer:
      "Yes, Kemu Chat is available 24 hours a day, 7 days a week. You can access it at any time, from anywhere, to get the information you need.",
  },
  {
    question: "Can Kemu Chat help me with course registration?",
    answer:
      "Yes, Kemu Chat can guide you through the course registration process, provide information about course availability, prerequisites, and even help you understand your degree requirements.",
  },
  {
    question: "Does Kemu Chat have access to my personal academic information?",
    answer:
      "Kemu Chat can access certain parts of your academic record to provide personalized assistance, but only after you've securely logged in. It adheres to strict privacy guidelines and will never share your personal information.",
  },
  {
    question: "How accurate is the information provided by Kemu Chat?",
    answer:
      "Kemu Chat is regularly updated with the latest information from university databases. However, for critical decisions, we always recommend verifying important information with university staff or official documentation.",
  },
  {
    question: "Can Kemu Chat help me with financial aid questions?",
    answer:
      "Yes, Kemu Chat can provide general information about financial aid processes, deadlines, and requirements. For specific questions about your individual financial aid status, it may direct you to the appropriate university office.",
  },
  {
    question:
      "Is Kemu Chat able to schedule appointments with university staff or faculty?",
    answer:
      "While Kemu Chat can't directly schedule appointments, it can provide information on how to book appointments and direct you to the appropriate scheduling systems or contact information for various university departments.",
  },
  {
    question: "How does Kemu Chat handle privacy and data security?",
    answer:
      "Kemu Chat follows strict data protection protocols. It only accesses the information necessary to assist you, and all interactions are encrypted. We never store personal conversations or share your data with third parties.",
  },
  {
    question:
      "Can Kemu Chat assist with campus navigation or provide directions?",
    answer:
      "Yes, Kemu Chat can provide directions to various campus locations, information about building hours, and even help you locate specific offices or classrooms within buildings.",
  },
];

const FAQPage = () => {
  return (
    <div className="flex justify-center  bg-gray-50 h-screen">
      <div className="space-y-4 w-1/3 mt-12">
        <div className="text-center">
          <div className="font-light">KEMU CHAT&apos;s COMMON QUESTIONS</div>
          <h1 className="font-bold text-4xl">Frequently Asked Questions</h1>
        </div>
        {faqs.map((faq, index) => (
          <FaqDropdown
            key={index}
            question={faq.question}
            answer={faq.answer}
            open={index === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
