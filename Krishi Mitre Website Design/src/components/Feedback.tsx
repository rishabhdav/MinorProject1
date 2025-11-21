import { motion, AnimatePresence } from 'motion/react';
import { Star, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FeedbackProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function Feedback({ darkMode, language }: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedUserName, setSubmittedUserName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const content = {
    en: {
      title: '💬 Share Your Feedback',
      subtitle: 'Help us improve Krishi Mitra with your valuable insights',
      ratingLabel: 'How would you rate your experience?',
      nameLabel: 'Your Name',
      emailLabel: 'Email Address',
      categoryLabel: 'Feedback Category',
      messageLabel: 'Your Feedback',
      submitButton: 'Submit Feedback',
      successTitle: 'Thank You!',
      successMessage: 'Your feedback has been successfully submitted. We appreciate your input!',
      newFeedback: 'Submit Another Feedback',
      categories: [
        'General Feedback',
        'Feature Request',
        'Bug Report',
        'User Experience',
        'Performance',
        'Other',
      ],
      namePlaceholder: 'Enter your name',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'Share your thoughts, suggestions, or report issues...',
      ratingResponses: {
        1: {
          title: 'We Hear You 😞',
          message: 'Thank you for your feedback! We understand you\'re facing challenges. Our team will review your feedback carefully and work on improvements. We\'d love to make things better for you!',
          emoji: '😞',
          color: 'from-red-500 to-red-600',
        },
        2: {
          title: 'Thank You for Being Honest 😕',
          message: 'Your honest feedback is invaluable to us. We appreciate you taking the time to share your concerns. Our team will prioritize addressing these issues to enhance your experience.',
          emoji: '😕',
          color: 'from-orange-500 to-orange-600',
        },
        3: {
          title: 'We\'re Glad You Enjoyed It 😊',
          message: 'Thank you for the positive feedback! We\'re pleased that Krishi Mitre is providing value to you. We\'ll continue working on making it even better!',
          emoji: '😊',
          color: 'from-yellow-500 to-yellow-600',
        },
        4: {
          title: 'Awesome! So Happy! 😄',
          message: 'We\'re thrilled that you\'re loving Krishi Mitre! Your positive feedback motivates us to keep innovating and improving. Thank you for being part of our journey!',
          emoji: '😄',
          color: 'from-lime-500 to-lime-600',
        },
        5: {
          title: 'Amazing! You Rock! 🎉',
          message: 'Wow! Thank you so much for the 5-star feedback! We\'re honored that Krishi Mitre exceeded your expectations. Your support means the world to us. Let\'s keep farming smarter together!',
          emoji: '🎉',
          color: 'from-green-500 to-green-600',
        },
      },
    },
    hi: {
      title: '💬 अपनी प्रतिक्रिया साझा करें',
      subtitle: 'अपनी मूल्यवान अंतर्दृष्टि के साथ कृषि मित्र को बेहतर बनाने में हमारी मदद करें',
      ratingLabel: 'आप अपने अनुभव को कैसे रेट करेंगे?',
      nameLabel: 'आपका नाम',
      emailLabel: 'ईमेल पता',
      categoryLabel: 'प्रतिक्रिया श्रेणी',
      messageLabel: 'आपकी प्रतिक्रिया',
      submitButton: 'प्रतिक्रिया सबमिट करें',
      successTitle: 'धन्यवाद!',
      successMessage: 'आपकी प्रतिक्रिया सफलतापूर्वक सबमिट कर दी गई है। हम आपके इनपुट की सराहना करते हैं!',
      newFeedback: 'एक और प्रतिक्रिया सबमिट करें',
      categories: [
        'सामान्य प्रतिक्रिया',
        'फीचर अनुरोध',
        'बग रिपोर्ट',
        'उपयोगकर्ता अनुभव',
        'प्रदर्शन',
        'अन्य',
      ],
      namePlaceholder: 'अपना नाम दर्ज करें',
      emailPlaceholder: 'your@email.com',
      messagePlaceholder: 'अपने विचार, सुझाव साझा करें या समस्याओं की रिपोर्ट करें...',
      ratingResponses: {
        1: {
          title: 'हम आपकी बात सुन रहे हैं 😞',
          message: 'आपकी प्रतिक्रिया के लिए धन्यवाद! हम समझते हैं कि आप चुनौतियों का सामना कर रहे हैं। हमारी टीम आपकी प्रतिक्रिया की सावधानी से समीक्षा करेगी और सुधार पर काम करेगी।',
          emoji: '😞',
          color: 'from-red-500 to-red-600',
        },
        2: {
          title: 'ईमानदार प्रतिक्रिया के लिए धन्यवाद 😕',
          message: 'आपकी ईमानदार प्रतिक्रिया हमारे लिए अमूल्य है। हम आपके समय और चिंताओं को साझा करने की सराहना करते हैं। हमारी टीम इन मुद्दों को ठीक करने पर काम करेगी।',
          emoji: '😕',
          color: 'from-orange-500 to-orange-600',
        },
        3: {
          title: 'हम खुश हैं कि आपने इसका आनंद लिया 😊',
          message: 'सकारात्मक प्रतिक्रिया के लिए धन्यवाद! हम प्रसन्न हैं कि कृषि मित्र आपको मूल्य दे रहा है। हम इसे और भी बेहतर बनाने पर काम करते रहेंगे!',
          emoji: '😊',
          color: 'from-yellow-500 to-yellow-600',
        },
        4: {
          title: 'शानदार! बहुत खुश! 😄',
          message: 'हम बहुत खुश हैं कि आप कृषि मित्र से प्यार कर रहे हैं! आपकी सकारात्मक प्रतिक्रिया हमें नवाचार करने के लिए प्रेरित करती है। आपके समर्थन के लिए धन्यवाद!',
          emoji: '😄',
          color: 'from-lime-500 to-lime-600',
        },
        5: {
          title: 'शानदार! आप बहुत अच्छे हो! 🎉',
          message: 'वाह! 5-स्टार प्रतिक्रिया के लिए बहुत धन्यवाद! हम सम्मानित हैं कि कृषि मित्र आपकी उम्मीदों से अधिक है। आप हमारी यात्रा का हिस्सा होने के लिए धन्य हैं!',
          emoji: '🎉',
          color: 'from-green-500 to-green-600',
        },
      },
    },
  };

  const t = content[language];

  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'http://localhost:8080/api';

  const getRatingMessage = (stars: number, lang: 'en' | 'hi') => {
    const messages = {
      en: {
        1: '😞 We\'re sorry to hear that. Your feedback helps us improve!',
        2: '😕 Thank you for your honest feedback. We\'ll work on improvements!',
        3: '😊 Thanks for the feedback! We\'re glad you\'re finding value.',
        4: '😄 Great! We\'re happy you\'re enjoying Krishi Mitre!',
        5: '🎉 Amazing! We\'re thrilled you love Krishi Mitre!',
      },
      hi: {
        1: '😞 हमें खेद है यह सुनकर। आपकी प्रतिक्रिया हमें सुधारने में मदद करती है!',
        2: '😕 आपकी ईमानदार प्रतिक्रिया के लिए धन्यवाद। हम सुधार पर काम करेंगे!',
        3: '😊 प्रतिक्रिया के लिए धन्यवाद! हम खुश हैं कि आपको मूल्य मिल रहा है।',
        4: '😄 बढ़िया! हमें खुशी है कि आप कृषि मित्र का आनंद ले रहे हैं!',
        5: '🎉 शानदार! हमें खुशी है कि आप कृषि मित्र को पसंद करते हैं!',
      },
    };
    return messages[lang][stars as keyof typeof messages['en']] || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error(language === 'en' ? 'Please select a rating' : 'कृपया एक रेटिंग चुनें');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          rating: rating,
          category: formData.category,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API Error:', data);
        throw new Error(data?.message || 'Failed to submit feedback');
      }

      console.log('Feedback submitted successfully:', data);

      // Fetch user info to get the name
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userResponse = await fetch(`${API_BASE}/farmer/profile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            const userName = userData?.data?.name || userData?.user?.name || formData.name;
            setSubmittedUserName(userName);
          } else {
            setSubmittedUserName(formData.name);
          }
        } catch (err) {
          console.log('Could not fetch user profile, using form name');
          setSubmittedUserName(formData.name);
        }
      } else {
        setSubmittedUserName(formData.name);
      }

      // Show star-based notification
      const ratingMessage = getRatingMessage(rating, language);
      toast.success(ratingMessage);

      // Show success screen
      setSubmitted(true);
      setIsLoading(false);
      
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error?.message || (language === 'en' ? 'Error submitting feedback' : 'प्रतिक्रिया सबमिट करने में त्रुटि'));
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedUserName('');
    setFormData({ name: '', email: '', category: '', message: '' });
    setRating(0);
  };

  return (
    <section className={`min-h-screen py-24 ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-white to-[#F1C40F]/10'
    } relative`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {t.subtitle}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-8 relative z-10 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-2xl`}
            >
              <form onSubmit={handleSubmit}>
                {/* Rating Stars */}
                <div className="mb-8 text-center">
                  <label className={`block mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t.ratingLabel}
                  </label>
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-10 h-10 transition-all ${
                            star <= (hoveredRating || rating)
                              ? 'fill-[#F1C40F] text-[#F1C40F]'
                              : darkMode
                              ? 'text-gray-600'
                              : 'text-gray-300'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div>
                    <label className={`block mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t.nameLabel} *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className={`w-full px-4 py-3 rounded-lg border transition-all ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-[#2ECC71]'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#2ECC71]'
                      } focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/20`}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className={`block mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t.emailLabel} *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.emailPlaceholder}
                      className={`w-full px-4 py-3 rounded-lg border transition-all ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-[#2ECC71]'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#2ECC71]'
                      } focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/20`}
                    />
                  </div>
                </div>

                {/* Category Field */}
                <div className="mb-6">
                  <label className={`block mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.categoryLabel} *
                  </label>
                  <select
                    aria-label={t.categoryLabel}
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border transition-all ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-[#2ECC71]'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-[#2ECC71]'
                    } focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/20`}
                  >
                    <option value="">Select category</option>
                    {t.categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Message Field */}
                <div className="mb-6">
                  <label className={`block mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t.messageLabel} *
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.messagePlaceholder}
                    className={`w-full px-4 py-3 rounded-lg border transition-all resize-none ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-[#2ECC71]'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#2ECC71]'
                    } focus:outline-none focus:ring-2 focus:ring-[#2ECC71]/20`}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(46, 204, 113, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white rounded-lg flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{language === 'en' ? 'Submitting...' : 'सबमिट हो रहा है...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t.submitButton}</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
              className={`rounded-3xl p-16 text-center shadow-2xl relative z-50 border-2 ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600' 
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
              }`}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                className="inline-block mb-8"
              >
                <div className={`w-28 h-28 bg-gradient-to-br ${(content as any)[language].ratingResponses[rating].color} rounded-full flex items-center justify-center text-6xl shadow-2xl`}>
                  {(content as any)[language].ratingResponses[rating].emoji}
                </div>
              </motion.div>

              <h3 className={`mb-4 text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {(content as any)[language].ratingResponses[rating].title}
              </h3>
              
              {/* Personalized greeting with user name */}
              {submittedUserName && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`mb-6 text-2xl font-semibold ${darkMode ? 'text-[#2ECC71]' : 'text-[#27AE60]'}`}
                >
                  {language === 'en' ? `Thank you, ${submittedUserName}!` : `धन्यवाद, ${submittedUserName}!`}
                </motion.div>
              )}

              <p className={`mb-10 text-xl leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {(content as any)[language].ratingResponses[rating].message}
              </p>

              {/* Star Rating Display */}
              <div className="flex items-center justify-center gap-4 mb-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + star * 0.1 }}
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= rating
                          ? 'fill-[#F1C40F] text-[#F1C40F] drop-shadow-lg'
                          : darkMode
                          ? 'text-gray-600'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(46, 204, 113, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className={`px-10 py-4 rounded-xl font-bold text-lg transition-all ${
                  darkMode
                    ? 'bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white hover:shadow-2xl'
                    : 'bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white hover:shadow-2xl'
                }`}
              >
                {t.newFeedback}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { value: '10K+', label: language === 'en' ? 'Feedback Received' : 'प्रतिक्रिया प्राप्त' },
            { value: '95%', label: language === 'en' ? 'Satisfaction Rate' : 'संतुष्टि दर' },
            { value: '24h', label: language === 'en' ? 'Avg Response Time' : 'औसत प्रतिक्रिया समय' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-xl text-center ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}
            >
              <div className="text-[#2ECC71] mb-2">{stat.value}</div>
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
