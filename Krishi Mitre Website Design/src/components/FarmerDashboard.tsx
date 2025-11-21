import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, Leaf, TrendingUp, MessageSquare, Award, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface FarmerDashboardProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function FarmerDashboard({ darkMode, language }: FarmerDashboardProps) {
  const auth = useAuth();
  console.log('Auth User:', auth.user);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<any>({});

  const content = {
    en: {
      title: '👨‍🌾 Farmer Dashboard',
      subtitle: 'View your profile and farming statistics',
      myProfile: 'My Profile',
      statistics: 'My Statistics',
      feedback: 'Feedbacks Submitted',
      diseaseDetections: 'Disease Detections',
      cropRotations: 'Crop Rotations',
      achievements: 'Achievements',
      lastActivity: 'Last Activity',
      memberSince: 'Member Since',
      totalPoints: 'Total Points',
      editProfile: 'Edit Profile',
      logout: 'Logout',
      noData: 'No data available',
      achievement1: 'First Feedback',
      achievement2: '5 Star Reviewer',
      achievement3: 'Active Farmer',
    },
    hi: {
      title: '👨‍🌾 किसान डैशबोर्ड',
      subtitle: 'अपनी प्रोफाइल और खेती के आंकड़े देखें',
      myProfile: 'मेरी प्रोफाइल',
      statistics: 'मेरे आंकड़े',
      feedback: 'जमा की गई प्रतिक्रिया',
      diseaseDetections: 'रोग पहचान',
      cropRotations: 'फसल चक्र',
      achievements: 'उपलब्धियां',
      lastActivity: 'अंतिम गतिविधि',
      memberSince: 'सदस्य बने हुए',
      totalPoints: 'कुल अंक',
      editProfile: 'प्रोफाइल संपादित करें',
      logout: 'लॉग आउट',
      noData: 'कोई डेटा उपलब्ध नहीं है',
      achievement1: 'पहली प्रतिक्रिया',
      achievement2: '5 स्टार समीक्षक',
      achievement3: 'सक्रिय किसान',
    },
  };

  const t = content[language];

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    if (auth.user) {
      fetchUserData();
    }
  }, [auth.user]);

  useEffect(() => {
    if (isEditing && userProfile) {
      setEditForm({
        name: userProfile.name || '',
        email: userProfile.email || '',
        location: userProfile.location || '',
        phoneNumber: userProfile.phoneNumber || '',
        farmSize: userProfile.farmSize || '',
        joinedDate: userProfile.joinedDate || '',
      });
    }
  }, [isEditing, userProfile]);

  const fetchUserData = async () => {
    setIsLoading(true);
    setApiError(null);
    setFieldErrors({});
    try {
      const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'http://localhost:8080/api';
      const token = localStorage.getItem('token');

      const email = auth?.user?.email || '';

      if (!email) {
        console.warn('No email found');
        setIsLoading(false);
        return;
      }

      console.log('Fetching data for email:', email);
      
      const response = await fetch(`${API_BASE}/farmer/dashboard?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle error responses from API
        if (data.errors) {
          console.log('Field errors:', data.errors);
          setFieldErrors(data.errors);
          toast.error(data.message || 'Error loading profile data');
        }
        
        // Handle different response structures
        const profileData = data.data || data.user || data;
        
        // Ensure all fields are properly set
        const profile = {
          name: profileData?.name || auth.user?.name || 'Farmer',
          email: profileData?.email || auth.user?.email || 'farmer@example.com',
          location: profileData?.location || '',
          phoneNumber: profileData?.phoneNumber || profileData?.phone || '',
          farmSize: profileData?.farmSize || profileData?.farm_size || '',
          joinedDate: profileData?.joinedDate || profileData?.joined_date || new Date().toLocaleDateString(),
        };
        
        console.log('Processed Profile:', profile);
        setUserProfile(profile);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.message || `Error ${response.status}: ${response.statusText}`;
        setApiError(errorMessage);
        toast.error(errorMessage);
        
        // Fallback to auth user data
        setUserProfile({
          name: auth.user?.name || 'Farmer',
          email: auth.user?.email || 'farmer@example.com',
          location: '',
          phoneNumber: '',
          farmSize: '',
          joinedDate: new Date().toLocaleDateString(),
        });
      }

      // Mock stats
      setStats({
        feedbackCount: 12,
        diseaseDetections: 24,
        cropRotations: 8,
        totalPoints: 450,
        lastActivity: '2 hours ago',
        achievements: [
          { icon: '🎯', name: t.achievement1, unlocked: true },
          { icon: '⭐', name: t.achievement2, unlocked: true },
          { icon: '🚀', name: t.achievement3, unlocked: true },
        ],
      });
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      const errorMsg = error?.message || 'Failed to load profile data';
      setApiError(errorMsg);
      toast.error(errorMsg);
      setUserProfile({
        name: auth.user?.name || 'Farmer',
        email: auth.user?.email || 'farmer@example.com',
        location: '',
        phoneNumber: '',
        farmSize: '',
        joinedDate: new Date().toLocaleDateString(),
      });
      setStats({
        feedbackCount: 0,
        diseaseDetections: 0,
        cropRotations: 0,
        totalPoints: 0,
        achievements: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!auth.user) {
    return (
      <section className={`min-h-screen py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {language === 'en' ? 'Please login to view your dashboard' : 'कृपया डैशबोर्ड देखने के लिए लॉगिन करें'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`min-h-screen py-24 ${
        darkMode
          ? 'bg-gradient-to-b from-gray-900 to-gray-800'
          : 'bg-gradient-to-b from-white to-[#F1C40F]/10'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Banner */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg border-l-4 flex items-start gap-3 ${
              darkMode
                ? 'bg-red-900/20 border-red-600 text-red-300'
                : 'bg-red-50 border-red-400 text-red-700'
            }`}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error Loading Data</p>
              <p className="text-sm">{apiError}</p>
            </div>
          </motion.div>
        )}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t.subtitle}</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="w-12 h-12 animate-spin text-[#2ECC71]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`lg:col-span-1 p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#2ECC71] to-[#27AE60] flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userProfile?.name}
                </h3>
                <div className={`flex items-center justify-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Mail className="w-4 h-4" />
                  {userProfile?.email}
                </div>
              </div>

              {userProfile?.location && (
                <div>
                  <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${
                    fieldErrors?.location
                      ? darkMode ? 'bg-red-900/30 border border-red-600' : 'bg-red-50 border border-red-400'
                      : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <MapPin className="w-5 h-5 text-[#2ECC71]" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {userProfile.location}
                    </span>
                  </div>
                  {fieldErrors?.location && (
                    <p className="text-xs text-red-500 -mt-3 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.location}
                    </p>
                  )}
                </div>
              )}

              {userProfile?.phoneNumber && (
                <div>
                  <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${
                    fieldErrors?.phoneNumber
                      ? darkMode ? 'bg-red-900/30 border border-red-600' : 'bg-red-50 border border-red-400'
                      : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Mail className="w-5 h-5 text-[#2ECC71]" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {userProfile.phoneNumber}
                    </span>
                  </div>
                  {fieldErrors?.phoneNumber && (
                    <p className="text-xs text-red-500 -mt-3 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.phoneNumber}
                    </p>
                  )}
                </div>
              )}

              {userProfile?.farmSize && (
                <div>
                  <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${
                    fieldErrors?.farmSize
                      ? darkMode ? 'bg-red-900/30 border border-red-600' : 'bg-red-50 border border-red-400'
                      : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Leaf className="w-5 h-5 text-[#2ECC71]" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {userProfile.farmSize} acres
                    </span>
                  </div>
                  {fieldErrors?.farmSize && (
                    <p className="text-xs text-red-500 -mt-3 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.farmSize}
                    </p>
                  )}
                </div>
              )}

              <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.memberSince}
                </p>
                <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userProfile?.joinedDate || 'Recently'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {!isEditing ? (
                  <>
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsEditing(true)}
                        className="flex-1 py-2 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg"
                      >
                        <User className="w-4 h-4" />
                        {t.editProfile}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          auth.logout();
                          toast.success(language === 'en' ? 'Logged out successfully' : 'सफलतापूर्वक लॉग आउट');
                        }}
                        className="py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg"
                      >
                        <LogOut className="w-4 h-4" />
                        {t.logout}
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="space-y-3">
                      <div>
                        <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                        <input placeholder="Full name" aria-label="name" value={editForm?.name || ''} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className={`w-full p-2 rounded-lg ${fieldErrors?.name ? 'border-2 border-red-500' : ''}`} />
                        {fieldErrors?.name && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                        <input placeholder="Email" aria-label="email" value={editForm?.email || ''} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className={`w-full p-2 rounded-lg ${fieldErrors?.email ? 'border-2 border-red-500' : ''}`} />
                        {fieldErrors?.email && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                        <input placeholder="Phone number" aria-label="phone" value={editForm?.phoneNumber || ''} onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })} className={`w-full p-2 rounded-lg ${fieldErrors?.phoneNumber ? 'border-2 border-red-500' : ''}`} />
                        {fieldErrors?.phoneNumber && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.phoneNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Farm Size</label>
                        <input placeholder="Farm size (e.g., 2 acres)" aria-label="farmSize" value={editForm?.farmSize || ''} onChange={(e) => setEditForm({ ...editForm, farmSize: e.target.value })} className={`w-full p-2 rounded-lg ${fieldErrors?.farmSize ? 'border-2 border-red-500' : ''}`} />
                        {fieldErrors?.farmSize && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.farmSize}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                        <div className="flex gap-2">
                          <input placeholder="Location (city, state)" aria-label="location" value={editForm?.location || ''} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} className={`flex-1 p-2 rounded-lg ${fieldErrors?.location ? 'border-2 border-red-500' : ''}`} />
                          <button type="button" onClick={async () => {
                            if (!navigator.geolocation) {
                              toast.error('Geolocation not supported');
                              return;
                            }
                            toast('Fetching location...');
                            navigator.geolocation.getCurrentPosition(async (pos) => {
                              try {
                                const lat = pos.coords.latitude;
                                const lon = pos.coords.longitude;
                                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                                const data = await res.json();
                                const name = data.address?.city || data.address?.town || data.address?.county || data.display_name || '';
                                setEditForm({ ...editForm, location: name });
                                toast.success(language === 'en' ? 'Location detected' : 'स्थान मिला');
                              } catch (err) {
                                console.error(err);
                                toast.error('Could not detect location');
                              }
                            }, (err) => {
                              console.error(err);
                              toast.error('Permission denied or unable to get location');
                            });
                          }} className="px-3 py-2 bg-blue-600 text-white rounded-lg">Use my location</button>
                        </div>
                        {fieldErrors?.location && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.location}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 mt-3">
                        <button onClick={async () => {
                          try {
                            await auth.updateProfile(editForm || {});
                            toast.success(language === 'en' ? 'Profile updated' : 'प्रोफ़ाइल अपडेट की गई');
                            setIsEditing(false);
                            // Refresh displayed data
                            fetchUserData();
                          } catch (err: any) {
                            console.error(err);
                            toast.error(err?.message || 'Update failed');
                          }
                        }} className="flex-1 py-2 bg-green-600 text-white rounded-lg">Save</button>

                        <button onClick={() => { setIsEditing(false); }} className="py-2 px-4 bg-gray-300 rounded-lg">Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageSquare, label: t.feedback, value: stats?.feedbackCount, color: 'from-blue-500 to-blue-600' },
                  { icon: Leaf, label: t.diseaseDetections, value: stats?.diseaseDetections, color: 'from-green-500 to-green-600' },
                  { icon: TrendingUp, label: t.cropRotations, value: stats?.cropRotations, color: 'from-purple-500 to-purple-600' },
                  { icon: Award, label: t.totalPoints, value: stats?.totalPoints, color: 'from-yellow-500 to-yellow-600' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      whileHover={{ y: -5 }}
                      className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                    >
                      <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                      </p>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Achievements */}
              {stats?.achievements && stats.achievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                >
                  <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t.achievements}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {stats.achievements.map((achievement: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * idx }}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-lg text-center ${
                          achievement.unlocked
                            ? darkMode ? 'bg-gray-700' : 'bg-yellow-50'
                            : darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                        }`}
                      >
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {achievement.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
