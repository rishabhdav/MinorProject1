# 🌾 Krishi Mitre - Smart Farming Companion App

## 📱 Overview
Krishi Mitre is a comprehensive **AI-powered agricultural mobile web application** designed to empower Indian farmers with modern farming techniques, real-time monitoring, and intelligent recommendations.

---

## ✨ Key Features

### 1. **🔐 Authentication System**
- ✅ Email/Password Authentication (API-based)
- ✅ User Registration and Login
- ✅ Secure Token Management (localStorage)
- ✅ Protected Routes with Feature Locking
- ✅ Session Management

### 2. **🦠 Disease Detection**
- AI-powered crop disease identification
- Image recognition (Banana Leaf Spot, Early Blight, etc.)
- Detailed treatment recommendations
- Prevention strategies
- Region-specific disease database

### 3. **🔄 Crop Rotation Planning**
- Smart crop rotation recommendations
- Season-based planning
- Soil health considerations
- Crop compatibility analysis
- Sustainable farming practices

### 4. **☁️ Weather Prediction & Alerts**
- Real-time weather data from Open-Meteo API
- **Auto-geolocation detection** (GPS-based)
- Reverse geocoding (GPS → City name)
- 7-day detailed forecast
- Smart farming advice based on weather conditions
- Weather code to emoji mapping
- Bilingual weather information

### 5. **🌱 Smart Crop Recommendation Engine** ⭐ *NEW*
- AI-based crop recommendations
- Filters: Location, Season (Kharif/Rabi/Summer)
- Soil type analysis (Clay/Loam/Sandy/Silty)
- Expected yield predictions
- Water requirement calculations
- Best planting months
- Profitability indicators

### 6. **📊 Analytics Dashboard** ⭐ *NEW*
- Feedback statistics & insights
- Rating distribution charts (animated bar charts)
- Average rating calculations
- User engagement metrics
- Latest feedback display
- Visual data representation

### 7. **👨‍🌾 Farmer Dashboard** ⭐ *NEW*
- User profile with photo
- Personal statistics (feedbacks, detections, points)
- Achievement system with badges
- Membership information
- One-click logout

### 8. **🔍 Smart Search & Filter** ⭐ *NEW*
- Real-time search across all content
- Category filtering (Diseases, Crops, Tutorials)
- Difficulty level filters (Easy/Medium/Advanced)
- Season-based filtering
- Advanced search results with metadata
- Bilingual search support

### 9. **🔔 Notifications & Alerts** ⭐ *NEW*
- Weather alerts (Rain, Heatwave, Frost)
- Disease warnings with regional alerts
- Seasonal farming tips
- Smart recommendations
- Priority levels (High/Medium/Low)
- Dismissable notifications
- Tab-based filtering

### 10. **💬 Feedback System**
- Star-based rating (1-5 stars)
- Personalized success responses
- API integration for submissions
- User name fetching from backend
- Rating-based success messages
- Loading states with spinners
- Toast notifications (bilingual)

### 11. **📚 Tutorials & Learning**
- Step-by-step farming techniques
- Video resources (embedded)
- Common questions addressed
- Best practices documentation

### 12. **❓ FAQ Section**
- Common farming questions
- Bilingual answers
- Category-wise organization
- Quick access to solutions

### 13. **🎨 Modern UI/UX**
- Dark Mode / Light Mode toggle
- Mode persistence (localStorage)
- Smooth animations (motion/react)
- Responsive design (Mobile/Tablet/Desktop)
- Gradient backgrounds and effects
- Interactive hover effects
- Smooth transitions

### 14. **🌐 Bilingual Support**
- **English & Hindi** throughout the app
- Bilingual content in all components
- Language toggle in header
- Persistent language preference
- RTL-ready structure

---

## 🏗️ Tech Stack

### Frontend
- **React 18+** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **motion/react** - Animations
- **lucide-react** - Icons
- **sonner** - Toast Notifications
- **Vite** - Build Tool

### API Integration
- **Open-Meteo** - Weather Data (Free, No API Key)
- **OpenStreetMap Nominatim** - Reverse Geocoding
- **Custom Backend** - Auth, Feedback, User Profile
- **Browser Geolocation API** - Auto-location detection

### State Management
- React Hooks (useState, useEffect)
- Context API (AuthContext)
- localStorage for persistence

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx                 # Navigation & Auth Status
│   ├── Hero.tsx                   # Landing Section
│   ├── Features.tsx               # Feature Highlights
│   ├── CropDiseaseDetection.tsx  # Disease Detection
│   ├── CropRotation.tsx          # Rotation Planning
│   ├── WeatherPrediction.tsx     # Weather & Forecasts
│   ├── Tutorials.tsx              # Learning Materials
│   ├── FAQ.tsx                    # Q&A Section
│   ├── Feedback.tsx              # User Feedback Collection
│   ├── About.tsx                  # About Us (Bilingual)
│   ├── Analytics.tsx              # Dashboard Analytics ⭐
│   ├── CropRecommendation.tsx    # AI Recommendations ⭐
│   ├── FarmerDashboard.tsx       # User Dashboard ⭐
│   ├── SearchFilter.tsx          # Smart Search ⭐
│   ├── Notifications.tsx         # Alerts System ⭐
│   ├── LoginModal.tsx            # Auth Modal
│   ├── Footer.tsx                 # Footer Section
│   └── EntranceAnimation.tsx     # Splash Screen
├── context/
│   └── AuthContext.tsx            # Auth State Management
├── hooks/
│   └── useRequireAuth.tsx        # Protected Component
├── App.tsx                         # Main App Component
└── main.tsx                        # Entry Point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Navigate to project
cd "Krishi Mitre Website Design"

