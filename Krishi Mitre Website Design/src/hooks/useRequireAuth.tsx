import React from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProtectedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  darkMode?: boolean;
  onLoginClick?: () => void;
  language?: 'en' | 'hi';
}

export function useRequireAuth() {
  const { user } = useAuth();
  return { isAuthenticated: !!user };
}

export const Protected: React.FC<ProtectedProps> = ({
  children,
  fallback,
  darkMode = false,
  onLoginClick,
  language = 'en',
}) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        {fallback ?? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`min-h-[400px] flex items-center justify-center rounded-lg border-2 ${
              darkMode
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-gradient-to-br from-[#2ECC71]/5 to-[#F1C40F]/5 border-[#2ECC71]/20'
            }`}
          >
            <div className="text-center px-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2ECC71]/20 mb-4"
              >
                <Lock className="w-8 h-8 text-[#2ECC71]" />
              </motion.div>

              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {language === 'en' ? 'Feature Locked' : 'फीचर लॉक है'}
              </h3>

              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'en'
                  ? 'Please log in to access this feature and unlock all the powerful tools we have for you.'
                  : 'इस फीचर को एक्सेस करने के लिए कृपया लॉगिन करें।'}
              </p>

              {onLoginClick && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(46, 204, 113, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLoginClick}
                  className="px-6 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white rounded-lg font-semibold"
                >
                  {language === 'en' ? 'Login Now' : 'अभी लॉगिन करें'}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </>
    );
  }

  return <>{children}</>;
};
