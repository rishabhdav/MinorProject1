import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Sprout, Loader2, CheckCircle2 } from 'lucide-react';

interface CropRotationProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}
type CropField =
  | "N"
  | "P"
  | "K"
  | "temperature"
  | "humidity"
  | "ph"
  | "rainfall";


export default function CropRotation({ darkMode, language }: CropRotationProps) {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const [error, setError] = useState<string | null>(null);

const handleInputChange = (field: CropField, value: string) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value === "" ? "" : value
  }));
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsAnalyzing(true);
  setRecommendation(null);
  setError(null);

  const toNum = (v: string) => v.trim() === "" ? null : Number(v);

  const payload = {
    N: toNum(formData.N),
    P: toNum(formData.P),
    K: toNum(formData.K),
    temperature: toNum(formData.temperature),
    humidity: toNum(formData.humidity),
    ph: toNum(formData.ph),
    rainfall: toNum(formData.rainfall)
  };

  console.log("Sending payload:", payload);  // Debug

  try {
    const response = await fetch("http://localhost:8080/api/recommend-crop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Failed to get crop recommendations");

    const data = await response.json();
    setRecommendation(data);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setIsAnalyzing(false);
  }
};

  const handleReset = () => {
    setFormData({
      N: '',
      P: '',
      K: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
    });
    setRecommendation(null);
    setError(null);
  };

  return (
    <section className={`min-h-screen py-24 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-yellow-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            🌾 Crop Rotation Advisor
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Get intelligent crop rotation recommendations for sustainable farming
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
              <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Soil & Environmental Data
              </h3>

              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {/* NPK Values */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    N (Nitrogen) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0-100"
                    value={formData.N}
                    onChange={(e) => handleInputChange('N', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                    } focus:outline-none`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    P (Phosphorus) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0-100"
                    value={formData.P}
                    onChange={(e) => handleInputChange('P', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                    } focus:outline-none`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    K (Potassium) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0-100"
                    value={formData.K}
                    onChange={(e) => handleInputChange('K', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                    } focus:outline-none`}
                  />
                </div>
              </div>

              {/* Environmental Factors */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Temperature (°C) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0-50"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                    } focus:outline-none`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Humidity (%) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0-100"
                    value={formData.humidity}
                    onChange={(e) => handleInputChange('humidity', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                    } focus:outline-none`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    pH *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0-14"
                    value={formData.ph}
                    onChange={(e) => handleInputChange('ph', e.target.value)}
                    step="0.1"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                    } focus:outline-none`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Rainfall (mm) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0-500"
                    value={formData.rainfall}
                    onChange={(e) => handleInputChange('rainfall', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-green-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
                    } focus:outline-none`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isAnalyzing}
                className="w-full px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Get Recommendations
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Recommendation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl p-8 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-blue-50 shadow-xl'}`}
          >
            <div className="mb-8">
              <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🌾 Top Crop Recommendations
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Based on your soil and environmental conditions
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 className="w-20 h-20 text-green-500" />
                  </motion.div>
                  <p className={`mt-6 text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Analyzing your soil...
                  </p>
                </motion.div>
              )}

              {recommendation && !isAnalyzing && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-5"
                >
                  {recommendation.top_3_crops && recommendation.top_3_crops.map((crop: any, index: number) => {
                    const colors = [
                      { bg: 'from-amber-400 to-yellow-500', bgLight: 'from-yellow-100 to-amber-100', icon: 'bg-gradient-to-br from-yellow-500 to-amber-600', border: 'border-yellow-400', medal: '🥇' },
                      { bg: 'from-gray-400 to-gray-500', bgLight: 'from-gray-100 to-slate-100', icon: 'bg-gradient-to-br from-gray-400 to-gray-600', border: 'border-gray-400', medal: '🥈' },
                      { bg: 'from-orange-300 to-amber-400', bgLight: 'from-orange-100 to-yellow-100', icon: 'bg-gradient-to-br from-orange-400 to-amber-600', border: 'border-orange-400', medal: '🥉' }
                    ];
                    const color = colors[index];
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ scale: 1.02, translateY: -5 }}
                        className={`relative overflow-hidden rounded-xl border-2 ${color.border} ${
                          darkMode
                            ? `bg-gradient-to-r ${color.bg} shadow-xl`
                            : `bg-gradient-to-r ${color.bgLight} shadow-lg`
                        }`}
                      >
                        {/* Background accent */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${color.bg} opacity-20 rounded-full -mr-16 -mt-16`} />
                        
                        <div className="relative p-6 z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${color.icon} text-white text-2xl`}>
                                <Sprout className="w-7 h-7" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-2xl">{color.medal}</span>
                                  <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {crop.crop.charAt(0).toUpperCase() + crop.crop.slice(1)}
                                  </h4>
                                </div>
                                <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                  Rank {index + 1} recommendation
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.15 + 0.3 }}
                                className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}
                              >
                                {(crop.confidence * 100).toFixed(1)}%
                              </motion.p>
                              <p className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                Confidence
                              </p>
                            </div>
                          </div>

                          {/* Confidence Progress Bar */}
                          <div className="mt-5">
                            <div className={`w-full rounded-full h-4 ${darkMode ? 'bg-black/30' : 'bg-white/50'} overflow-hidden border-2 border-white/40`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${crop.confidence * 100}%` }}
                                transition={{ duration: 1, ease: 'easeOut', delay: index * 0.15 + 0.2 }}
                                style={{
                                  background: index === 0 ? 'linear-gradient(to right, rgb(251, 191, 36), rgb(234, 179, 8))' : 
                                              index === 1 ? 'linear-gradient(to right, rgb(107, 114, 128), rgb(75, 85, 99))' :
                                              'linear-gradient(to right, rgb(249, 115, 22), rgb(217, 119, 6))'
                                }}
                                className="h-4 rounded-full shadow-lg"
                              />
                            </div>
                            <p className={`text-xs mt-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                              {crop.confidence < 0.3 && '💡 Good alternative choice'}
                              {crop.confidence >= 0.3 && crop.confidence < 0.7 && '⭐ Strong option'}
                              {crop.confidence >= 0.7 && '✨ Excellent match for your soil'}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Summary Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className={`mt-8 p-6 rounded-xl border-2 ${
                      darkMode
                        ? 'bg-gradient-to-r from-green-900/40 to-teal-900/40 border-green-500'
                        : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400'
                    }`}
                  >
                    <p className={`text-sm font-semibold ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                      💡 Tip: Plant the highest confidence crop for maximum yield
                    </p>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className={`w-full mt-6 px-6 py-4 rounded-xl font-semibold transition-all ${
                      darkMode
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg'
                    }`}
                  >
                    🔄 New Analysis
                  </motion.button>
                </motion.div>
              )}

              {!recommendation && !isAnalyzing && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
                    darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-blue-100 to-green-100'
                  }`}>
                    <Sprout className={`w-12 h-12 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Ready to find the best crops?
                  </p>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Fill in the soil data on the left to get personalized recommendations
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
