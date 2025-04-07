import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I register?",
      answer:
        "You can register as an exporter or manufacturer by filling out the signup form.",
    },
    {
      question: "Is there a subscription fee?",
      answer: "No, registration is completely free at the moment.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach out to us through the contact form or our email support.",
    },
    {
      question: "What kind of businesses can join ExportHaven?",
      answer:
        "ExportHaven is designed for Sri Lankan manufacturers and exporters looking to expand their business globally.",
    },
    {
      question: "How does the platform connect exporters and manufacturers?",
      answer:
        "Our platform provides search capabilities, direct messaging, and profile visibility to facilitate connections between exporters and manufacturers.",
    },
    {
      question: "Are there any verification processes for businesses?",
      answer:
        "Yes, we verify all businesses that register on our platform to ensure authenticity and build trust among users.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#353535] mb-4">
          Frequently Asked Questions
        </h2>
        <div className="w-24 h-1 bg-[#3c6e71] mx-auto mb-14"></div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-[#d9d9d9] focus:outline-none"
              >
                <span className="text-lg font-medium text-[#353535]">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp
                    className="text-[#3c6e71] flex-shrink-0"
                    size={20}
                  />
                ) : (
                  <ChevronDown
                    className="text-[#3c6e71] flex-shrink-0"
                    size={20}
                  />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-[#d9d9d9] border-t border-[#353535]">
                  <p className="text-[#353535]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
