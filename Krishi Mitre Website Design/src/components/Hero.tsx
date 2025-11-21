import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Leaf, Cloud, Sun, Droplets } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function Hero({ setActiveSection, darkMode, language }: HeroProps) {
  const content = {
    en: {
      badge: 'AI-Powered Agriculture',
      heading: 'Empowering Farmers with Artificial Intelligence 🌱',
      subtext: 'Smart insights for healthier crops, sustainable farming, and accurate weather predictions.',
      cta1: 'Get Started',
      cta2: 'Try Disease Detection',
      stats: [
        { value: '98%', label: 'AI Accuracy' },
        { value: '50K+', label: 'Farmers Helped' },
        { value: '24/7', label: 'AI Support' },
      ],
    },
    hi: {
      badge: 'एआई-संचालित कृषि',
      heading: 'कृत्रिम बुद्धिमत्ता से किसानों को सशक्त बनाना 🌱',
      subtext: 'स्वस्थ फसलों, टिकाऊ खेती और सटीक मौसम पूर्वानुमान के लिए स्मार्ट जानकारी।',
      cta1: 'शुरू करें',
      cta2: 'रोग पहचान आजमाएं',
      stats: [
        { value: '98%', label: 'एआई सटीकता' },
        { value: '50K+', label: 'किसानों की मदद की' },
        { value: '24/7', label: 'एआई सहायता' },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Bright Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F1C40F]/20 via-[#2ECC71]/30 to-[#27AE60]/20" />
      
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/80 via-[#F1C40F]/60 to-[#27AE60]/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1589517445140-588b823e68f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBncmVlbiUyMGZhcm0lMjBzdW5yaXNlfGVufDF8fHx8MTc2MjU5Nzc4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Farm Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Animated Floating Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-10 sm:right-20"
      >
        <Sun className="w-20 h-20 sm:w-24 sm:h-24 text-[#F1C40F] drop-shadow-[0_0_20px_rgba(241,196,15,0.8)]" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-32 left-10 sm:left-20"
      >
        <Cloud className="w-16 h-16 sm:w-20 sm:h-20 text-white/60 drop-shadow-lg" />
      </motion.div>

      {/* Floating Leaves */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Leaf className="w-8 h-8 text-[#2ECC71]/40" />
        </motion.div>
      ))}

      {/* Droplets Animation */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`drop-${i}`}
          animate={{
            y: [-20, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute"
          style={{
            left: `${20 + i * 20}%`,
            top: '10%',
          }}
        >
          <Droplets className="w-6 h-6 text-blue-400/50" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-6 h-6 text-[#F1C40F] drop-shadow-lg" />
          <span className="text-white tracking-wider bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            {t.badge}
          </span>
          <Sparkles className="w-6 h-6 text-[#F1C40F] drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            lineHeight: '1.2',
          }}
        >
          {t.heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/95 max-w-3xl mx-auto mb-10 text-lg sm:text-xl drop-shadow-lg"
        >
          {t.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 40px rgba(241, 196, 15, 0.8)' 
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('disease')}
            className="px-8 py-4 bg-gradient-to-r from-[#F1C40F] to-[#FF7043] text-white rounded-xl flex items-center gap-2 shadow-2xl transform transition-all"
            style={{
              boxShadow: '0 10px 30px rgba(241, 196, 15, 0.4)',
            }}
          >
            <span className="font-medium">{t.cta1}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('disease')}
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/50 rounded-xl hover:border-white transition-all"
          >
            {t.cta2}
          </motion.button>
        </motion.div>

        {/* Bright Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {t.stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30"
              style={{
                boxShadow: '0 8px 32px rgba(46, 204, 113, 0.2)',
              }}
            >
              <motion.div 
                className="text-[#F1C40F] mb-2 drop-shadow-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-white/90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
