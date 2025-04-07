import React, { useEffect, useState, Component } from "react";
import {
  Globe,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Star,
  Users,
  MapPin,
  Award,
  BarChart3,
  Briefcase,
  Ship,
  Coffee,
  Leaf,
  Shirt,
  Gem,
  Utensils,
  Flower2,
  Palmtree,
  Waves,
  Cpu,
  Truck,
  Sparkles,
} from "lucide-react";
import { ExportTrendsChart } from "../components/charts/ExportTrendsChart.tsx";
import { MarketDistributionChart } from "../components/charts/MarketDistributionChart.tsx";
import { CategoryComparisonChart } from "../components/charts/CategoryComparisonChart.tsx";
import { ExportGrowthChart } from "../components/charts/ExportGrowthChart.tsx";
import { DataStatsCard } from "../components/DataStatsCard.tsx";
function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [stats, setStats] = useState({
    exporters: 0,
    manufacturers: 0,
    countries: 0,
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeInsightTab, setActiveInsightTab] = useState("trends");
  // Animate stats on load
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setStats((prev) => ({
        exporters: prev.exporters >= 1000 ? 1000 : prev.exporters + 50,
        manufacturers:
          prev.manufacturers >= 500 ? 500 : prev.manufacturers + 25,
        countries: prev.countries >= 50 ? 50 : prev.countries + 2,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  const images = {
    feature1:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    feature2:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    profile1:
      "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    profile2:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    profile3:
      "https://img.freepik.com/free-photo/indian-businessman-with-his-white-car_496169-2889.jpg?t=st=1741810960~exp=1741814560~hmac=1e4fd6b7b3e71b3f4493d9639bd8d017d45a03fa6f54357baa9415899488e307&w=740",
    profile4: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    profile5:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150",
    map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200",
    tea: "https://images.unsplash.com/photo-1497800640957-3100979af57c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    textiles:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600",
    gems: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=600",
    spices:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600",
    coconut:
      "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=600",
    rubber:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600",
    seafood:
      "https://images.unsplash.com/photo-1573699209155-e1364b8746a5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    electronics:
      "https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=600",
    logistics:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
    agriculture:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600",
    handicrafts:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600",
    ceramics:
      "https://cdn.pixabay.com/photo/2023/05/03/19/04/tea-7968441_1280.jpg",
  };
  const testimonials = [
    {
      image: images.profile1,
      name: "Amal Perera",
      role: "CEO, Lanka Exports",
      text: "ExportHaven has transformed how we connect with international buyers. Our export volume has grown by 150% since joining.",
      rating: 5,
    },
    {
      image: images.profile2,
      name: "Samantha Silva",
      role: "Director, Spice Trade Co",
      text: "The platform's market insights feature helps us make data-driven decisions. It's been invaluable for our business growth.",
      rating: 5,
    },
    {
      image: images.profile3,
      name: "Rajith Fernando",
      role: "Founder, Ceylon Craft",
      text: "Finding reliable manufacturers was a challenge until we discovered ExportHaven. Now we have partners we can trust.",
      rating: 4,
    },
    {
      image: images.profile4,
      name: "Priya Mendis",
      role: "Export Manager, Colombo Textiles",
      text: "The international market connections we've made through ExportHaven have opened doors we never thought possible for our business.",
      rating: 5,
    },
    {
      image: images.profile5,
      name: "Dinesh Jayawardena",
      role: "Operations Director, Ceylon Tea Exports",
      text: "The platform's verification process ensures we only deal with legitimate businesses, which has eliminated our previous issues with unreliable partners.",
      rating: 5,
    },
  ];
  const exportCategories = [
    {
      id: "all",
      name: "All Categories",
      count: 1500,
      icon: <Globe size={20} />,
    },
    {
      id: "tea",
      name: "Tea & Beverages",
      count: 320,
      image: images.tea,
      icon: <Coffee size={20} />,
    },
    {
      id: "textiles",
      name: "Textiles & Garments",
      count: 285,
      image: images.textiles,
      icon: <Shirt size={20} />,
    },
    {
      id: "gems",
      name: "Gems & Jewelry",
      count: 175,
      image: images.gems,
      icon: <Gem size={20} />,
    },
    {
      id: "spices",
      name: "Spices & Herbs",
      count: 210,
      image: images.spices,
      icon: <Utensils size={20} />,
    },
    {
      id: "coconut",
      name: "Coconut Products",
      count: 195,
      image: images.coconut,
      icon: <Palmtree size={20} />,
    },
    {
      id: "rubber",
      name: "Rubber & Plastics",
      count: 165,
      image: images.rubber,
      icon: <Leaf size={20} />,
    },
    {
      id: "seafood",
      name: "Seafood & Marine",
      count: 140,
      image: images.seafood,
      icon: <Waves size={20} />,
    },
    {
      id: "electronics",
      name: "Electronics",
      count: 120,
      image: images.electronics,
      icon: <Cpu size={20} />,
    },
    {
      id: "logistics",
      name: "Logistics Services",
      count: 90,
      image: images.logistics,
      icon: <Truck size={20} />,
    },
    {
      id: "agriculture",
      name: "Agriculture Products",
      count: 180,
      image: images.agriculture,
      icon: <Flower2 size={20} />,
    },
    {
      id: "handicrafts",
      name: "Handicrafts",
      count: 155,
      image: images.handicrafts,
      icon: <Sparkles size={20} />,
    },
    {
      id: "ceramics",
      name: "Ceramics & Pottery",
      count: 120,
      image: images.ceramics,
      icon: <Award size={20} />,
    },
  ];
  const marketInsights = [
    {
      title: "Tea Exports Surge",
      change: "+15%",
      description:
        "Sri Lankan tea exports have seen a 15% increase in global demand over the last quarter.",
      trend: "up",
    },
    {
      title: "Textile Market Expansion",
      change: "+8%",
      description:
        "The textile industry is expanding into new European markets with sustainable product lines.",
      trend: "up",
    },
    {
      title: "Spice Trade Challenges",
      change: "-3%",
      description:
        "Global supply chain issues have temporarily affected spice exports, expected to recover next quarter.",
      trend: "down",
    },
    {
      title: "Gem Exports to Asia",
      change: "+22%",
      description:
        "Luxury markets in East Asia show increased demand for Sri Lankan precious stones and jewelry.",
      trend: "up",
    },
    {
      title: "Coconut Products Growth",
      change: "+12%",
      description:
        "Organic coconut products are seeing strong demand in health-conscious Western markets.",
      trend: "up",
    },
    {
      title: "Seafood Export Regulations",
      change: "+5%",
      description:
        "New sustainable fishing certifications have opened premium markets for Sri Lankan seafood.",
      trend: "up",
    },
  ];
  const features = [
    {
      icon: <Globe className="text-[#284b63] w-8 h-8" />,
      title: "Global Reach",
      description:
        "Connect with buyers and sellers from over 50 countries across 6 continents",
    },
    {
      icon: <TrendingUp className="text-[#284b63] w-8 h-8" />,
      title: "Market Insights",
      description:
        "Access real-time market data, trend analysis, and export opportunity forecasts",
    },
    {
      icon: <Shield className="text-[#284b63] w-8 h-8" />,
      title: "Verified Partners",
      description:
        "All businesses undergo thorough verification for secure and reliable trading",
    },
    {
      icon: <Zap className="text-[#284b63] w-8 h-8" />,
      title: "Smart Matching",
      description:
        "AI-powered matching algorithms connect you with ideal business partners",
    },
    {
      icon: <BarChart3 className="text-[#284b63] w-8 h-8" />,
      title: "Analytics Dashboard",
      description:
        "Track your export performance with comprehensive analytics and reporting",
    },
    {
      icon: <Briefcase className="text-[#284b63] w-8 h-8" />,
      title: "Trade Resources",
      description:
        "Access guides, templates, and expert advice on international trade regulations",
    },
  ];
  const categoryInfo = {
    tea: {
      description:
        "Sri Lanka is renowned for its high-quality Ceylon tea, with a rich heritage dating back to 1867. The country's unique climate and elevation produce distinctive flavors sought after worldwide.",
      highlights: [
        "Premium Ceylon Black, Green, and White Teas",
        "Organic and Fair Trade Certifications",
        "Specialty Flavored and Herbal Blends",
        "Advanced Processing Technologies",
      ],
    },
    textiles: {
      description:
        "Sri Lankan textile and garment industry combines traditional craftsmanship with modern manufacturing, producing high-quality apparel for leading global brands with sustainable practices.",
      highlights: [
        "Ethical Manufacturing Standards",
        "Innovative Sustainable Fabrics",
        "Specialized in Activewear and Intimates",
        "Advanced Design Capabilities",
      ],
    },
    gems: {
      description:
        "Sri Lanka's gem industry dates back over 2,500 years, producing some of the world's finest sapphires, rubies, and other precious stones with exceptional clarity and color.",
      highlights: [
        "World-Famous Blue Sapphires",
        "Ethically Sourced Gemstones",
        "Traditional and Modern Cutting Techniques",
        "Custom Jewelry Design Services",
      ],
    },
    spices: {
      description:
        "Sri Lanka's spice trade heritage spans centuries, producing premium cinnamon, cardamom, pepper, and cloves that define global culinary standards with unmatched quality and flavor.",
      highlights: [
        "World's Finest True Cinnamon (Ceylon Cinnamon)",
        "Organic Cultivation Practices",
        "Sustainable Harvesting Methods",
        "Advanced Processing Facilities",
      ],
    },
    coconut: {
      description:
        "Sri Lanka's coconut industry offers diverse products from virgin coconut oil to coir fiber, combining traditional knowledge with modern processing for premium quality exports.",
      highlights: [
        "Organic Virgin Coconut Oil",
        "Eco-friendly Coir Products",
        "Coconut-based Cosmetics",
        "Innovative Packaging Solutions",
      ],
    },
    rubber: {
      description:
        "Sri Lanka produces premium natural rubber and value-added rubber products, known for exceptional quality and consistency that meets rigorous international standards.",
      highlights: [
        "Specialized Industrial Rubber Products",
        "Medical-grade Latex Items",
        "Sustainable Plantation Practices",
        "Advanced R&D Capabilities",
      ],
    },
    seafood: {
      description:
        "Sri Lanka's seafood industry leverages the island's rich marine resources to provide premium fish, crustaceans, and processed seafood products to global markets with sustainable practices.",
      highlights: [
        "MSC-certified Sustainable Fishing",
        "Premium Tuna and Swordfish Exports",
        "State-of-the-art Processing Facilities",
        "Strict Quality Control Standards",
      ],
    },
    electronics: {
      description:
        "Sri Lanka's growing electronics sector specializes in circuit boards, components, and assembly services, combining skilled workforce with quality management systems.",
      highlights: [
        "Precision Electronic Components",
        "IoT Device Manufacturing",
        "Software-Hardware Integration",
        "Competitive Production Costs",
      ],
    },
    logistics: {
      description:
        "Sri Lanka offers comprehensive logistics services leveraging its strategic location in the Indian Ocean, providing efficient shipping, warehousing, and distribution solutions.",
      highlights: [
        "Strategic Port Facilities",
        "Integrated Supply Chain Solutions",
        "Digital Tracking and Management",
        "Specialized Export Documentation Services",
      ],
    },
    agriculture: {
      description:
        "Sri Lanka's fertile lands produce a variety of agricultural products including rice, fruits, and vegetables, cultivated using both traditional and modern farming techniques.",
      highlights: [
        "Premium Organic Produce",
        "Advanced Irrigation Systems",
        "Sustainable Farming Practices",
        "Export-Quality Packaging",
      ],
    },
    handicrafts: {
      description:
        "Sri Lankan handicrafts reflect a rich cultural heritage, offering intricately designed wooden, brass, and woven items crafted by skilled artisans.",
      highlights: [
        "Traditional Wood Carvings",
        "Handloom Textile Products",
        "Eco-friendly Materials",
        "Fair Trade Certified Artisans",
      ],
    },
    ceramics: {
      description:
        "Renowned for their unique designs and durability, Sri Lankan ceramics and pottery combine ancient techniques with contemporary styles for global markets.",
      highlights: [
        "High-Quality Clay Products",
        "Artistic Decorative Pieces",
        "Heat-Resistant Cookware",
        "Eco-Friendly Glazing Techniques",
      ],
    },
  };
  return (
    <div className="bg-[#ffffff] text-[#353535] w-full">
      {/* Animated Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#284b63]/10 to-[#3c6e71]/10 animate-pulse"></div>
          <div className="relative h-full w-full opacity-20">
            <img
              src={images.map}
              alt="World Map"
              className="object-cover w-full h-full"
            />
            {/* Animated connection points */}
            <div className="absolute inset-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-3 bg-[#284b63] rounded-full animate-ping`}
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className={`max-w-3xl transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#284b63] to-[#3c6e71] bg-clip-text text-transparent">
                Connecting
              </span>{" "}
              Sri Lankan Manufacturers and Exporters Globally
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Your trusted platform for international trade opportunities,
              market insights, and sustainable business growth
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="bg-[#284b63] hover:bg-[#1c3a4e] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Join ExportHaven <ChevronRight size={16} />
              </button>
              <button className="bg-transparent border-2 border-[#3c6e71] hover:border-[#284b63] px-6 py-3 rounded-lg font-medium transition-all hover:bg-[#3c6e71]/10">
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "Active Exporters",
                  value: stats.exporters.toLocaleString() + "+",
                },
                {
                  label: "Manufacturers",
                  value: stats.manufacturers.toLocaleString() + "+",
                },
                {
                  label: "Countries",
                  value: stats.countries.toLocaleString() + "+",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-[#284b63]">
                    {stat.value}
                  </h3>
                  <p className="text-[#353535]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Data Visualization Dashboard */}
      <section className="py-16 bg-[#d9d9d9]/20 animate-on-scroll">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#284b63]">
              Export Analytics Dashboard
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Comprehensive data insights to power your export decisions
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <DataStatsCard
              title="Total Export Volume"
              value="$4.2B"
              change="+8.5%"
              trend="up"
              description="Year-over-year growth"
              color="#284b63"
            />
            <DataStatsCard
              title="Active Markets"
              value="78"
              change="+12"
              trend="up"
              description="New markets in last 12 months"
              color="#3c6e71"
            />
            <DataStatsCard
              title="Average Deal Size"
              value="$840K"
              change="+15.2%"
              trend="up"
              description="Compared to previous quarter"
              color="#284b63"
            />
          </div>
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-6 border-b border-[#d9d9d9]">
              <button
                className={`px-4 py-2 font-medium transition-all ${
                  activeInsightTab === "trends"
                    ? "text-[#284b63] border-b-2 border-[#284b63]"
                    : "text-[#353535] hover:text-[#284b63]"
                }`}
                onClick={() => setActiveInsightTab("trends")}
              >
                Export Trends
              </button>
              <button
                className={`px-4 py-2 font-medium transition-all ${
                  activeInsightTab === "markets"
                    ? "text-[#284b63] border-b-2 border-[#284b63]"
                    : "text-[#353535] hover:text-[#284b63]"
                }`}
                onClick={() => setActiveInsightTab("markets")}
              >
                Market Distribution
              </button>
              <button
                className={`px-4 py-2 font-medium transition-all ${
                  activeInsightTab === "categories"
                    ? "text-[#284b63] border-b-2 border-[#284b63]"
                    : "text-[#353535] hover:text-[#284b63]"
                }`}
                onClick={() => setActiveInsightTab("categories")}
              >
                Category Comparison
              </button>
              <button
                className={`px-4 py-2 font-medium transition-all ${
                  activeInsightTab === "growth"
                    ? "text-[#284b63] border-b-2 border-[#284b63]"
                    : "text-[#353535] hover:text-[#284b63]"
                }`}
                onClick={() => setActiveInsightTab("growth")}
              >
                Growth Metrics
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
              {activeInsightTab === "trends" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#284b63]">
                    Monthly Export Trends (Last 12 Months)
                  </h3>
                  <div className="h-[400px]">
                    <ExportTrendsChart />
                  </div>
                </div>
              )}
              {activeInsightTab === "markets" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#284b63]">
                    Export Market Distribution
                  </h3>
                  <div className="h-[400px]">
                    <MarketDistributionChart />
                  </div>
                </div>
              )}
              {activeInsightTab === "categories" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#284b63]">
                    Top Export Categories ($ Millions)
                  </h3>
                  <div className="h-[400px]">
                    <CategoryComparisonChart />
                  </div>
                </div>
              )}
              {activeInsightTab === "growth" && (
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#284b63]">
                    Year-over-Year Growth by Quarter
                  </h3>
                  <div className="h-[400px]">
                    <ExportGrowthChart />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Export Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#284b63]">
              Explore Export Categories
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Discover Sri Lanka's diverse export offerings across multiple
              industries
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {exportCategories.map((category) => (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? "bg-[#284b63] text-white"
                    : "bg-white hover:bg-[#d9d9d9]/20"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                {category.name}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === category.id
                      ? "bg-white/20"
                      : "bg-[#d9d9d9]/20"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8">
            {activeCategory !== "all" ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={
                        exportCategories.find((c) => c.id === activeCategory)
                          ?.image
                      }
                      alt={activeCategory}
                      className="h-64 md:h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-1/2">
                    <div className="flex items-center gap-2 mb-2">
                      {
                        exportCategories.find((c) => c.id === activeCategory)
                          ?.icon
                      }
                      <h3 className="text-2xl font-bold text-[#284b63]">
                        {
                          exportCategories.find((c) => c.id === activeCategory)
                            ?.name
                        }
                      </h3>
                    </div>
                    <p className="mb-4 text-[#353535]">
                      {categoryInfo[activeCategory as keyof typeof categoryInfo]
                        ?.description ||
                        "Sri Lanka is renowned for its high-quality exports, with a rich heritage and modern production techniques ensuring premium products for global markets."}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 text-[#284b63]">
                        Key Highlights:
                      </h4>
                      <ul className="space-y-2">
                        {categoryInfo[
                          activeCategory as keyof typeof categoryInfo
                        ]?.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Sparkles className="text-[#3c6e71] w-5 h-5 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        )) || (
                          <>
                            <li className="flex items-center gap-2">
                              <Award size={16} className="text-[#3c6e71]" />{" "}
                              Premium Quality Standards
                            </li>
                            <li className="flex items-center gap-2">
                              <Users size={16} className="text-[#3c6e71]" />{" "}
                              {Math.floor(
                                exportCategories.find(
                                  (c) => c.id === activeCategory
                                )?.count! / 2
                              )}{" "}
                              Verified Producers
                            </li>
                            <li className="flex items-center gap-2">
                              <MapPin size={16} className="text-[#3c6e71]" />{" "}
                              Global Distribution Network
                            </li>
                            <li className="flex items-center gap-2">
                              <Ship size={16} className="text-[#3c6e71]" />{" "}
                              Efficient Logistics Solutions
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <button className="flex items-center gap-1 text-[#284b63] hover:text-[#3c6e71] font-medium transition-all">
                      Explore{" "}
                      {
                        exportCategories.find((c) => c.id === activeCategory)
                          ?.name
                      }{" "}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {exportCategories
                  .filter((c) => c.id !== "all")
                  .map((category) => (
                    <div
                      key={category.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          {category.icon}
                          <h4 className="font-bold text-lg text-[#284b63]">
                            {category.name}
                          </h4>
                        </div>
                        <p className="text-sm text-[#353535] mb-3">
                          {category.count} Businesses
                        </p>
                        <button className="flex items-center gap-1 text-[#284b63] hover:text-[#3c6e71] font-medium text-sm transition-all">
                          View Details <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Market Insights Section */}
      <section className="py-16 bg-[#d9d9d9]/20 animate-on-scroll">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#284b63]">
              Latest Market Insights
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Stay informed with real-time export market trends and
              opportunities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketInsights.map((insight, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl text-[#284b63]">
                    {insight.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      insight.trend === "up"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {insight.change}
                  </span>
                </div>
                <p className="mb-4 text-[#353535]">{insight.description}</p>
                <button className="flex items-center gap-1 text-[#284b63] hover:text-[#3c6e71] font-medium transition-all">
                  Full Analysis <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="bg-transparent border-2 border-[#3c6e71] hover:border-[#284b63] px-6 py-3 rounded-lg font-medium transition-all hover:bg-[#3c6e71]/10">
              View All Market Insights
            </button>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#284b63]">
              Why Choose ExportHaven?
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Comprehensive tools and services designed for export successlink
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#284b63]">
                  {feature.title}
                </h3>
                <p className="text-[#353535]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-16 bg-[#d9d9d9]/20 animate-on-scroll">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#284b63]">
              How It Works
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Three simple steps to global trade success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Create Profile",
                description:
                  "Set up your comprehensive business profile with detailed information about your products, capabilities, and certifications.",
              },
              {
                number: "02",
                title: "Connect",
                description:
                  "Find and connect with verified business partners using our AI-powered matching system to identify ideal opportunities.",
              },
              {
                number: "03",
                title: "Trade",
                description:
                  "Start trading with confidence, supported by our secure platform, market insights, and export resources.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 flex items-center justify-center text-4xl font-bold text-[#284b63]/10">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10 text-[#284b63]">
                  {step.title}
                </h3>
                <p className="text-[#353535] relative z-10">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Carousel */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#284b63]">
              What Our Users Say
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Success stories from Sri Lankan exporters and manufacturers
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={
                              i < testimonial.rating
                                ? "text-[#3c6e71] fill-[#3c6e71]"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-lg mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold text-[#284b63]">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-[#353535]">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial
                      ? "bg-[#284b63]"
                      : "bg-[#d9d9d9]"
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Success Metrics */}
      <section className="py-16 bg-[#3c6e71] text-white animate-on-scroll">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: "150%",
                label: "Average Export Growth",
              },
              {
                value: "$250M+",
                label: "Trade Volume Facilitated",
              },
              {
                value: "95%",
                label: "Partner Satisfaction Rate",
              },
              {
                value: "30+",
                label: "New Markets Accessed",
              },
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold mb-2">{metric.value}</h3>
                <p className="text-lg">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Enhanced CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d9d9d9] to-[#3c6e71] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#284b63]">
              Ready to Expand Your Global Reach?
            </h2>
            <p className="text-lg mb-8">
              Join thousands of successful Sri Lankan businesses on ExportHaven
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button className="bg-[#284b63] hover:bg-[#3c6e71] text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                Get Started Now
              </button>
              <button className="bg-white border border-[#284b63] text-[#284b63] hover:bg-[#3c6e71] hover:text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg">
                Schedule a Demo
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  icon: <Shield size={18} />,
                  text: "Secure Platform",
                },
                {
                  icon: <Users size={18} />,
                  text: "Verified Partners",
                },
                {
                  icon: <Globe size={18} />,
                  text: "Global Reach",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-[#284b63]">{feature.icon}</div>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
