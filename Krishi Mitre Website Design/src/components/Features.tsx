import { motion } from 'motion/react';
import { Scan, RefreshCw, CloudRain } from 'lucide-react';

interface FeaturesProps {
  setActiveSection: (section: string) => void;
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function Features({ setActiveSection, darkMode, language }: FeaturesProps) {
  const content = {
    en: {
      title: '🌟 What Krishi Mitra Offers',
      subtitle: 'Three powerful AI tools to revolutionize your farming experience',
      features: [
        {
          id: 'disease',
          icon: Scan,
          title: 'Crop Disease Detection',
          description: 'Upload a photo of your crop and detect diseases instantly using AI.',
          gradient: 'from-[#2ECC71] to-[#27AE60]',
          image: 'https://images.unsplash.com/photo-1662453661411-989a39f64734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY3JvcCUyMGxlYXZlc3xlbnwxfHx8fDE3NjI1OTc3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 'rotation',
          icon: RefreshCw,
          title: 'Crop Rotation Advisor',
          description: 'Find the best next crop for your soil and climate.',
          gradient: 'from-[#F1C40F] to-[#FF7043]',
          image: 'https://images.unsplash.com/photo-1703850827351-a1be4d85a095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBmYXJtbGFuZHxlbnwxfHx8fDE3NjI1OTc3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 'weather',
          icon: CloudRain,
          title: 'Weather Predictor',
          description: 'Stay ahead of the weather with live forecasts.',
          gradient: 'from-[#3498DB] to-[#2ECC71]',
          image: 'https://images.unsplash.com/photo-1615943656632-2761a7bea12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBzdW5ueSUyMHdlYXRoZXJ8ZW58MXx8fHwxNzYyNTk3Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
    hi: {
      title: '🌟 कृषि मित्र क्या प्रदान करता है',
      subtitle: 'आपके खेती के अनुभव में क्रांति लाने के लिए तीन शक्तिशाली एआई उपकरण',
      features: [
        {
          id: 'disease',
          icon: Scan,
          title: 'फसल रोग पहचान',
          description: 'अपनी फसल की तस्वीर अपलोड करें और एआई का उपयोग करके रोगों का तुरंत पता लगाएं।',
          gradient: 'from-[#2ECC71] to-[#27AE60]',
          image: 'https://images.unsplash.com/photo-1662453661411-989a39f64734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwY3JvcCUyMGxlYXZlc3xlbnwxfHx8fDE3NjI1OTc3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 'rotation',
          icon: RefreshCw,
          title: 'फसल चक्र सलाहकार',
          description: 'अपनी मिट्टी और जलवायु के लिए सबसे अच्छी अगली फसल खोजें।',
          gradient: 'from-[#F1C40F] to-[#FF7043]',
          image: 'https://images.unsplash.com/photo-1703850827351-a1be4d85a095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBmYXJtbGFuZHxlbnwxfHx8fDE3NjI1OTc3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 'weather',
          icon: CloudRain,
          title: 'मौसम भविष्यवक्ता',
          description: 'लाइव पूर्वानुमानों के साथ मौसम से आगे रहें।',
          gradient: 'from-[#3498DB] to-[#2ECC71]',
          image: 'https://images.unsplash.com/photo-1615943656632-2761a7bea12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBzdW5ueSUyMHdlYXRoZXJ8ZW58MXx8fHwxNzYyNTk3Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white via-[#F8F9FA] to-[#2ECC71]/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setActiveSection(feature.id)}
                className="group cursor-pointer"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Image Background */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-90 z-10`} />
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Icon */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-4 bg-white/20 backdrop-blur-sm rounded-full"
                      >
                        <Icon className="w-12 h-12 text-white" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {feature.description}
                    </p>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className={`mt-4 flex items-center gap-2 ${
                        darkMode ? 'text-green-400' : 'text-green-600'
                      } group-hover:gap-3 transition-all`}
                    >
                      Try it now
                      <span>→</span>
                    </motion.button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${feature.gradient} blur-xl -z-10`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
