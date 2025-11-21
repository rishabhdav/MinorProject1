import { motion } from 'motion/react';
import { Play, Scan, RefreshCw, CloudRain, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface TutorialsProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function Tutorials({ darkMode, language }: TutorialsProps) {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const content = {
    en: {
      title: '📚 Video Tutorials',
      subtitle: 'Learn how to use Krishi Mitra features step by step',
      tutorials: [
        {
          id: 1,
          title: 'Crop Disease Detection Guide',
          icon: Scan,
          duration: '3:45',
          steps: [
            'Open Disease Detection tool',
            'Upload or capture crop image',
            'Wait for AI analysis',
            'Review results and treatment',
          ],
        },
        {
          id: 2,
          title: 'Crop Rotation Recommendations',
          icon: RefreshCw,
          duration: '4:20',
          steps: [
            'Navigate to Crop Rotation',
            'Enter current crop details',
            'Select soil type and location',
            'Get personalized recommendations',
          ],
        },
        {
          id: 3,
          title: 'Weather Forecasting Tool',
          icon: CloudRain,
          duration: '2:50',
          steps: [
            'Access Weather Prediction',
            'Enter your farm location',
            'View 7-day forecast',
            'Plan farming activities',
          ],
        },
      ],
    },
    hi: {
      title: '📚 वीडियो ट्यूटोरियल',
      subtitle: 'कृषि मित्र की विशेषताओं का उपयोग करना सीखें',
      tutorials: [
        {
          id: 1,
          title: 'फसल रोग पहचान गाइड',
          icon: Scan,
          duration: '3:45',
          steps: [
            'रोग पहचान उपकरण खोलें',
            'फसल की तस्वीर अपलोड करें',
            'एआई विश्लेषण की प्रतीक्षा करें',
            'परिणाम और उपचार देखें',
          ],
        },
        {
          id: 2,
          title: 'फसल चक्र सिफारिशें',
          icon: RefreshCw,
          duration: '4:20',
          steps: [
            'फसल चक्र पर जाएं',
            'वर्तमान फसल विवरण दर्ज करें',
            'मिट्टी का प्रकार और स्थान चुनें',
            'व्यक्तिगत सिफारिशें प्राप्त करें',
          ],
        },
        {
          id: 3,
          title: 'मौसम पूर्वानुमान उपकरण',
          icon: CloudRain,
          duration: '2:50',
          steps: [
            'मौसम भविष्यवाणी तक पहुंचें',
            'अपनी खेत का स्थान दर्ज करें',
            '7-दिन का पूर्वानुमान देखें',
            'खेती की गतिविधियों की योजना बनाएं',
          ],
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className={`min-h-screen py-24 ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-white via-[#F8F9FA] to-[#2ECC71]/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
          {t.tutorials.map((tutorial, index) => {
            const Icon = tutorial.icon;
            const isActive = activeVideo === tutorial.id;

            return (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`rounded-2xl overflow-hidden ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-xl`}
              >
                {/* Video Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] overflow-hidden group cursor-pointer"
                  onClick={() => setActiveVideo(isActive ? null : tutorial.id)}
                >
                  {/* Icon Background */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-24 h-24 text-white/20" />
                  </div>

                  {/* Play Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-[#2ECC71] ml-1" />
                    </div>
                  </motion.div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white">
                    {tutorial.duration}
                  </div>

                  {/* Animated Border on Hover */}
                  <motion.div
                    className="absolute inset-0 border-4 border-[#F1C40F] opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={isActive ? { opacity: 1 } : {}}
                  />
                </div>

                {/* Tutorial Content */}
                <div className="p-6">
                  <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {tutorial.title}
                  </h3>

                  {/* Steps */}
                  <div className="space-y-3">
                    {tutorial.steps.map((step, stepIndex) => (
                      <motion.div
                        key={stepIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * stepIndex }}
                        className="flex items-start gap-3"
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-[#2ECC71]/20' : 'bg-[#2ECC71]/10'
                        }`}>
                          <span className="text-[#2ECC71]">{stepIndex + 1}</span>
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {step}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveVideo(isActive ? null : tutorial.id)}
                    className={`w-full mt-6 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white'
                        : darkMode
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {isActive 
                      ? (language === 'en' ? 'Playing...' : 'चल रहा है...')
                      : (language === 'en' ? 'Watch Tutorial' : 'ट्यूटोरियल देखें')
                    }
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-16 p-8 rounded-2xl ${
            darkMode 
              ? 'bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/20 border border-[#2ECC71]/30' 
              : 'bg-gradient-to-r from-[#2ECC71]/10 to-[#F1C40F]/10 border border-[#2ECC71]/20'
          }`}
        >
          <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? '✨ Pro Tips' : '✨ प्रो टिप्स'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              language === 'en' 
                ? 'Take photos in natural daylight for better disease detection accuracy'
                : 'बेहतर रोग पहचान के लिए प्राकृतिक दिन के उजाले में फोटो लें',
              language === 'en'
                ? 'Update your location regularly for accurate weather predictions'
                : 'सटीक मौसम भविष्यवाणी के लिए नियमित रूप से अपना स्थान अपडेट करें',
              language === 'en'
                ? 'Follow crop rotation recommendations to improve soil health'
                : 'मिट्टी के स्वास्थ्य में सुधार के लिए फसल चक्र सिफारिशों का पालन करें',
              language === 'en'
                ? 'Enable notifications to get timely weather alerts'
                : 'समय पर मौसम अलर्ट प्राप्त करने के लिए सूचनाएं सक्षम करें',
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-[#2ECC71] flex-shrink-0 mt-1" />
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {tip}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
