import React from "react";
import {
  Building2,
  Rocket,
  Boxes,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import nadunImage from "../assets/teamMembers/nadun.jpg";
import savinduImage from "../assets/teamMembers/savindu.png";
import lakminiImage from "../assets/teamMembers/lakmini.png";
import arithaImage from "../assets/teamMembers/aritha.png";
import yoshenImage from "../assets/teamMembers/yoshen.png";
import vidaraImage from "../assets/teamMembers/vidara.png";

const teamMembers = [
  {
    name: "Nimdiya  Ranasinghe",
    role: "Founder & Digital Strategist",
    image: arithaImage,
    description:
      "Aritha spearheads our vision by integrating innovative web technologies with deep insights into Sri Lanka's export and manufacturing sectors, ensuring local businesses connect seamlessly with global markets.",
  },
  {
    name: "Savindu Rajapaksha",
    role: "Project Manager & Mobile Solutions Expert",
    image: savinduImage,
    description:
      "Savindu coordinates project efforts with precision and leverages cutting-edge mobile technologies to deliver streamlined digital experiences that empower Sri Lankan manufacturers and exporters.",
  },
  {
    name: "Lakmini Perera",
    role: "Co-Founder, CTO & Technical Leader",
    image: lakminiImage,
    description:
      "Lakmini drives our technical strategy, designing robust systems that enable local businesses to showcase their products internationally and excel in modern trade dynamics.",
  },
  {
    name: "Nadun Jayathunga",
    role: "UI/UX Designer & Front-End Developer",
    image: nadunImage,
    description:
      "Nadun crafts intuitive and user-friendly interfaces tailored for Sri Lankan manufacturers and exporters, simplifying complex trade processes and enhancing user engagement.",
  },
  {
    name: "Yoshen Tharinda",
    role: "Head of Product & DevOps Engineer",
    image: yoshenImage,
    description:
      "Yoshen directs product innovation, ensuring efficient deployment pipelines that support the unique needs of Sri Lankan trade networks and drive scalable platform performance.",
  },
  {
    name: "Manjulee Dassanayake",
    role: "Senior Software Engineer",
    image: vidaraImage,
    description:
      "Vidara leads our backend architecture with a focus on scalability and reliability, building systems that facilitate seamless connections between local manufacturers and global exporters.",
  },
];

const features = [
  {
    icon: <Building2 size={32} />,
    title: "Local Manufacturing",
    description:
      "Empowering Sri Lankan manufacturers to showcase their excellence and access global markets.",
  },
  {
    icon: <Network size={32} />,
    title: "Global Connections",
    description:
      "Fostering direct links between local businesses and international buyers for sustainable trade growth.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Trusted Platform",
    description:
      "A secure, verified platform built to ensure safe transactions and trust among trade partners.",
  },
  {
    icon: <Workflow size={32} />,
    title: "Streamlined Process",
    description:
      "Simplifying export procedures with intuitive, technology-driven workflows tailored for Sri Lankan industry.",
  },
  {
    icon: <Boxes size={32} />,
    title: "Product Showcase",
    description:
      "A dynamic digital display for Sri Lankan products to increase visibility in international markets.",
  },
  {
    icon: <Rocket size={32} />,
    title: "Growth Support",
    description:
      "Providing market insights and tools to drive international expansion and economic development.",
  },
];

const AboutUs = () => {
  return (
    <section id="about-us" className="bg-[#ffffff] text-[#353535] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-[#353535]">
              About ExportHaven
            </h2>
            <div className="w-24 h-1 bg-[#3c6e71] mx-auto mb-6"></div>
            <p className="text-xl mb-12 italic">
              "ExportHaven was created to empower Sri Lankan manufacturers and
              exporters by leveraging cutting-edge technology and deep local
              insights. We connect local businesses with global markets to
              foster sustainable growth."
            </p>
            <div className="bg-white rounded-lg p-8 shadow-md mb-16">
              <h3 className="text-2xl font-semibold mb-4 text-[#284b63]">
                Our Mission
              </h3>
              <p className="text-lg italic">
                "Our mission is to bridge the gap between Sri Lankan
                manufacturing and international trade by offering a secure,
                innovative, and streamlined platform that drives growth and
                global market access."
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-[#284b63]">
                Why Choose ExportHaven
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md transition-transform hover:transform hover:scale-105"
                  >
                    <div className="text-[#3c6e71] mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-medium mb-3 text-[#284b63]">
                      {feature.title}
                    </h4>
                    <p className="text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-4 text-center text-[#353535]">
            Meet Our Team
          </h2>
          <p className="text-xl mb-12 text-center max-w-3xl mx-auto">
            A dedicated group of professionals passionate about innovation and
            excellence in global trade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105"
              >
                <div className="h-96 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-fill object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#284b63]">
                    {member.name}
                  </h3>
                  <h4 className="text-md font-medium mb-3 text-[#3c6e71]">
                    {member.role}
                  </h4>
                  <p className="text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
