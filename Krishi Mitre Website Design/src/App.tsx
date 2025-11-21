import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';
import EntranceAnimation from './components/EntranceAnimation';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CropDiseaseDetection from './components/CropDiseaseDetection';
import CropRotation from './components/CropRotation';
import WeatherPrediction from './components/WeatherPrediction';
import SoilTest from './components/ui/SoilTest';
import FAQ from './components/FAQ';
import Feedback from './components/Feedback';
import About from './components/About';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Analytics from './components/Analytics';

import FarmerDashboard from './components/FarmerDashboard';

import { Protected } from './hooks/useRequireAuth';

export default function App() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'en' | 'hi') || 'en';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Apply dark mode class to document and save to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <>
      {/* Entrance Animation */}
      <AnimatePresence>
        {showEntrance && (
          <EntranceAnimation onComplete={() => setShowEntrance(false)} />
        )}
      </AnimatePresence>

      {/* Main App */}
      {!showEntrance && (
        <div className={`min-h-screen w-full transition-colors duration-300 ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Header */}
          <Header
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            language={language}
            setLanguage={setLanguage}
            setShowLoginModal={setShowLoginModal}
          />

          {/* Login Modal */}
          <LoginModal
            show={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            darkMode={darkMode}
            language={language}
          />

          {/* Main Content */}
          <main className="pt-16 sm:pt-20 md:pt-24 lg:pt-0">
            <AnimatePresence mode="wait">
              {activeSection === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Hero setActiveSection={setActiveSection} darkMode={darkMode} language={language} />
                  <Features setActiveSection={setActiveSection} darkMode={darkMode} language={language} />
                </motion.div>
              )}

              {activeSection === 'disease' && (
                <Protected
                  darkMode={darkMode}
                  language={language}
                  onLoginClick={() => setShowLoginModal(true)}
                >
                  <motion.div
                    key="disease"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CropDiseaseDetection darkMode={darkMode} language={language} />
                  </motion.div>
                </Protected>
              )}

              {activeSection === 'rotation' && (
                <Protected
                  darkMode={darkMode}
                  language={language}
                  onLoginClick={() => setShowLoginModal(true)}
                >
                  <motion.div
                    key="rotation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CropRotation darkMode={darkMode} language={language} />
                  </motion.div>
                </Protected>
              )}

              {activeSection === 'weather' && (
                <motion.div
                  key="weather"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <WeatherPrediction darkMode={darkMode} language={language} />
                </motion.div>
              )}

              {activeSection === 'soiltest' && (
                <Protected
                  darkMode={darkMode}
                  language={language}
                  onLoginClick={() => setShowLoginModal(true)}
                >
                  <motion.div
                    key="soiltest"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SoilTest darkMode={darkMode} language={language} />
                  </motion.div>
                </Protected>
              )}

              {activeSection === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FAQ darkMode={darkMode} language={language} />
                </motion.div>
              )}

              {activeSection === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Analytics darkMode={darkMode} language={language} />
                </motion.div>
              )}

              {activeSection === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FarmerDashboard darkMode={darkMode} language={language} />
                </motion.div>
              )}



              {activeSection === 'feedback' && (
                <Protected
                  darkMode={darkMode}
                  language={language}
                  onLoginClick={() => setShowLoginModal(true)}
                >
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Feedback darkMode={darkMode} language={language} />
                  </motion.div>
                </Protected>
              )}

              {activeSection === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <About darkMode={darkMode} language={language} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Footer */}
          <Footer darkMode={darkMode} language={language} />

          {/* Floating Action Button - Back to Home */}
          {activeSection !== 'home' && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(46, 204, 113, 0.6)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveSection('home')}
              className="fixed bottom-8 right-8 p-4 rounded-full shadow-2xl z-40 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white transition-all"
              aria-label="Back to home"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </motion.button>
          )}
        </div>
      )}

      {/* Toast Notifications */}
      <Toaster 
        position="top-center" 
        theme={darkMode ? 'dark' : 'light'}
        richColors
        closeButton
        duration={2000}
      />
    </>
  );
}
