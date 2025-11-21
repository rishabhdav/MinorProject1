import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Code, Brain, Rocket } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function About({ darkMode, language }: AboutProps) {
  const content = {
    en: {
      title: 'About Krishi Mitre',
      description: 'We are a team of passionate technologists working to revolutionize agriculture through artificial intelligence. Our mission is to empower farmers with smart, data-driven tools for sustainable and profitable farming.',
      teamTitle: 'Meet Our Team',
      missionTitle: 'Our Mission',
      missionDescription: 'To bridge the gap between traditional farming practices and modern technology, making AI-powered agricultural tools accessible to farmers worldwide. We believe in sustainable farming, data-driven decisions, and empowering the backbone of our food system with cutting-edge technology.',
      features: [
        {
          title: 'AI-Powered Insights',
          description: 'Leveraging advanced machine learning algorithms for accurate predictions',
        },
        {
          title: 'Modern Technology',
          description: 'Built with cutting-edge tech stack for optimal performance',
        },
        {
          title: 'Innovation Driven',
          description: 'Constantly evolving to meet the needs of modern agriculture',
        },
      ],
    },
    hi: {
      title: 'कृषि मित्र के बारे में',
      description: 'हम कृत्रिम बुद्धिमत्ता के माध्यम से कृषि में क्रांति लाने के लिए काम करने वाले उत्साही प्रौद्योगिकीविद् हैं। हमारा मिशन किसानों को टिकाऊ और लाभदायक खेती के लिए स्मार्ट, डेटा-संचालित उपकरण प्रदान करना है।',
      teamTitle: 'हमारी टीम से मिलें',
      missionTitle: 'हमारा मिशन',
      missionDescription: 'परंपरागत खेती की प्रथाओं और आधुनिक प्रौद्योगिकी के बीच की खाई को पाटना, कृत्रिम बुद्धिमत्ता-संचालित कृषि उपकरणों को दुनिया भर के किसानों के लिए सुलभ बनाना। हम टिकाऊ खेती, डेटा-संचालित निर्णय और आधुनिक प्रौद्योगिकी के साथ हमारे खाद्य प्रणाली की रीढ़ को सशक्त बनाने में विश्वास करते हैं।',
      features: [
        {
          title: 'एआई-संचालित अंतर्दृष्टि',
          description: 'सटीक भविष्यवाणी के लिए उन्नत मशीन लर्निंग एल्गोरिदम का उपयोग',
        },
        {
          title: 'आधुनिक प्रौद्योगिकी',
          description: 'सर्वोत्तम प्रदर्शन के लिए अत्याधुनिक तकनीकी स्टैक के साथ निर्मित',
        },
        {
          title: 'नवाचार संचालित',
          description: 'आधुनिक कृषि की जरूरतों को पूरा करने के लिए लगातार विकसित हो रहे हैं',
        },
      ],
    },
  } as const;

  const t = content[language];

  const team = [
    {
      name: 'Rishabh Tripathi',
      role: language === 'en' ? 'Backend Developer' : 'बैकएंड डेवलपर',
      bio: language === 'en' 
        ? 'Backend, APIs, and Database'
        : 'बैकएंड, एपीआई और डेटाबेस',
      skills: ['Spring Boot', 'REST APIs', 'MySQL'],
      responsibilities: language === 'en' ? [
        'Spring Boot backend development',
        'REST API and authentication',
        'Database design with MySQL'
      ] : [
        'Spring Boot बैकएंड विकास',
        'REST API और प्रमाणीकरण',
        'MySQL डेटाबेस डिजाइन'
      ],
      avatar: new URL('../assets/images/Rishabh.jpg', import.meta.url).href,
      fallbackAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rishabh',
    },
    {
      name: 'Prateek',
      role: language === 'en' ? 'ML Engineer' : 'एमएल इंजीनियर',
      bio: language === 'en'
        ? 'Deep learning, Computer vision, Image processing'
        : 'गहन शिक्षण, कंप्यूटर विजन, छवि प्रक्रिया',
      skills: ['CNN', 'Image Processing', 'TensorFlow'],
      responsibilities: language === 'en' ? [
        'Plant disease detection with CNN',
        'Crop recommendation models',
        'Image upload integration'
      ] : [
        'पौधों की बीमारी पहचान',
        'फसल सिफारिश मॉडल',
        'छवि अपलोड एकीकरण'
      ],
      avatar: new URL('../assets/images/prateek.jpeg', import.meta.url).href,
      fallbackAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prateek',
    },
    {
      name: 'Aditya Rana',
      role: language === 'en' ? 'ML Engineer' : 'एमएल इंजीनियर',
      bio: language === 'en'
        ? 'Data analysis, Model training, Model deployment'
        : 'डेटा विश्लेषण, मॉडल प्रशिक्षण, मॉडल तैनाती',
      skills: ['ANN', 'XGBoost', 'FastAPI'],
      responsibilities: language === 'en' ? [
        'Crop recommendation ANN model development',
        'XGBoost integration for predictions',
        'FastAPI backend service optimization'
      ] : [
        'फसल सिफारिश ANN मॉडल विकास',
        'भविष्यवाणी के लिए XGBoost एकीकरण',
        'FastAPI बैकएंड सेवा अनुकूलन'
      ],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya',
      fallbackAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya',
    },
  ];

  return (
    <section className={`min-h-screen py-24 ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-white to-green-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </h2>
          <p className={`max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.description}
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {t.features.map((feature, index) => {
            let Icon;
            if (index === 0) Icon = Brain;
            else if (index === 1) Icon = Code;
            else Icon = Rocket;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl text-center ${
                  darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  darkMode ? 'bg-green-900' : 'bg-green-100'
                }`}>
                  <Icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Team */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {t.teamTitle}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`rounded-xl p-5 text-center ${
                  darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                }`}
              >
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = member.fallbackAvatar;
                    }}
                  />
                </motion.div>

                <h4 className={`mb-1 text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </h4>
                <p className={`mb-2 text-xs text-green-600 font-semibold`}>
                  {member.role}
                </p>
                <p className={`mb-4 text-xs leading-snug ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {member.bio}
                </p>

                {/* Responsibilities */}
                {member.responsibilities && (
                  <div className="mb-3 text-left">
                    <h5 className={`mb-2 text-xs font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {language === 'en' ? 'Key Roles' : 'मुख्य भूमिका'}
                    </h5>
                    <ul className="space-y-1">
                      {member.responsibilities.slice(0, 3).map((resp, respIndex) => (
                        <li
                          key={respIndex}
                          className={`text-xs flex items-start gap-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          <span className="text-green-600 font-bold flex-shrink-0">•</span>
                          <span className="leading-tight">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                  {member.skills.slice(0, 4).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className={`p-2 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    } transition-colors`}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className={`p-2 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    } transition-colors`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className={`p-2 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    } transition-colors`}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement with Tree Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-20 p-8 rounded-2xl relative overflow-hidden ${
            darkMode 
              ? 'bg-gradient-to-r from-green-900 to-green-800' 
              : 'bg-gradient-to-r from-green-500 to-green-600'
          } text-white`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            {/* Left Tree Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="/src/assets/images/tree1.jpg"
                alt="Tree 1"
                className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=300&fit=crop';
                }}
              />
            </motion.div>

            {/* Center Mission Text */}
            <div className="text-center">
              <h3 className="mb-4">{t.missionTitle}</h3>
              <p className="text-green-100">
                {t.missionDescription}
              </p>
            </div>

            {/* Right Tree Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="/src/assets/images/tree2.jpg"
                alt="Tree 2"
                className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop';
                }}
              />
            </motion.div>
          </div>

          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
