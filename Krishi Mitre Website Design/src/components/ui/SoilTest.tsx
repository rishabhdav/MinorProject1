import { motion } from "motion/react";
import {
  ExternalLink,
  FlaskConical,
  Leaf,
  Droplets,
  TestTube2,
  CheckCircle,
  Shield,
  LucideIcon,
} from "lucide-react";

interface SoilTestProps {
  darkMode: boolean;
  language: "en" | "hi";
}

interface Nutrient {
  name: string;
  icon: LucideIcon;
  color: string;
}

export default function SoilTest({ darkMode, language }: SoilTestProps) {
  const content: Record<
    "en" | "hi",
    {
      title: string;
      subtitle: string;
      description: string;
      ctaButton: string;
      ctaSubtext: string;
      benefits: string;
      benefitsList: string[];
      process: string;
      steps: { title: string; desc: string }[];
      nutrients: string;
      nutrientsList: Nutrient[];
    }
  > = {
    en: {
      title: "🌱 Official Soil Health Testing",
      subtitle: "Get your soil tested with government-certified laboratories",
      description:
        "The Soil Health Card Scheme provides comprehensive soil testing services to help farmers make informed decisions about fertilizer usage and crop selection.",
      ctaButton: "Start Soil Test",
      ctaSubtext: "Redirects to soilhealth.dac.gov.in",
      benefits: "Benefits of Soil Testing",
      benefitsList: [
        "Know exact NPK levels in your soil",
        "Get customized fertilizer recommendations",
        "Improve crop yield and quality",
        "Reduce fertilizer costs",
        "Prevent soil degradation",
        "Make data-driven farming decisions",
      ],
      process: "Testing Process",
      steps: [
        { title: "Register Online", desc: "Create account on portal" },
        { title: "Collect Sample", desc: "Follow guidelines to collect soil" },
        { title: "Submit to Lab", desc: "Send to nearest testing center" },
        { title: "Get Results", desc: "Receive detailed soil report" },
      ],
      nutrients: "Key Nutrients Tested",
      nutrientsList: [
        { name: "Nitrogen (N)", icon: Leaf, color: "#2ECC71" },
        { name: "Phosphorus (P)", icon: TestTube2, color: "#F1C40F" },
        { name: "Potassium (K)", icon: FlaskConical, color: "#FF7043" },
        { name: "pH Level", icon: Droplets, color: "#3498DB" },
        { name: "Organic Carbon", icon: Leaf, color: "#27AE60" },
        { name: "Micronutrients", icon: FlaskConical, color: "#9B59B6" },
      ],
    },

    hi: {
      title: "🌱 आधिकारिक मिट्टी स्वास्थ्य परीक्षण",
      subtitle: "सरकार द्वारा प्रमाणित प्रयोगशालाओं से अपनी मिट्टी का परीक्षण करवाएं",
      description:
        "मृदा स्वास्थ्य कार्ड योजना किसानों को उर्वरक उपयोग और फसल चयन के बारे में सूचित निर्णय लेने में मदद करने के लिए व्यापक मिट्टी परीक्षण सेवाएं प्रदान करती है।",
      ctaButton: "मिट्टी परीक्षण शुरू करें",
      ctaSubtext: "soilhealth.dac.gov.in पर रीडायरेक्ट करता है",
      benefits: "मिट्टी परीक्षण के लाभ",
      benefitsList: [
        "अपनी मिट्टी में सटीक NPK स्तर जानें",
        "अनुकूलित उर्वरक सिफारिशें प्राप्त करें",
        "फसल की उपज और गुणवत्ता में सुधार करें",
        "उर्वरक लागत कम करें",
        "मिट्टी के क्षरण को रोकें",
        "डेटा-संचालित खेती के निर्णय लें",
      ],
      process: "परीक्षण प्रक्रिया",
      steps: [
        { title: "ऑनलाइन पंजीकरण", desc: "पोर्टल पर खाता बनाएं" },
        { title: "नमूना एकत्र करें", desc: "मिट्टी एकत्र करने के लिए दिशानिर्देशों का पालन करें" },
        { title: "प्रयोगशाला में जमा करें", desc: "निकटतम परीक्षण केंद्र में भेजें" },
        { title: "परिणाम प्राप्त करें", desc: "विस्तृत मिट्टी रिपोर्ट प्राप्त करें" },
      ],
      nutrients: "प्रमुख परीक्षित पोषक तत्व",
      nutrientsList: [
        { name: "नाइट्रोजन (N)", icon: Leaf, color: "#2ECC71" },
        { name: "फास्फोरस (P)", icon: TestTube2, color: "#F1C40F" },
        { name: "पोटेशियम (K)", icon: FlaskConical, color: "#FF7043" },
        { name: "पीएच स्तर", icon: Droplets, color: "#3498DB" },
        { name: "कार्बनिक कार्बन", icon: Leaf, color: "#27AE60" },
        { name: "सूक्ष्म पोषक तत्व", icon: FlaskConical, color: "#9B59B6" },
      ],
    },
  };

  const t = content[language];

  const handleRedirect = () => {
    window.open("https://soilhealth.dac.gov.in/", "_blank");
  };

  return (
    <section
      className={`min-h-screen py-24 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-b from-white via-[#F8F9FA] to-[#2ECC71]/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className={`mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {t.title}
          </h2>

          <p
            className={`max-w-3xl mx-auto mb-8 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t.subtitle}
          </p>

          {/* CTA button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(46, 204, 113, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRedirect}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white rounded-2xl shadow-2xl relative overflow-hidden group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -right-4 -top-4 w-24 h-24 border-4 border-white/20 rounded-full"
            />
            <Shield className="w-6 h-6" />
            <span className="text-xl font-semibold">{t.ctaButton}</span>
            <ExternalLink className="w-5 h-5" />
          </motion.button>

          <p className="mt-3 text-sm text-gray-500">{t.ctaSubtext}</p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-16 p-8 rounded-2xl ${
            darkMode
              ? "bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/20 border border-[#2ECC71]/30"
              : "bg-gradient-to-r from-[#2ECC71]/10 to-[#F1C40F]/10 border border-[#2ECC71]/20"
          }`}
        >
          <p
            className={`text-lg text-center ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t.description}
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className={`text-center mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {t.benefits}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.benefitsList.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-800" : "bg-white shadow-lg"
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#2ECC71] flex-shrink-0 mt-1" />
                  <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                    {benefit}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className={`text-center mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {t.process}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div
                  className={`p-6 rounded-xl text-center ${
                    darkMode ? "bg-gray-800" : "bg-white shadow-lg"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  >
                    {index + 1}
                  </motion.div>

                  <h4 className={`${darkMode ? "text-white" : "text-gray-900"} mb-2`}>
                    {step.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>

                {index < t.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#2ECC71] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nutrients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={`text-center mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {t.nutrients}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.nutrientsList.map((nutrient, index) => {
              const Icon = nutrient.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-xl text-center ${
                    darkMode ? "bg-gray-800" : "bg-white shadow-lg"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${nutrient.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: nutrient.color }} />
                  </motion.div>

                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {nutrient.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
