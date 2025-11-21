# 🚀 Krishi Mitre - Deployment & Setup Guide

This guide covers setting up and deploying the Krishi Mitre application in different environments.

---

## 📋 Prerequisites

### System Requirements
- Node.js 18+ LTS
- npm 9+ or yarn
- Git
- 2GB RAM minimum
- 500MB disk space

### Accounts Needed (for deployment)
- GitHub account (for code hosting)
- Vercel account (recommended for deployment)
- Or Netlify account (alternative)

---

## 🏠 Local Development Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/krishi-mitre.git
cd krishi-mitre
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- React 18+
- TypeScript
- Tailwind CSS
- motion/react
- lucide-react
- sonner
- All UI components

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=10000

# Weather API (Open-Meteo - Free, no key needed)
VITE_WEATHER_API=https://api.open-meteo.com

# Geocoding API (Nominatim - Free)
VITE_GEO_API=https://nominatim.openstreetmap.org

# App Settings
VITE_APP_NAME=Krishi Mitre
VITE_APP_VERSION=1.0.0
VITE_DEBUG=false
```

### Step 4: Start Development Server
```bash
npm run dev
```

Application will be available at: `http://localhost:5173`

### Step 5: Build & Preview (Optional)
```bash
npm run build
npm run preview
```

---

## 🔧 Backend Setup

### Option 1: Node.js + Express (Recommended)

Create a `server.js` file:

```javascript
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(cors());
app.use(express.json());

// ==================
// Authentication Routes
// ==================

app.post('/farmer/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // TODO: Hash password with bcrypt
    // TODO: Save to database
    
    const token = jwt.sign({ email, name }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      success: true,
      token,
      message: 'Signup successful'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/farmer/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // TODO: Fetch from database
    // TODO: Verify password
    
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      success: true,
      token,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// ==================
// Protected Routes Middleware
// ==================

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ==================
// User Profile
// ==================

app.get('/farmer/profile', authenticate, (req, res) => {
  // TODO: Fetch user profile from database
  res.json({
    name: req.user.name || 'Farmer',
    email: req.user.email,
    location: 'Your Farm',
    memberSince: '2025-01-01'
  });
});

// ==================
// Feedback Endpoints
// ==================

app.post('/feedback', authenticate, (req, res) => {
  const { rating, comment } = req.body;
  
  // TODO: Save feedback to database
  
  res.json({
    success: true,
    message: 'Feedback submitted',
    id: Date.now()
  });
});

app.get('/analytics', authenticate, (req, res) => {
  // TODO: Calculate from database
  res.json({
    totalFeedback: 42,
    averageRating: 4.2,
    ratingDistribution: {
      1: 2,
      2: 3,
      3: 8,
      4: 15,
      5: 14
    },
    totalUsers: 128,
    latestFeedback: []
  });
});

// ==================
// Recommendations
// ==================

app.post('/recommendations', authenticate, (req, res) => {
  const { location, season, soilType } = req.body;
  
  // TODO: Run ML model or query database
  
  res.json({
    recommendations: [
      {
        crop: 'Rice',
        yield: '5 tons/acre',
        waterRequired: '1200 mm',
        plantingMonth: 'June-July',
        profitability: 'High'
      }
    ]
  });
});

// ==================
// Error Handling
// ==================

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

Install backend dependencies:
```bash
npm init -y
npm install express cors jsonwebtoken dotenv bcryptjs
npm install -D nodemon
```

Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

Start backend:
```bash
npm run dev
```

### Option 2: Firebase (No-Backend Setup)

```javascript
// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

**Advantages:**
- Free for public projects
- Automatic deployments from GitHub
- Built-in analytics
- Global CDN
- Serverless functions

**Steps:**

1. Push code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Set environment variables:
   - `VITE_API_BASE_URL`
   - `VITE_WEATHER_API`
   - `VITE_GEO_API`
5. Click "Deploy"

**Vercel CLI Method:**
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

**Steps:**

1. Build the project
```bash
npm run build
```

2. Go to https://app.netlify.com/
3. Drag and drop the `dist/` folder
4. Or connect GitHub for auto-deployments

