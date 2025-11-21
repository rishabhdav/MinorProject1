import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, CheckCircle, AlertCircle, Loader2, Leaf, Droplet } from 'lucide-react';
import { toast } from 'sonner';

interface CropDiseaseDetectionProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

interface DiseaseResult {
  class_index: number;
  label: string;
  confidence: number;
  severity: string;
  symptoms: string;
  cure: string;
  recommended_chemicals: string[];
  organic_solutions: string[];
  prevention: string;
}

export default function CropDiseaseDetection({ darkMode, language }: CropDiseaseDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiBaseUrl = (import.meta as any).env.VITE_API_BASE || 'http://localhost:8080/api';

  const t = {
    en: {
      title: '🌿 Crop Disease Detection',
      subtitle: 'Upload an image of your crop to detect diseases with AI-powered analysis',
      dropText: 'Drop your image here',
      clickText: 'or click to browse',
      supportText: 'Supports: JPG, PNG, WebP',
      analyzeBtn: 'Analyze Image',
      analyzing: 'Analyzing your crop image...',
      results: 'Analysis Results',
      confidence: 'Confidence',
      detected: 'Detected Disease',
      severity: 'Severity',
      symptoms: '🔍 Symptoms',
      cure: '💊 Recommended Treatment',
      chemicals: '🧪 Recommended Chemicals',
      organic: '🌱 Organic Solutions',
      prevention: '🛡️ Prevention Tips',
      another: 'Analyze Another Image',
      uploadAnother: 'Upload an image to see analysis results',
      uploadError: 'Please select an image file',
      apiError: 'Error analyzing image. Please try again.',
    },
    hi: {
      title: '🌿 फसल रोग पहचान',
      subtitle: 'AI-संचालित विश्लेषण के साथ अपनी फसल के रोग का पता लगाने के लिए एक छवि अपलोड करें',
      dropText: 'अपनी छवि यहाँ ड्रॉप करें',
      clickText: 'या ब्राउज़ करने के लिए क्लिक करें',
      supportText: 'समर्थित: JPG, PNG, WebP',
      analyzeBtn: 'छवि का विश्लेषण करें',
      analyzing: 'आपकी फसल की छवि का विश्लेषण किया जा रहा है...',
      results: 'विश्लेषण परिणाम',
      confidence: 'आत्मविश्वास',
      detected: 'पता चला रोग',
      severity: 'गंभीरता',
      symptoms: '🔍 लक्षण',
      cure: '💊 अनुशंसित उपचार',
      chemicals: '🧪 अनुशंसित रसायन',
      organic: '🌱 जैविक समाधान',
      prevention: '🛡️ रोकथाम सुझाव',
      another: 'दूसरी छवि का विश्लेषण करें',
      uploadAnother: 'विश्लेषण परिणाम देखने के लिए एक छवि अपलोड करें',
      uploadError: 'कृपया एक छवि फ़ाइल का चयन करें',
      apiError: 'छवि का विश्लेषण करने में त्रुटि। कृपया पुनः प्रयास करें।',
    }
  };

  const currentText = t[language];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      toast.error(currentText.uploadError);
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch(`${apiBaseUrl}/disease/detect`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(currentText.apiError);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Disease detection error:', err);
      setError(err.message || currentText.apiError);
      toast.error(err.message || currentText.apiError);
    } finally {
      setIsAnalyzing(false);
      // Clear file input value so selecting the same file again triggers onChange
      try {
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (e) {
        // ignore
      }
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setResult(null);
    setIsAnalyzing(false);
    setError(null);
    try {
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (e) {
      // ignore
    }
  };

  const getSeverityColor = (severity: string) => {
    const severityLower = severity.toLowerCase();
    if (severityLower === 'low' || severityLower === 'mild') return 'text-green-600';
    if (severityLower === 'medium' || severityLower === 'moderate') return 'text-yellow-600';
    if (severityLower === 'high' || severityLower === 'severe') return 'text-red-600';
    return 'text-gray-600';
  };

  const getSeverityBgColor = (severity: string) => {
    const severityLower = severity.toLowerCase();
    if (severityLower === 'low' || severityLower === 'mild') return 'bg-green-600';
    if (severityLower === 'medium' || severityLower === 'moderate') return 'bg-yellow-600';
    if (severityLower === 'high' || severityLower === 'severe') return 'bg-red-600';
    return 'bg-gray-600';
  };

  return (
    <section className={`min-h-screen py-24 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-green-50 to-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {currentText.title}
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {currentText.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !selectedImage && fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                isDragging
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : darkMode
                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  : 'border-gray-300 bg-white hover:border-green-500'
              }`}
            >
              {!selectedImage ? (
                <div className="flex flex-col items-center justify-center py-16 px-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload className={`w-16 h-16 mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  </motion.div>
                  <p className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {currentText.dropText}
                  </p>
                  <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentText.clickText}
                  </p>
                  <p className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {currentText.supportText}
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Uploaded crop"
                    className="w-full h-96 object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      reset();
                    }}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              )}
              <input
                aria-label="Upload crop disease image for detection"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {selectedImage && !result && !isAnalyzing && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={analyzeImage}
                className="w-full mt-4 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
              >
                {currentText.analyzeBtn}
              </motion.button>
            )}
          </motion.div>

          {/* Results Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}
          >
            <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentText.results}
            </h3>

            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <Loader2 className="w-16 h-16 text-green-600 animate-spin mb-4" />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {currentText.analyzing}
                  </p>
                </motion.div>
              )}

              {result && !isAnalyzing && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  {/* Confidence Score */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {currentText.confidence}
                      </span>
                      <span className={`font-bold text-lg ${getSeverityColor(result.severity)}`}>
                        {(result.confidence * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className={`h-4 rounded-full overflow-hidden shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full ${getSeverityBgColor(result.severity)} rounded-full`}
                      />
                    </div>
                  </div>

                  {/* Disease Name & Severity */}
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      {result.severity.toLowerCase() === 'low' || result.severity.toLowerCase() === 'mild' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className={`w-5 h-5 ${getSeverityColor(result.severity)}`} />
                      )}
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentText.detected}
                      </span>
                    </div>
                    <p className={`text-lg font-bold mb-2 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                      {result.label}
                    </p>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {currentText.severity}: <span className={`font-bold ${getSeverityColor(result.severity)}`}>
                        {result.severity.toUpperCase()}
                      </span>
                    </p>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h4 className={`mb-2 font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentText.symptoms}
                    </h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {result.symptoms}
                    </p>
                  </div>

                  {/* Treatment / Cure */}
                  <div>
                    <h4 className={`mb-2 font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentText.cure}
                    </h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {result.cure}
                    </p>
                  </div>

                  {/* Recommended Chemicals */}
                  {result.recommended_chemicals && result.recommended_chemicals.length > 0 && (
                    <div>
                      <h4 className={`mb-3 font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentText.chemicals}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {result.recommended_chemicals.map((chemical, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className={`p-3 rounded-lg flex items-center gap-2 ${
                              darkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}
                          >
                            <Droplet className="w-4 h-4 text-blue-500" />
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {chemical}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Organic Solutions */}
                  {result.organic_solutions && result.organic_solutions.length > 0 && (
                    <div>
                      <h4 className={`mb-3 font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentText.organic}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {result.organic_solutions.map((solution, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className={`p-3 rounded-lg flex items-center gap-2 ${
                              darkMode ? 'bg-green-900/30 border border-green-700/50' : 'bg-green-50 border border-green-200'
                            }`}
                          >
                            <Leaf className="w-4 h-4 text-green-600" />
                            <span className={darkMode ? 'text-green-300' : 'text-green-700'}>
                              {solution}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prevention */}
                  <div>
                    <h4 className={`mb-2 font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {currentText.prevention}
                    </h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {result.prevention}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={reset}
                    className={`w-full mt-6 px-6 py-3 rounded-lg transition-colors font-semibold ${
                      darkMode
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    {currentText.another}
                  </motion.button>
                </motion.div>
              )}

              {!result && !isAnalyzing && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Upload className={`w-10 h-10 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  </div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {currentText.uploadAnother}
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
