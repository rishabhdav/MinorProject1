import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Leaf, CloudRain, Settings, Users } from 'lucide-react';
import { useState } from 'react';

interface FAQProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function FAQ({ darkMode, language }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const content = {
    en: {
      title: '❓ Frequently Asked Questions',
      subtitle: 'Find answers to common questions about Krishi Mitra',
      categories: [
        {
          name: 'Crops & Disease',
          icon: Leaf,
          color: '#2ECC71',
          faqs: [
            {
              q: 'How accurate is the crop disease detection?',
              a: 'Our AI model has been trained on over 100,000 crop images and achieves 98% accuracy in detecting common crop diseases including blight, rust, and mildew.',
            },
            {
              q: 'What crops are supported for disease detection?',
              a: 'We currently support disease detection for wheat, rice, corn, cotton, sugarcane, potato, tomato, and many other major crops. The system is continuously being updated with new crops.',
            },
            {
              q: 'Can I use the app offline?',
              a: 'Limited offline functionality is available for previously downloaded data. However, real-time disease detection and weather forecasting require an internet connection.',
            },
          ],
        },
        {
          name: 'Weather & Forecasts',
          icon: CloudRain,
          color: '#3498DB',
          faqs: [
            {
              q: 'How far ahead can I see weather predictions?',
              a: 'Weather forecasts are available for up to 14 days in advance, with hourly predictions for the next 48 hours.',
            },
            {
              q: 'Are weather alerts available?',
              a: 'Yes! You can enable push notifications to receive alerts for extreme weather conditions, rainfall, and temperature changes that may affect your crops.',
            },
          ],
        },
        {
          name: 'Technical Support',
          icon: Settings,
          color: '#9B59B6',
          faqs: [
            {
              q: 'What image formats are supported for upload?',
              a: 'You can upload images in JPG, PNG, and WebP formats. For best results, ensure images are clear and well-lit.',
            },
            {
              q: 'How do I reset my password?',
              a: 'Click on "Forgot Password" on the login page, enter your registered email, and follow the instructions sent to your inbox.',
            },
            {
              q: 'Is my farming data secure?',
              a: 'Yes, all data is encrypted and stored securely. We follow industry-standard security practices and never share your data with third parties without consent.',
            },
          ],
        },
        {
          name: 'Account & Billing',
          icon: Users,
          color: '#E74C3C',
          faqs: [
            {
              q: 'Is Krishi Mitra free to use?',
              a: 'Basic features are completely free. Premium features including advanced analytics and priority support are available with our subscription plans.',
            },
            {
              q: 'Can I use one account on multiple devices?',
              a: 'Yes, you can access your account from any device with your login credentials. Your data syncs automatically across all devices.',
            },
          ],
        },
      ],
    },
    hi: {
      title: '❓ अक्सर पूछे जाने वाले प्रश्न',
      subtitle: 'कृषि मित्र के बारे में सामान्य प्रश्नों के उत्तर खोजें',
      categories: [
        {
          name: 'फसलें और रोग',
          icon: Leaf,
          color: '#2ECC71',
          faqs: [
            {
              q: 'फसल रोग पहचान कितनी सटीक है?',
              a: 'हमारे एआई मॉडल को 100,000 से अधिक फसल छवियों पर प्रशिक्षित किया गया है और यह सामान्य फसल रोगों का पता लगाने में 98% सटीकता प्राप्त करता है।',
            },
            {
              q: 'रोग पहचान के लिए कौन सी फसलें समर्थित हैं?',
              a: 'हम वर्तमान में गेहूं, चावल, मक्का, कपास, गन्ना, आलू, टमाटर और कई अन्य प्रमुख फसलों के लिए रोग पहचान का समर्थन करते हैं।',
            },
            {
              q: 'क्या मैं ऐप को ऑफ़लाइन उपयोग कर सकता हूं?',
              a: 'पहले डाउनलोड किए गए डेटा के लिए सीमित ऑफ़लाइन कार्यक्षमता उपलब्ध है। हालांकि, रीयल-टाइम रोग पहचान और मौसम पूर्वानुमान के लिए इंटरनेट कनेक्शन की आवश्यकता होती है।',
            },
          ],
        },
        {
          name: 'मौसम और पूर्वानुमान',
          icon: CloudRain,
          color: '#3498DB',
          faqs: [
            {
              q: 'मैं कितने दिन आगे का मौसम देख सकता हूं?',
              a: 'मौसम पूर्वानुमान 14 दिनों तक उपलब्ध हैं, अगले 48 घंटों के लिए प्रति घंटा भविष्यवाणी के साथ।',
            },
            {
              q: 'क्या मौसम अलर्ट उपलब्ध हैं?',
              a: 'हां! आप चरम मौसम की स्थिति, बारिश और तापमान परिवर्तन के लिए अलर्ट प्राप्त करने के लिए पुश नोटिफिकेशन सक्षम कर सकते हैं।',
            },
          ],
        },
        {
          name: 'तकनीकी सहायता',
          icon: Settings,
          color: '#9B59B6',
          faqs: [
            {
              q: 'अपलोड के लिए कौन से इमेज फॉर्मेट समर्थित हैं?',
              a: 'आप JPG, PNG और WebP फॉर्मेट में छवियां अपलोड कर सकते हैं। सर्वोत्तम परिणामों के लिए, सुनिश्चित करें कि छवियां स्पष्ट और अच्छी तरह से प्रकाशित हैं।',
            },
            {
              q: 'मैं अपना पासवर्ड कैसे रीसेट करूं?',
              a: 'लॉगिन पेज पर "पासवर्ड भूल गए" पर क्लिक करें, अपना पंजीकृत ईमेल दर्ज करें, और अपने इनबॉक्स में भेजे गए निर्देशों का पालन करें।',
            },
            {
              q: 'क्या मेरा खेती का डेटा सुरक्षित है?',
              a: 'हां, सभी डेटा एन्क्रिप्टेड और सुरक्षित रूप से संग्रहीत है। हम उद्योग-मानक सुरक्षा प्रथाओं का पालन करते हैं।',
            },
          ],
        },
        {
          name: 'खाता और बिलिंग',
          icon: Users,
          color: '#E74C3C',
          faqs: [
            {
              q: 'क्या कृषि मित्र उपयोग करने के लिए मुफ्त है?',
              a: 'बुनियादी सुविधाएं पूरी तरह से मुफ्त हैं। उन्नत विश्लेषण और प्राथमिकता समर्थन सहित प्रीमियम सुविधाएं हमारी सदस्यता योजनाओं के साथ उपलब्ध हैं।',
            },
            {
              q: 'क्या मैं एक खाते का उपयोग कई उपकरणों पर कर सकता हूं?',
              a: 'हां, आप अपने लॉगिन क्रेडेंशियल के साथ किसी भी डिवाइस से अपने खाते तक पहुंच सकते हैं।',
            },
          ],
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className={`min-h-screen py-24 ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
        : 'bg-gradient-to-b from-[#2ECC71]/5 to-white'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="space-y-8">
          {t.categories.map((category, categoryIndex) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <h3 className={darkMode ? 'text-white' : 'text-gray-900'}>
                    {category.name}
                  </h3>
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => {
                    const itemIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openIndex === itemIndex;

                    return (
                      <motion.div
                        key={itemIndex}
                        whileHover={{ scale: 1.01 }}
                        className={`rounded-xl overflow-hidden ${
                          darkMode ? 'bg-gray-800' : 'bg-white'
                        } shadow-lg transition-all`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : itemIndex)}
                          className={`w-full p-6 flex items-center justify-between text-left ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          } transition-colors`}
                        >
                          <span className={`pr-8 ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {faq.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown 
                              className="w-5 h-5 flex-shrink-0"
                              style={{ color: category.color }}
                            />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className={`p-6 pt-0 ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-16 p-8 rounded-2xl text-center ${
            darkMode 
              ? 'bg-gradient-to-r from-[#2ECC71]/20 to-[#F1C40F]/20 border border-[#2ECC71]/30' 
              : 'bg-gradient-to-r from-[#2ECC71]/10 to-[#F1C40F]/10'
          }`}
        >
          <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {language === 'en' ? "Still have questions?" : "अभी भी सवाल हैं?"}
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'en' 
              ? "Our support team is here to help you 24/7"
              : "हमारी सहायता टीम 24/7 आपकी मदद के लिए यहां है"
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(46, 204, 113, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white rounded-lg"
          >
            {language === 'en' ? 'Contact Support' : 'सहायता से संपर्क करें'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
