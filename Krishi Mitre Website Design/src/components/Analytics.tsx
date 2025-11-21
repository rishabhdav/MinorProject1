import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, MessageSquare, Star, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AnalyticsProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function Analytics({ darkMode, language }: AnalyticsProps) {
  const [stats, setStats] = useState({
    totalFeedback: 0,
    avgRating: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    usersCount: 0,
    latestFeedback: [] as any[],
    trendData: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    en: {
      title: '📊 Analytics Dashboard',
      subtitle: 'Insights into user feedback and app usage',
      totalFeedback: 'Total Feedback',
      avgRating: 'Average Rating',
      usersCount: 'Active Users',
      ratingDistribution: 'Rating Distribution',
      ratingBreakdown: '⭐ Rating Breakdown',
      latestFeedback: 'Latest Feedback',
      noData: 'No feedback data available yet',
      star: 'Star',
      responses: 'Responses',
      summary: 'Summary',
      excellent: 'Excellent (5 stars)',
      veryGood: 'Very Good (4 stars)',
      good: 'Good (3 stars)',
      fair: 'Fair (2 stars)',
      poor: 'Poor (1 star)',
    },
    hi: {
      title: '📊 विश्लेषण डैशबोर्ड',
      subtitle: 'उपयोगकर्ता प्रतिक्रिया और ऐप उपयोग में अंतर्दृष्टि',
      totalFeedback: 'कुल प्रतिक्रिया',
      avgRating: 'औसत रेटिंग',
      usersCount: 'सक्रिय उपयोगकर्ता',
      ratingDistribution: 'रेटिंग वितरण',
      ratingBreakdown: '⭐ रेटिंग ब्रेकडाउन',
      latestFeedback: 'नवीनतम प्रतिक्रिया',
      noData: 'अभी तक कोई प्रतिक्रिया डेटा उपलब्ध नहीं है',
      star: 'सितारा',
      responses: 'जवाब',
      summary: 'सारांश',
      excellent: 'उत्कृष्ट (5 सितारे)',
      veryGood: 'बहुत अच्छा (4 सितारे)',
      good: 'अच्छा (3 सितारे)',
      fair: 'न्याय्य (2 सितारे)',
      poor: 'खराब (1 सितारा)',
    },
  };

  const t = content[language];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'http://localhost:8080/api/feedback';
      const response = await fetch(`${API_BASE}/analytics`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setStats({
          totalFeedback: data?.totalFeedback || 0,
          avgRating: (data?.avgRating || 0).toFixed(1),
          ratingDistribution: data?.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          usersCount: data?.usersCount || 0,
          latestFeedback: data?.latestFeedback || [],
          trendData: data?.trendData || [],
        });
      } else {
        // Mock data for demonstration
        setStats({
          totalFeedback: 248,
          avgRating: 4.2,
          ratingDistribution: { 1: 8, 2: 15, 3: 45, 4: 95, 5: 85 },
          usersCount: 342,
          latestFeedback: [
            { name: 'Rajesh Kumar', rating: 5, message: 'Excellent app for farming!', time: '2 hours ago' },
            { name: 'Priya Singh', rating: 4, message: 'Very helpful features', time: '5 hours ago' },
          ],
          trendData: [
            { date: 'Mon', feedback: 12 },
            { date: 'Tue', feedback: 18 },
            { date: 'Wed', feedback: 25 },
            { date: 'Thu', feedback: 22 },
            { date: 'Fri', feedback: 30 },
            { date: 'Sat', feedback: 28 },
            { date: 'Sun', feedback: 20 },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error(language === 'en' ? 'Error loading analytics' : 'विश्लेषण लोड करने में त्रुटि');
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (rating: number): string => {
    switch (rating) {
      case 5:
        return 'from-green-500 to-green-600';
      case 4:
        return 'from-lime-500 to-lime-600';
      case 3:
        return 'from-yellow-500 to-yellow-600';
      case 2:
        return 'from-orange-500 to-orange-600';
      case 1:
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getRatingLabel = (rating: number): string => {
    const labels: any = {
      5: t.excellent,
      4: t.veryGood,
      3: t.good,
      2: t.fair,
      1: t.poor,
    };
    return labels[rating] || '';
  };

  const maxCount = Math.max(...Object.values(stats.ratingDistribution as Record<string, number>).map(v => Number(v) || 0));

  return (
    <section
      className={`min-h-screen py-24 ${
        darkMode
          ? 'bg-gradient-to-b from-gray-900 to-gray-800'
          : 'bg-gradient-to-b from-white to-[#F1C40F]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t.subtitle}</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin">
              <AlertCircle className="w-12 h-12 text-[#2ECC71]" />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: MessageSquare,
                  label: t.totalFeedback,
                  value: stats.totalFeedback,
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  icon: Star,
                  label: t.avgRating,
                  value: `${stats.avgRating}/5`,
                  color: 'from-yellow-500 to-yellow-600',
                },
                {
                  icon: Users,
                  label: t.usersCount,
                  value: stats.usersCount,
                  color: 'from-purple-500 to-purple-600',
                },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className={`p-8 rounded-2xl ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg`}
                  >
                    <div className={`inline-block p-4 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </p>
                    <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stat.value}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Rating Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <h3 className={`text-2xl font-bold mb-8 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <BarChart3 className="w-6 h-6 text-[#2ECC71]" />
                {t.ratingBreakdown}
              </h3>

              <div className="space-y-6">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = (stats.ratingDistribution as any)[rating] || 0;
                  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

                  return (
                    <motion.div
                      key={rating}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (5 - rating) }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20">
                          <p className={`font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {rating} ⭐
                          </p>
                        </div>
                        <div className="flex-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 0.1 * (5 - rating), duration: 0.8 }}
                            className={`h-8 rounded-lg bg-gradient-to-r ${getRatingColor(rating)} flex items-center justify-end pr-3`}
                          >
                            <span className="text-white font-semibold text-sm">{count}</span>
                          </motion.div>
                        </div>
                        <div className="w-16 text-right">
                          <p className={`font-semibold text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {((count / stats.totalFeedback) * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Latest Feedback */}
            {stats.latestFeedback.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
              >
                <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t.latestFeedback}
                </h3>

                <div className="space-y-4">
                  {stats.latestFeedback.map((feedback: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-l-4 border-[#2ECC71]`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {feedback.name}
                          </p>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {feedback.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getRatingColor(feedback.rating)} text-white font-semibold text-sm`}>
                            {feedback.rating}⭐
                          </div>
                        </div>
                      </div>
                      <p className={`text-xs mt-3 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {feedback.time}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
