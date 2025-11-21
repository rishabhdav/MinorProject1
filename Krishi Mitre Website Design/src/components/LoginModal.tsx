import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Phone, MapPin, Leaf, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  darkMode: boolean;
  language: 'en' | 'hi';
  onAuthSuccess?: (data: { token: string; user?: any }) => void;
}

const FormInput = ({ icon: Icon, label, type = 'text', name, placeholder, required = false, value, onChange, darkMode, info, error }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative group"
  >
    <label className={`block mb-1.5 text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 ${darkMode ? 'text-green-400/70' : 'text-green-600/70'} group-focus-within:text-green-500 group-focus-within:scale-110 transition-all duration-300`} />
      )}
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={label}
        className={`w-full ${Icon ? 'pl-10' : 'px-3'} pr-3 py-2 text-xs font-medium rounded-lg border-2 transition-all duration-300 backdrop-blur-sm shadow-sm
          ${darkMode
            ? 'bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:bg-gray-800 focus:ring-2 focus:ring-green-500/30 focus:shadow-lg focus:shadow-green-500/20'
            : 'bg-white/90 border-gray-300/80 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/30 focus:shadow-lg focus:shadow-green-500/20'
          }
        `}
      />
    </div>
      {error && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          {error}
        </p>
      )}
  </motion.div>
);