**Netlify CLI Method:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: GitHub Pages

```bash
# Update vite.config.ts
export default {
  base: '/krishi-mitre/',
  // ... rest of config
}

npm run build
npm install -g gh-pages
gh-pages -d dist
```

---

## 📦 Backend Deployment

### Option 1: Railway

```bash
railway init
railway add
railway start
```

### Option 2: Render

1. Push code to GitHub
2. Go to https://render.com/
3. Create new Web Service
4. Connect GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`

### Option 3: Heroku

```bash
heroku login
heroku create krishi-mitre-api
git push heroku main
```

### Option 4: AWS EC2

```bash
# SSH into instance
ssh -i key.pem ubuntu@your-instance-ip

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo
cd krishi-mitre
npm install

# Install PM2 for process management
sudo npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for NoSQL)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/krishi_mitre
```

**Create Schema:**

```javascript
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  location: String,
  soilType: String,
  crops: [String],
  createdAt: Date
});

const feedbackSchema = new mongoose.Schema({
  farmerId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  createdAt: Date
});

module.exports = {
  Farmer: mongoose.model('Farmer', farmerSchema),
  Feedback: mongoose.model('Feedback', feedbackSchema)
};
```

### PostgreSQL (Alternative for SQL)

1. Install: `sudo apt-get install postgresql`
2. Create database: `createdb krishi_mitre`
3. Update connection string

---

## 🔐 Environment Variables Checklist

### Frontend (.env)
- [ ] `VITE_API_BASE_URL`
- [ ] `VITE_WEATHER_API`
- [ ] `VITE_GEO_API`
- [ ] `VITE_APP_NAME`
- [ ] `VITE_DEBUG`

### Backend (.env)
- [ ] `PORT`
- [ ] `NODE_ENV`
- [ ] `JWT_SECRET`
- [ ] `MONGODB_URI` or database connection string
- [ ] `CORS_ORIGIN`
- [ ] `API_TIMEOUT`

---

## 🧪 Testing Before Deployment

### Local Testing
```bash
# Unit tests
npm run test

# Build test
npm run build

# Preview build
npm run preview
```

### Testing Checklist
- [ ] Login/Signup works
- [ ] Protected routes redirect
- [ ] Weather API loads data
- [ ] Dark mode persists
- [ ] Language switch works
- [ ] Mobile responsive
- [ ] All animations smooth
- [ ] No console errors

---

## 📊 Production Checklist

### Security
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] CORS properly configured
- [ ] JWT tokens secure
- [ ] Passwords hashed
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] Rate limiting enabled

### Performance
- [ ] Bundle optimized
- [ ] Images compressed
- [ ] Caching configured
- [ ] CDN setup
- [ ] Database indexed
- [ ] API responses optimized

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Logging setup

### Backups
- [ ] Database backups automated
- [ ] Code backed up
- [ ] Secrets backed up securely

---

## 🚀 Deployment Commands Summary

```bash
# Development
npm install
npm run dev

# Build
npm run build
npm run preview

# Deploy to Vercel
vercel

# Deploy to Netlify
netlify deploy --prod

# Deploy to Heroku
heroku deploy

# Backend on Railway
railway start
```

---

## 🆘 Troubleshooting

### Application Won't Start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port Already in Use
```bash
# Find process
lsof -i :5173
# Kill it
kill -9 <PID>
```

### API Connection Issues
- Check backend is running
- Verify `VITE_API_BASE_URL`
- Check CORS settings
- Verify network in DevTools

### Build Failures
```bash
npm run build -- --debug
```

---

## 📞 Support

- Documentation: Check `README.md`
- Issues: GitHub Issues
- Features: GitHub Discussions

---

## ✅ Deployment Complete!

Your Krishi Mitre application is now live! 🎉

**Next Steps:**
1. Share the URL
2. Monitor analytics
3. Gather user feedback
4. Plan feature updates

**Monitoring Tools:**
- Vercel Analytics
- Google Analytics
- Sentry (Error tracking)
- LogRocket (Session replay)

---

<div align="center">

**🌾 Krishi Mitre - Live & Running! 🌾**

</div>
