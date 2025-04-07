import React from "react";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const manufacturerPlans = [
    {
      title: "Manufacturer Basic",
      price: "LKR 4,000/month",
      annualPrice: "LKR 40,000/year",
      features: [
        "List up to 10 products",
        "Access to basic market insights",
        "Email support",
      ],
    },
    {
      title: "Manufacturer Pro",
      price: "LKR 12,000/month",
      annualPrice: "LKR 120,000/year",
      features: [
        "Unlimited product listings",
        "Advanced analytics & AI-driven insights",
        "Priority support & consultation",
      ],
      popular: true,
    },
    {
      title: "Manufacturer Enterprise",
      price: "Custom",
      annualPrice: "Custom",
      features: [
        "Dedicated account management",
        "Custom integrations with local logistics partners",
        "24/7 premium support",
      ],
    },
  ];

  const exporterPlans = [
    {
      title: "Exporter Basic",
      price: "LKR 6,500/month",
      annualPrice: "LKR 65,000/year",
      features: [
        "Access to 50+ manufacturers",
        "Basic search filters",
        "Email support",
      ],
    },
    {
      title: "Exporter Pro",
      price: "LKR 20,000/month",
      annualPrice: "LKR 200,000/year",
      features: [
        "Access to unlimited manufacturers",
        "Advanced search filters with market segmentation",
        "Priority support and export advisory",
      ],
      popular: true,
    },
    {
      title: "Exporter Enterprise",
      price: "Custom",
      annualPrice: "Custom",
      features: [
        "Dedicated account management",
        "Custom integrations with regional trade systems",
        "24/7 premium support",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="bg-[#ffffff] min-h-screen py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#353535] sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-[#353535]">
            Choose a plan designed to boost your export potential and support
            local growth.
          </p>
        </div>
        {/* Manufacturer Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#353535] text-center mb-8">
            For Manufacturers
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {manufacturerPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? "ring-2 ring-[#284b63]" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#3c6e71] text-white py-2 px-4 flex items-center justify-center">
                    <Star size={16} className="mr-2" /> Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-[#353535] mb-4">
                    {plan.title}
                  </h4>
                  <div className="mb-6">
                    <h5 className="text-3xl font-bold text-[#284b63]">
                      {plan.price}
                    </h5>
                    <p className="text-sm text-[#353535] mt-1">
                      <span className="line-through">{plan.annualPrice}</span>
                      <span className="ml-2 text-[#3c6e71] font-medium">
                        Save 10%
                      </span>
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check
                          size={18}
                          className="text-[#284b63] mr-2 flex-shrink-0 mt-1"
                        />
                        <span className="text-[#353535]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      plan.popular
                        ? "bg-[#284b63] text-white hover:bg-[#3c6e71] focus:ring-[#284b63]"
                        : "bg-[#d9d9d9] text-[#353535] hover:bg-[#c4c4c4] focus:ring-[#d9d9d9]"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Exporter Plans */}
        <div>
          <h3 className="text-2xl font-bold text-[#353535] text-center mb-8">
            For Exporters
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {exporterPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? "ring-2 ring-[#284b63]" : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#3c6e71] text-white py-2 px-4 flex items-center justify-center">
                    <Star size={16} className="mr-2" /> Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-[#353535] mb-4">
                    {plan.title}
                  </h4>
                  <div className="mb-6">
                    <h5 className="text-3xl font-bold text-[#284b63]">
                      {plan.price}
                    </h5>
                    <p className="text-sm text-[#353535] mt-1">
                      <span className="line-through">{plan.annualPrice}</span>
                      <span className="ml-2 text-[#3c6e71] font-medium">
                        Save 10%
                      </span>
                    </p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check
                          size={18}
                          className="text-[#284b63] mr-2 flex-shrink-0 mt-1"
                        />
                        <span className="text-[#353535]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      plan.popular
                        ? "bg-[#284b63] text-white hover:bg-[#3c6e71] focus:ring-[#284b63]"
                        : "bg-[#d9d9d9] text-[#353535] hover:bg-[#c4c4c4] focus:ring-[#d9d9d9]"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