export default function LoginModal({ show, onClose, darkMode, language, onAuthSuccess }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    phoneNumber: '',
    farmSize: '',
    joinedDate: '',
  });

  const content = {
    en: {
      loginTitle: 'Welcome Back',
      loginSubtitle: 'Sign in to continue',
      signupTitle: 'Create Account',
      signupTitleHighlight: 'Farming Profile',
      signupSubtitle: 'Join our farming community',
      emailLabel: 'Email',
      emailInfo: 'We use this to send you updates and notifications',
      passwordLabel: 'Password',
      passwordInfo: 'Use at least 8 characters with mix of letters and numbers',
      nameLabel: 'Full Name',
      nameInfo: 'Your full name as it appears on documents',
      locationLabel: 'Location',
      locationInfo: 'Your farming location or nearest city',
      phoneLabel: 'Phone Number',
      phoneInfo: 'For contact and emergency purposes',
      farmSizeLabel: 'Farm Size (acres)',
      farmSizeInfo: 'Total area of your farmland',
      joinedDateLabel: 'Joined Date (optional)',
      joinedDateInfo: 'When you started farming',
      loginButton: 'Sign In',
      signupButton: 'Create Account',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      signupLink: 'Sign Up Now',
      loginLink: 'Back to Login',
      farmerInfo: 'Build your farming profile',
    },
    hi: {
      loginTitle: 'वापस स्वागत है',
      loginSubtitle: 'जारी रखने के लिए साइन इन करें',
      signupTitle: 'खाता बनाएं',
      signupTitleHighlight: 'खेती प्रोफाइल बनाएं',
      signupSubtitle: 'हमारे कृषि समुदाय में शामिल हों',
      emailLabel: 'ईमेल',
      emailInfo: 'हम आपको अपडेट और सूचनाएं भेजने के लिए इसका उपयोग करते हैं',
      passwordLabel: 'पासवर्ड',
      passwordInfo: 'कम से कम 8 वर्णों के साथ अक्षरों और संख्याओं का मिश्रण',
      nameLabel: 'पूरा नाम',
      nameInfo: 'आपका पूरा नाम जैसा दस्तावेज़ में दिखता है',
      locationLabel: 'स्थान',
      locationInfo: 'आपका कृषि स्थान या निकटतम शहर',
      phoneLabel: 'फोन नंबर',
      phoneInfo: 'संपर्क और आपातकालीन उद्देश्यों के लिए',
      farmSizeLabel: 'खेत का आकार (एकड़)',
      farmSizeInfo: 'आपकी कुल कृषि भूमि का क्षेत्र',
      joinedDateLabel: 'शामिल होने की तारीख (वैकल्पिक)',
      joinedDateInfo: 'जब आपने खेती शुरू की',
      loginButton: 'साइन इन करें',
      signupButton: 'खाता बनाएं',
      forgotPassword: 'पासवर्ड भूल गए?',
      noAccount: 'खाता नहीं है?',
      haveAccount: 'पहले से खाता है?',
      signupLink: 'अभी साइन अप करें',
      loginLink: 'लॉगिन पर वापस जाएं',
      farmerInfo: 'अपनी खेती प्रोफाइल बनाएं',
    },
  } as const;

  const t = content[language];
  const auth = useAuth();

  // Clear errors when modal closes
  useEffect(() => {
    if (!show) {
      setError(null);
      setSuccess(null);
      setFieldErrors(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        location: '',
        phoneNumber: '',
        farmSize: '',
        joinedDate: '',
      });
      setIsLogin(true);
    }
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isLogin) {
        await auth.login(formData.email, formData.password);
        setSuccess('Logged in successfully');
        toast.success(language === 'en' ? 'Login successful! Welcome back.' : 'लॉगिन सफल! आपका स्वागत है।');
        if (onAuthSuccess) onAuthSuccess({ token: auth.token || '', user: auth.user });
        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 500);
      } else {
        // Signup - all fields except optional ones are required
        if (!formData.name || !formData.email || !formData.password) {
          throw new Error(language === 'en' ? 'Please fill in all required fields' : 'कृपया सभी आवश्यक फ़ील्ड भरें');
        }

        await auth.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          location: formData.location || undefined,
          phoneNumber: formData.phoneNumber || undefined,
          farmSize: formData.farmSize || undefined,
          joinedDate: formData.joinedDate || undefined,
        });

        setSuccess('Account created');
        toast.success(language === 'en' ? 'Account created successfully! Signing you in...' : 'खाता सफलतापूर्वक बनाया गया! साइन इन हो रहे हैं...');

        setTimeout(() => {
          if (auth.token) {
            if (onAuthSuccess) onAuthSuccess({ token: auth.token || '', user: auth.user });
            onClose();
          } else {
            setFormData({
              name: '',
              email: '',
              password: '',
              location: '',
              phoneNumber: '',
              farmSize: '',
              joinedDate: '',
            });
            setIsLogin(true);
            setSuccess(null);
            setLoading(false);
          }
        }, 700);
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg = err?.message || 'An error occurred';
      // If backend provided field-level errors, surface them
      if (err?.fieldErrors && typeof err.fieldErrors === 'object') {
        setFieldErrors(err.fieldErrors);
      }
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="relative w-16 h-16"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur-lg opacity-75" />
                <div className="absolute inset-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur opacity-50" />
                <Leaf className="absolute inset-3 w-full h-full text-green-300 drop-shadow-lg" />
              </motion.div>
              <p className="text-green-300 text-lg font-bold">{language === 'en' ? 'Processing...' : 'प्रोसेस हो रहा है...'}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className={`w-full max-h-[95vh] overflow-y-auto my-auto ${isLogin ? 'max-w-md' : 'max-w-2xl'}`}
              >
                {/* Animated Background Gradient */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-yellow-400/10 to-green-600/20 rounded-2xl blur-2xl opacity-75 -z-10" />

                <div
                  className={`rounded-2xl overflow-hidden shadow-2xl border flex flex-col ${
                    darkMode ? 'bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-green-500/20' : 'bg-gradient-to-br from-white/95 via-green-50/40 to-white/95 border-green-300/30'
                  } backdrop-blur-xl`}
                >
                  {/* Login Header - Compact */}
                  {isLogin && (
                    <div className="relative h-20 bg-gradient-to-br from-green-600 via-green-500 to-green-700 overflow-hidden">
                      {/* Animated gradient blobs */}
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-0 right-6 w-24 h-24 bg-green-400/30 rounded-full blur-2xl"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-2 -left-8 w-32 h-32 bg-green-300/20 rounded-full blur-2xl"
                      />

                      {/* Close button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        title="Close modal"
                        className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>

                      {/* Compact Login Header */}
                      <div className="absolute bottom-2 left-4 right-10">
                        <motion.h2
                          key="login"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-white text-lg font-bold"
                        >
                          {t.loginTitle}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-green-100 text-xs mt-0.5"
                        >
                          {t.loginSubtitle}
                        </motion.p>
                      </div>
                    </div>
                  )}

                  {/* Signup Header - Compact (matching login) */}
                  {!isLogin && (
                    <div className="relative h-16 bg-gradient-to-br from-green-600 via-green-500 to-green-700 overflow-hidden">
                      {/* Subtle animated blobs */}
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-2 right-8 w-20 h-20 bg-green-400/20 rounded-full blur-2xl"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.35, 0.15] }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-2 -left-8 w-24 h-24 bg-green-300/15 rounded-full blur-2xl"
                      />

                      {/* Close button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        title="Close modal"
                        className="absolute top-2 right-2 p-1 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>

                      {/* Compact Signup Header */}
                      <div className="absolute bottom-1 left-3 right-8">
                        <motion.h2
                          key="signup-compact"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-white text-base font-bold"
                        >
                          {t.signupTitle}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.08 }}
                          className="text-green-100 text-xs mt-0"
                        >
                          {t.signupSubtitle}
                        </motion.p>
                      </div>
                    </div>
                  )}

                  {/* Form Container */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col overflow-hidden">
                    <form onSubmit={handleSubmit} className={`space-y-3 flex flex-col h-full ${isLogin ? 'space-y-2' : ''}`}>
                      {/* Email & Password - Always visible */}
                      <div className="space-y-2">
                        <FormInput icon={null} label={t.emailLabel} type="email" name="email" placeholder={t.emailLabel} required value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} darkMode={darkMode} info={t.emailInfo} error={fieldErrors?.email} />
                        <FormInput icon={null} label={t.passwordLabel} type="password" name="password" placeholder={t.passwordLabel} required value={formData.password} onChange={(e: any) => setFormData({ ...formData, password: e.target.value })} darkMode={darkMode} info={t.passwordInfo} error={fieldErrors?.password} />
                      </div>

                      {isLogin && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className={`p-4 rounded-lg border ${darkMode ? 'bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-700/30' : 'bg-gradient-to-br from-green-50/60 to-blue-50/60 border-green-300/40'}`}
                        >
                          <h3 className={`text-sm font-bold mb-3 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                            {language === 'en' ? '🌾 Smart Farming Awaits' : '🌾 स्मार्ट खेती आपका इंतजार कर रही है'}
                          </h3>
                          <ul className="space-y-2 text-xs">
                            <li className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span>{language === 'en' ? 'Real-time crop disease detection' : 'वास्तविक समय फसल रोग पहचान'}</span>
                            </li>
                            <li className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span>{language === 'en' ? 'Weather predictions & alerts' : 'मौसम पूर्वानुमान और सतर्कताएं'}</span>
                            </li>
                            <li className={`flex items-start gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span>{language === 'en' ? 'Expert farming guidance' : 'विशेषज्ञ खेती मार्गदर्शन'}</span>
                            </li>
                          </ul>
                        </motion.div>
                      )}

                      {!isLogin && (
                        <>
                          {/* Divider */}
                          <div className={`flex items-center gap-2 ${!isLogin ? 'py-1' : ''}`}>
                            <div className={`flex-1 h-px ${darkMode ? 'bg-gray-700/50' : 'bg-gray-300/50'}`} />
                            <span className={`text-xs font-semibold uppercase tracking-widest ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {language === 'en' ? 'Farmer Details' : 'कृषक विवरण'}
                            </span>
                            <div className={`flex-1 h-px ${darkMode ? 'bg-gray-700/50' : 'bg-gray-300/50'}`} />
                          </div>

                          {/* Signup Fields - Organized in sections */}
                          <div className="flex-1 overflow-y-auto space-y-2.5 pr-2">

                          <FormInput icon={null} label={t.nameLabel} name="name" placeholder={t.nameLabel} required value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} darkMode={darkMode} info={t.nameInfo} error={fieldErrors?.name} />
                          <FormInput icon={null} label={t.phoneLabel} type="tel" name="phoneNumber" placeholder={t.phoneLabel} value={formData.phoneNumber} onChange={(e: any) => setFormData({ ...formData, phoneNumber: e.target.value })} darkMode={darkMode} info={t.phoneInfo} error={fieldErrors?.phoneNumber} />
                          
                          {/* Location Field with Access Button */}
                          <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative group"
                          >
                            <div className="flex items-center justify-between mb-2.5">
                              <label className={`block text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                {t.locationLabel}
                              </label>
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  if (!navigator.geolocation) {
                                    toast.error(language === 'en' ? 'Geolocation not supported' : 'जियोलोकेशन समर्थित नहीं है');
                                    return;
                                  }
                                  navigator.geolocation.getCurrentPosition(
                                    async (pos) => {
                                      try {
                                        const lat = pos.coords.latitude;
                                        const lon = pos.coords.longitude;
                                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                                        const data = await res.json();
                                        const name = data.address?.city || data.address?.town || data.address?.county || data.display_name || '';
                                        setFormData((prev) => ({ ...prev, location: name }));
                                        toast.success(language === 'en' ? 'Location detected!' : 'स्थान मिल गया!');
                                      } catch (err) {
                                        console.error(err);
                                        toast.error(language === 'en' ? 'Failed to get location' : 'स्थान प्राप्त करने में विफल');
                                      }
                                    },
                                    (err) => {
                                      console.error('Geolocation error:', err);
                                      toast.error(language === 'en' ? 'Please enable location access' : 'कृपया स्थान एक्सेस सक्षम करें');
                                    }
                                  );
                                }}
                                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 border ${
                                  darkMode 
                                    ? 'bg-green-600/30 hover:bg-green-600/50 text-green-300 border-green-500/70 shadow-lg shadow-green-500/10' 
                                    : 'bg-green-500/20 hover:bg-green-500/35 text-green-700 border-green-400/70 shadow-lg shadow-green-400/10'
                                }`}
                                title={language === 'en' ? 'Access your location' : 'अपना स्थान एक्सेस करें'}
                              >
                                📍 {language === 'en' ? 'Detect' : 'खोजें'}
                              </motion.button>
                            </div>
                            <div className="relative">
                              <input
                                type="text"
                                name="location"
                                aria-label={t.locationLabel}
                                value={formData.location}
                                onChange={(e: any) => setFormData({ ...formData, location: e.target.value })}
                                placeholder={t.locationLabel}
                                className={`w-full px-3 py-2 text-xs font-medium rounded-lg border-2 transition-all duration-300 backdrop-blur-sm shadow-sm
                                  ${darkMode
                                    ? 'bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:bg-gray-800 focus:ring-2 focus:ring-green-500/30 focus:shadow-lg focus:shadow-green-500/20'
                                    : 'bg-white/90 border-gray-300/80 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/30 focus:shadow-lg focus:shadow-green-500/20'
                                  }
                                `}
                              />
                            </div>
                          </motion.div>
                           {fieldErrors?.location && (
                             <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                               {fieldErrors.location}
                             </p>
                           )}

                          <div>
                            <label className={`block mb-1.5 text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                              {t.farmSizeLabel}
                            </label>
                            <input
                              type="text"
                              name="farmSize"
                              aria-label={t.farmSizeLabel}
                              value={formData.farmSize}
                              onChange={(e: any) => setFormData({ ...formData, farmSize: e.target.value })}
                              placeholder={t.farmSizeLabel}
                              className={`w-full px-3 py-2 text-xs font-medium rounded-lg border-2 transition-all duration-300 backdrop-blur-sm shadow-sm
                                ${darkMode
                                  ? 'bg-gray-800/80 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:bg-gray-800 focus:ring-2 focus:ring-green-500/30 focus:shadow-lg focus:shadow-green-500/20'
                                  : 'bg-white/90 border-gray-300/80 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/30 focus:shadow-lg focus:shadow-green-500/20'
                                }
                              `}
                            />
                            {fieldErrors?.farmSize && (
                              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                {fieldErrors.farmSize}
                              </p>
                            )}
                          </div>

                          <div className="bg-gradient-to-r from-green-500/10 to-green-400/5 p-3 rounded-lg border border-green-300/30">
                            <label className={`block mb-2 text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                              {t.joinedDateLabel}
                            </label>
                            <input
                              type="date"
                              aria-label={t.joinedDateLabel}
                              name="joinedDate"
                              value={formData.joinedDate}
                              onChange={(e: any) => setFormData({ ...formData, joinedDate: e.target.value })}
                              className={`w-full px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-all duration-300 backdrop-blur-sm shadow-md
                                ${darkMode
                                  ? 'bg-gray-800/80 border-green-600/70 text-white placeholder-gray-400 focus:border-green-400 focus:bg-gray-800 focus:ring-2 focus:ring-green-500/40 focus:shadow-lg focus:shadow-green-500/30'
                                  : 'bg-white/95 border-green-400/70 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/40 focus:shadow-lg focus:shadow-green-500/30'
                                }
                              `}
                            />
                          </div>
                          </div>
                        </>
                      )}

                      {isLogin && (
                        <div className="text-right pt-1 pb-2">
                          <motion.button 
                            type="button"
                            whileHover={{ x: 5 }}
                            className={`text-xs font-semibold transition-colors ${darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}
                          >
                            {t.forgotPassword}
                          </motion.button>
                        </div>
                      )}

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? 'none' : '0 0 50px rgba(34, 197, 94, 0.8)' }}
                        whileTap={{ scale: loading ? 1 : 0.96 }}
                        disabled={loading}
                        className={`w-full py-2.5 rounded-lg ${isLogin ? 'mt-auto' : 'mt-4'} text-white flex items-center justify-center gap-2 font-bold text-xs transition-all duration-300 uppercase tracking-widest shadow-xl ${
                          loading
                            ? 'bg-gradient-to-r from-green-600/50 to-emerald-700/50 opacity-60 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 hover:shadow-2xl hover:shadow-green-500/50 active:shadow-green-500/30'
                        }`}
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full"
                            />
                            <span>{language === 'en' ? 'Processing...' : 'प्रोसेस हो रहा है...'}</span>
                          </>
                        ) : (
                          <>
                            <span>{isLogin ? t.loginButton : t.signupButton}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </motion.button>

                      {/* Error Message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="mt-3 p-3 rounded-lg bg-red-500/15 border border-red-500/50 text-red-600 dark:text-red-400 font-semibold text-sm"
                          >
                            ⚠️ {error}
                          </motion.div>
                        )}
                        {success && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="mt-3 p-3 rounded-lg bg-green-500/15 border border-green-500/50 text-green-600 dark:text-green-400 font-semibold text-sm"
                          >
                            ✓ {success}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>

                    {/* Toggle Auth Mode */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`mt-6 pt-5 text-center border-t ${
                        darkMode ? 'border-gray-700/50' : 'border-gray-300/50'
                      }`}
                    >
                      <p
                        className={`text-sm mb-4 font-semibold ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {isLogin ? t.noAccount : t.haveAccount}
                      </p>

                      <motion.button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setFormData({
                            name: '',
                            email: '',
                            password: '',
                            location: '',
                            phoneNumber: '',
                            farmSize: '',
                            joinedDate: '',
                          });
                          setError(null);
                          setFieldErrors(null);
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className={`inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-2xl ${
                          isLogin
                            ? 'bg-gradient-to-r from-yellow-400 to-green-500 text-white hover:from-yellow-500 hover:to-green-600 shadow-yellow-500/50 hover:shadow-yellow-500/70'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-emerald-500/50 hover:shadow-emerald-500/70'
                        }`}
                      >
                        {isLogin ? t.signupLink : t.loginLink}
                      </motion.button>
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