# Install dependencies
npm install

# Set environment variables
# Create .env file with:
VITE_API_BASE=http://localhost:8080/api

# Start development server
npm run dev

# Build for production
npm run build
```

### Running the App
The app will be available at `http://localhost:3001` (or next available port)

---

## 🔑 API Endpoints Required

### Authentication
- `POST /farmer/login` - User Login
- `POST /farmer/signup` - User Registration
- `GET /farmer/profile` - Get User Profile

### Data
- `POST /feedback` - Submit Feedback
- `GET /analytics` - Get Analytics Data
- `POST /recommendations` - Get Crop Recommendations

### External APIs
- **Open-Meteo**: `/v1/forecast` - Weather Data
- **Nominatim**: `/reverse` - Reverse Geocoding

---

## 🎯 Features by Category

### User Authentication
- ✅ Secure Login/Signup
- ✅ Token-based Auth
- ✅ Protected Routes
- ✅ Session Management

### Farming Tools
- ✅ Disease Detection
- ✅ Crop Rotation
- ✅ Weather Forecasting
- ✅ Crop Recommendations (AI)
- ✅ Smart Notifications

### User Engagement
- ✅ Feedback System
- ✅ Analytics Dashboard
- ✅ User Dashboard
- ✅ Achievement Badges
- ✅ Smart Search

### Learning & Support
- ✅ Tutorials
- ✅ FAQ Section
- ✅ About Page
- ✅ Help Resources

### Experience
- ✅ Dark Mode
- ✅ Bilingual (EN/HI)
- ✅ Responsive Design
- ✅ Smooth Animations
- ✅ Toast Notifications

---

## 📊 API Response Examples

### Weather API
```json
{
  "latitude": 30.7333,
  "longitude": 76.7794,
  "weather": {
    "temperature": 28,
    "humidity": 65,
    "windSpeed": 12
  }
}
```

### Feedback Submission
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "feedbackId": 123
}
```

### Crop Recommendations
```json
{
  "recommendations": [
    {
      "name": "Rice",
      "yield": "60 quintals/hectare",
      "profitability": "high"
    }
  ]
}
```

---

## 🎨 UI Features

### Dark Mode
- Toggle in header
- Persisted to localStorage
- Applied globally
- Smooth transitions

### Animations
- Page transitions
- Button interactions
- Loading spinners
- Card hover effects
- Smooth scrolls

### Responsive Design
- Mobile first approach
- Tablet optimized
- Desktop enhanced
- Touch-friendly
- Hamburger menu

---

## 🔐 Security Features

- ✅ Token-based Authentication
- ✅ localStorage for secure storage
- ✅ Protected routes with React Context
- ✅ Form validation
- ✅ Error handling
- ✅ HTTPS ready

---

## 🌍 Bilingual Content

All components support **English & Hindi**:
- Navigation menus
- Form labels
- Error/Success messages
- Content sections
- Toast notifications
- Modal dialogs

---

## 📱 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Browsers
- ✅ Progressive Enhancement

---

## 🎓 Learning Outcomes

This project demonstrates:
- React Hooks & Context API
- TypeScript for type safety
- Tailwind CSS styling
- API integration patterns
- Animation libraries
- State management
- Responsive design
- Bilingual application
- Mobile-first development

---

## 📈 Performance Optimizations

- Code splitting with React.lazy()
- Image optimization
- CSS minification
- Tree shaking
- LocalStorage caching
- Efficient re-renders

---

## 🐛 Known Issues & Future Enhancements

### Planned Features
- [ ] Offline mode with Service Workers
- [ ] Multi-language support (Marathi, Tamil, Telugu)
- [ ] Video streaming
- [ ] Push notifications
- [ ] Payment integration
- [ ] Advanced ML models
- [ ] Real-time chat
- [ ] Market prices

---

## 📝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

---

## 📄 License

MIT License - Feel free to use for educational purposes

---

## 👥 Author

**Krishi Mitre Development Team**

---

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Email support
- Check FAQ section

---

## 🎉 Deployment

### Recommended Platforms
- Vercel (Recommended)
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting
- GitHub Pages

### Environment Setup
```env
VITE_API_BASE=https://your-backend-api.com/api
```

---

## 📚 Documentation

See individual component files for detailed documentation and usage examples.

---

**Last Updated**: November 15, 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
