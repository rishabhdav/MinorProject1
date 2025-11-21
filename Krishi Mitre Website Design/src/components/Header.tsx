import { Users, Sun, Moon, Languages } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  setShowLoginModal: (show: boolean) => void;
}

export default function Header({
  activeSection,
  setActiveSection,
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  setShowLoginModal,
}: HeaderProps) {
  const auth = useAuth();

  const navItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'disease', labelEn: 'Disease', labelHi: 'रोग' },
    { id: 'rotation', labelEn: 'Rotation', labelHi: 'चक्र' },
    { id: 'weather', labelEn: 'Weather', labelHi: 'मौसम' },
    { id: 'soiltest', labelEn: 'Soil Test', labelHi: 'मिट्टी परीक्षण' },
    { id: 'analytics', labelEn: 'Analytics', labelHi: 'विश्लेषण' },
    { id: 'dashboard', labelEn: 'Dashboard', labelHi: 'डैशबोर्ड' },
    { id: 'faq', labelEn: 'FAQ', labelHi: 'प्रश्न' },
    { id: 'feedback', labelEn: 'Feedback', labelHi: 'प्रतिक्रिया' },
    { id: 'about', labelEn: 'About', labelHi: 'परिचय' },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-lg
        ${darkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'}
      `}
    >
      <nav className="w-full px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#2ECC71] to-[#1E8449] border-2 border-[#27AE60] shadow-lg group-hover:shadow-xl transition-all">
              🌾
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-2xl font-extrabold text-[#27AE60]">Krishi Mitra</span>
              <span className="text-xs font-semibold text-green-600">🌱 AI Farming Partner</span>
            </div>
          </motion.div>

          {/* NAVIGATION (Desktop) */}
          <div className="hidden xl:flex gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -3 }}
                onClick={() => setActiveSection(item.id)}
                className={`
                  px-4 py-2 text-sm font-semibold rounded-lg transition-all relative
                  ${activeSection === item.id
                    ? 'bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400 shadow-inner'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-800'}
                `}
              >
                {language === 'en' ? item.labelEn : item.labelHi}

                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute w-1.5 h-1.5 bg-green-500 rounded-full left-1/2 -bottom-1 -translate-x-1/2"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* TOGGLES + AUTH */}
          <div className="flex items-center gap-3">

            {/* Language */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className={`
                flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold
                ${darkMode ? 'bg-gray-800 text-green-300 hover:bg-gray-700' : 'bg-green-50 text-green-700 hover:bg-green-100'}
              `}
            >
              <Languages className="w-4 h-4" />
              {language.toUpperCase()}
            </motion.button>

            {/* Dark Mode */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`
                flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold
                ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}
              `}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {darkMode ? 'Light' : 'Dark'}
            </motion.button>

            {/* AUTH */}
            {auth.user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2ECC71] to-[#1E8449] text-white font-bold flex items-center justify-center">
                    {auth.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{auth.user.name}</p>
                    <p className="text-xs text-green-600">{language === 'en' ? '✓ Member' : '✓ सदस्य'}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    auth.logout();
                    toast.success(language === 'en' ? 'Logged out successfully' : 'सफलतापूर्वक लॉग आउट');
                  }}
                  className="px-4 py-2 text-sm font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white shadow-lg"
              >
                {language === 'en' ? 'Krishi Mitra Login' : 'कृषि मित्र लॉगिन'}
              </motion.button>
            )}
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="xl:hidden flex flex-wrap gap-2 justify-center pb-3 mt-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-semibold
                ${activeSection === item.id
                  ? 'bg-green-500 text-white shadow'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-gray-100 text-gray-700'}
              `}
            >
              {language === 'en' ? item.labelEn : item.labelHi}
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
