import { motion } from 'motion/react';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function Footer({ darkMode, language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#' },
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className={`relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-green-900 to-gray-900' 
        : 'bg-gradient-to-br from-green-800 via-green-600 to-green-700'
    } text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-900' : 'bg-green-700'}`}>
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-white">Krishi Mitre</span>
            </div>
            <p className="text-green-100 mb-4">
              Empowering farmers with AI-powered tools for sustainable and profitable agriculture.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-2 rounded-full ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-green-700 hover:bg-green-600'
                    } transition-colors`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors inline-block"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-green-100">
              <li>Crop Disease Detection</li>
              <li>Crop Rotation Advisor</li>
              <li>Weather Prediction</li>
              <li>AI Consultation</li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-4 text-white">Contact Us</h3>
            <div className="space-y-3 text-green-100">
              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>support@krishimitre.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Agricultural Innovation Hub<br />New Delhi, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`pt-8 border-t ${
            darkMode ? 'border-gray-800' : 'border-green-700'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-100 text-center md:text-left">
              © {currentYear} Krishi Mitre. Created by Prateek, Aditya & Risabh.
            </p>
            <div className="flex gap-6 text-green-100">
              <motion.a 
                whileHover={{ scale: 1.05 }} 
                href="#" 
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }} 
                href="#" 
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl pointer-events-none"
      />
    </footer>
  );
}
