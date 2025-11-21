import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

interface EntranceAnimationProps {
  onComplete: () => void;
}

export default function EntranceAnimation({ onComplete }: EntranceAnimationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-hidden"
    >
      {/* Sunrise Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-yellow-200 to-green-100" />
      
      {/* Animated Sun */}
      <motion.div
        initial={{ y: '100%', scale: 0.5 }}
        animate={{ y: '20%', scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute left-1/2 transform -translate-x-1/2 w-32 h-32 bg-yellow-400 rounded-full shadow-[0_0_100px_rgba(251,191,36,0.8)]"
      >
        {/* Sun rays */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            className="absolute top-1/2 left-1/2 w-1 h-24 bg-yellow-300"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-50%)`,
              transformOrigin: '0 0',
            }}
          />
        ))}
      </motion.div>

      {/* Farm Background */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-2/3"
      >
        <img
          src="https://images.unsplash.com/photo-1650192388648-65800ec59fee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWdhcmNhbmUlMjBmaWVsZHxlbnwxfHx8fDE3NjI1OTc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Farm"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent" />
      </motion.div>

      {/* Swaying Sugarcanes */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 flex items-end justify-around px-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: 1,
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              scaleY: { duration: 1, delay: 0.5 + i * 0.1 },
              rotate: {
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              },
            }}
            className="w-2 h-32 bg-gradient-to-t from-green-700 to-green-500 rounded-full origin-bottom"
          />
        ))}
      </div>

      {/* Flying Drone */}
      <motion.div
        initial={{ x: '-10%', y: '40%' }}
        animate={{ x: '110%', y: '35%' }}
        transition={{ duration: 3, delay: 1, ease: 'linear' }}
        className="absolute"
      >
        <Plane className="w-12 h-12 text-gray-700 transform rotate-45" />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="text-white mb-4 drop-shadow-lg"
        >
          Krishi Mitra
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white/90 mb-6"
        >
          Loading your AI farming companion...
        </motion.p>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-yellow-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
