# 📡 Krishi Mitre - API Documentation

Complete API reference for Krishi Mitre backend services.

---

## 🌐 Base Configuration

**Development:**
```
Base URL: http://localhost:8000
Timeout: 10000ms
```

**Production:**
```
Base URL: https://api.krishi-mitre.com
Timeout: 10000ms
```

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>",
  "X-API-Version": "1.0"
}
```

---

## 🔐 Authentication Endpoints

### Sign Up (Register)

**Endpoint:** `POST /farmer/signup`

**Request:**
```json
{
  "email": "farmer@example.com",
  "password": "securePassword123",
  "name": "John Farmer",
  "location": "Punjab, India",
  "phone": "9876543210"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "farmer@example.com",
    "name": "John Farmer",
    "location": "Punjab, India"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

---

### Login

**Endpoint:** `POST /farmer/login`

**Request:**
```json
{
  "email": "farmer@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "farmer@example.com",
    "name": "John Farmer"
  },
  "expiresIn": 604800
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### Logout

**Endpoint:** `POST /farmer/logout`

**Authentication:** Required (Bearer token)

**Request:** No body required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 👤 User Profile Endpoints

### Get Profile

**Endpoint:** `GET /farmer/profile`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "profile": {
    "id": "user_123",
    "name": "John Farmer",
    "email": "farmer@example.com",
    "phone": "9876543210",
    "location": "Punjab, India",
    "soilType": "Loamy",
    "farmSize": "5 acres",
    "mainCrops": ["Wheat", "Rice"],
    "memberSince": "2025-01-15",
    "profileImage": "https://...",
    "stats": {
      "feedbacksSubmitted": 5,
      "diseasesDetected": 3,
      "rotationsPlanned": 2,
      "achievementPoints": 150
    }
  }
}
```

---

### Update Profile

**Endpoint:** `PUT /farmer/profile`

**Authentication:** Required

**Request:**
```json
{
  "name": "John Farmer",
  "phone": "9876543210",
  "location": "Punjab, India",
  "soilType": "Loamy",
  "farmSize": "5 acres",
  "mainCrops": ["Wheat", "Rice"]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated",
  "profile": { /* updated profile */ }
}
```

---

### Change Password

**Endpoint:** `POST /farmer/change-password`

**Authentication:** Required

**Request:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword456",
  "confirmPassword": "newPassword456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## 💬 Feedback Endpoints

### Submit Feedback

**Endpoint:** `POST /feedback`

**Authentication:** Required

**Request:**
```json
{
  "rating": 5,
  "comment": "Great app! Very helpful for farming decisions.",
  "category": "general",
  "featureName": "Weather Prediction"
}
```

**Parameters:**
- `rating` (number): 1-5 stars
- `comment` (string): Optional feedback text
- `category` (string): general, feature, bug
- `featureName` (string): Which feature feedback is for

**Response (200):**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "feedbackId": "fb_456",
  "submittedAt": "2025-01-20T10:30:00Z"
}
```

---

### Get User Feedbacks

**Endpoint:** `GET /feedback/my-feedbacks?limit=10&skip=0`

**Authentication:** Required

**Query Parameters:**
- `limit` (number): Max 100, default 10
- `skip` (number): Pagination offset
- `sort` (string): recent, popular, rating

**Response (200):**
```json
{
  "success": true,
  "total": 5,
  "feedbacks": [
    {
      "id": "fb_1",
      "rating": 5,
      "comment": "Great app!",
      "category": "general",
      "submittedAt": "2025-01-20T10:30:00Z",
      "response": null
    }
  ]
}
```

---

### Get All Feedbacks (Admin)

**Endpoint:** `GET /feedback/all?limit=50&skip=0`

**Authentication:** Required (Admin only)

**Response:** List of all feedbacks

---

## 📊 Analytics Endpoints

### Get Dashboard Analytics

**Endpoint:** `GET /analytics/dashboard`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "totalFeedbacks": 42,
    "averageRating": 4.2,
    "totalRatings": 42,
    "ratingDistribution": {
      "1": 2,
      "2": 3,
      "3": 8,
      "4": 15,
      "5": 14
    },
    "totalActiveUsers": 128,
    "feedbacksThisMonth": 12,
    "averageResponseTime": 2.1,
    "latestFeedbacks": [
      {
        "id": "fb_1",
        "rating": 5,
        "comment": "Excellent!",
        "author": "Farmer John",
        "submittedAt": "2025-01-20"
      }
    ]
  }
}
```

---

### Get Feature Analytics

**Endpoint:** `GET /analytics/features`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "features": [
    {
      "name": "Weather Prediction",
      "usageCount": 156,
      "averageRating": 4.5,
      "lastUsed": "2025-01-20"
    },
    {
      "name": "Disease Detection",
      "usageCount": 89,
      "averageRating": 4.3,
      "lastUsed": "2025-01-19"
    }
  ]
}
```

---

## 🌱 Crop Recommendation Endpoints

### Get Recommendations

**Endpoint:** `POST /recommendations`

**Authentication:** Required

**Request:**
```json
{
  "location": "Punjab, India",
  "season": "Kharif",
  "soilType": "Loamy",
  "farmSize": 5,
  "budget": 50000,
  "waterAvailability": "Good"
}
```

**Parameters:**
- `location` (string): Farm location
- `season` (string): Kharif, Rabi, Summer
- `soilType` (string): Clay, Loam, Sandy, Silty
- `farmSize` (number): In acres
- `budget` (number): Available budget
- `waterAvailability` (string): Good, Moderate, Low

**Response (200):**
```json
{
  "success": true,
  "recommendations": [
    {
      "rank": 1,
      "crop": "Rice",
      "expectedYield": "5 tons/acre",
      "waterRequired": "1200 mm",
      "plantingMonth": "June-July",
      "harvestMonth": "November-December",
      "marketPrice": "2200 per quintal",
      "profitability": "High",
      "requiredFertilizer": "N: 100kg, P: 40kg, K: 40kg",
      "pestManagement": ["Stem Borer", "Brown Planthopper"],
      "companion": "Legumes next crop",
      "riskLevel": "Low"
    },
    {
      "rank": 2,
      "crop": "Cotton",
      "expectedYield": "1.5 tons/acre",
      "waterRequired": "1000 mm",
      "plantingMonth": "May-June",
      "harvestMonth": "September-October",
      "marketPrice": "5500 per quintal",
      "profitability": "Very High",
      "riskLevel": "Medium"
    }
  ],
  "weatherRecommendation": "Good rainfall expected in June",
  "soilRecommendation": "Add organic matter before planting"
}
```

---

### Get Crop Details

**Endpoint:** `GET /crops/:cropId`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "crop": {
    "id": "crop_rice_001",
    "name": "Rice",
    "scientificName": "Oryza sativa",
    "season": ["Kharif", "Rabi"],
    "climate": "Tropical, Subtropical",
    "soilType": ["Loamy", "Clay"],
    "waterRequired": "1200-1500 mm",
    "temperature": "20-30°C",
    "plantingMonth": "June-July",
    "harvestMonth": "November-December",
    "growthPeriod": "120-150 days",
    "expectedYield": "4-6 tons/acre",
    "marketPrice": "2000-2500 per quintal",
    "pestControl": ["Stem Borer", "Brown Planthopper"],
    "diseaseControl": ["Leaf Blast", "Bacterial Leaf Blight"],
    "fertilizer": {
      "nitrogen": "100 kg",
      "phosphorus": "40 kg",
      "potassium": "40 kg"
    }
  }
}
```

---

## 🦠 Disease Detection Endpoints

### Upload Image for Detection

**Endpoint:** `POST /disease-detection/upload`

**Authentication:** Required

**Content-Type:** `multipart/form-data`

**Request:**
```
File: image.jpg (max 5MB)
cropType: Rice
```

**Response (200):**
```json
{
  "success": true,
  "detection": {
    "uploadId": "det_789",
    "cropType": "Rice",
    "disease": "Leaf Blast",
    "confidence": 0.92,
    "severity": "Moderate",
    "affectedArea": "15%",
    "symptoms": ["Brown spots on leaves", "Lesion formation"],
    "treatment": [
      "Use fungicide Tricyclazole 250g/ha",
      "Remove infected leaves",
      "Improve field drainage"
    ],
    "prevention": [
      "Use resistant varieties",
      "Proper fertilizer management",
      "Maintain field sanitation"
    ],
    "regionalAdvice": "Common in Punjab during July-August",
    "immediateAction": "Spray fungicide within 2 days"
  }
}
```

---

### Get Detection History

**Endpoint:** `GET /disease-detection/history?limit=20`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "total": 12,
  "detections": [
    {
      "id": "det_789",
      "date": "2025-01-20",
      "crop": "Rice",
      "disease": "Leaf Blast",
      "severity": "Moderate",
      "imageUrl": "https://..."
    }
  ]
}
```

---

## ☁️ Weather Endpoints

### Get Current Weather

**Endpoint:** `GET /weather/current?lat=31.5&lon=74.5`

**Authentication:** Not required (Public)

**Query Parameters:**
- `lat` (number): Latitude
- `lon` (number): Longitude
- `location` (string): Optional location name

**Response (200):**
```json
{
  "success": true,
  "weather": {
    "location": "Lahore, Punjab",
    "temperature": 28,
    "feelsLike": 32,
    "humidity": 65,
    "windSpeed": 12,
    "windDirection": "NW",
    "precipitation": 0,
    "cloudCover": 30,
    "uvIndex": 7,
    "visibility": 10,
    "pressure": 1013,
    "condition": "Partly Cloudy",
    "timestamp": "2025-01-20T15:30:00Z"
  }
}
```

---

### Get 7-Day Forecast

**Endpoint:** `GET /weather/forecast-7day?lat=31.5&lon=74.5`

**Response (200):**
```json
{
  "success": true,
  "forecast": [
    {
      "date": "2025-01-21",
      "maxTemp": 32,
      "minTemp": 18,
      "condition": "Sunny",
      "precipitation": 0,
      "humidity": 60,
      "windSpeed": 10,
      "recommendation": "Good day for planting"
    }
  ],
  "farmingAdvice": "Heavy rain expected on 23rd, plan accordingly"
}
```

---

### Weather Alerts

**Endpoint:** `GET /weather/alerts?lat=31.5&lon=74.5`

**Response (200):**
```json
{
  "success": true,
  "alerts": [
    {
      "type": "Heavy Rain",
      "severity": "High",
      "startTime": "2025-01-22T10:00:00Z",
      "endTime": "2025-01-22T20:00:00Z",
      "description": "Heavy rainfall expected",
      "recommendation": "Ensure proper drainage"
    }
  ]
}
```

---

## 🔔 Notifications Endpoints

### Get User Notifications

**Endpoint:** `GET /notifications?limit=20&unread=true`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "total": 5,
  "unreadCount": 3,
  "notifications": [
    {
      "id": "notif_123",
      "type": "weather",
      "title": "Heavy Rain Alert",
      "message": "Heavy rainfall expected in your area",
      "priority": "High",
      "read": false,
      "createdAt": "2025-01-20T14:30:00Z",
      "actionUrl": "/weather"
    }
  ]
}
```

---

### Mark Notification as Read

**Endpoint:** `PUT /notifications/:id/read`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

### Delete Notification

**Endpoint:** `DELETE /notifications/:id`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## 🔄 Crop Rotation Endpoints

### Get Rotation Plan

**Endpoint:** `GET /crop-rotation/plan?farmId=farm_123`

**Authentication:** Required

**Response (200):**
```json
{
  "success": true,
  "plan": {
    "farmId": "farm_123",
    "currentYear": 2025,
    "rotation": [
      {
        "year": 2025,
        "crop": "Rice",
        "season": "Kharif",
        "yield": "5 tons/acre"
      },
      {
        "year": 2025,
        "crop": "Wheat",
        "season": "Rabi",
        "yield": "4 tons/acre"
      }
    ],
    "benefits": ["Soil health improvement", "Pest control"],
    "nextRecommendation": "Plant legumes next season"
  }
}
```

---

### Save Rotation Plan

**Endpoint:** `POST /crop-rotation/plan`

**Authentication:** Required

**Request:**
```json
{
  "farmId": "farm_123",
  "rotation": [
    {
      "year": 2025,
      "season": "Kharif",
      "crop": "Rice"
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Rotation plan saved",
  "planId": "plan_456"
}
```

---

## 📚 Learning Resources Endpoints

### Get Tutorials

**Endpoint:** `GET /tutorials?category=disease&difficulty=easy&limit=10`

**Authentication:** Not required

**Query Parameters:**
- `category`: disease, crop, weather, rotation
- `difficulty`: easy, medium, hard
- `language`: en, hi

**Response (200):**
```json
{
  "success": true,
  "total": 5,
  "tutorials": [
    {
      "id": "tut_001",
      "title": "How to Identify Rice Blast",
      "category": "disease",
      "difficulty": "easy",
      "duration": "5 min",
      "description": "Learn to identify rice blast disease",
      "videoUrl": "https://youtube.com/...",
      "imageUrl": "https://...",
      "content": "Rice blast is characterized by..."
    }
  ]
}
```

---

### Get FAQ

**Endpoint:** `GET /faq?search=disease&limit=10`

**Response (200):**
```json
{
  "success": true,
  "faqs": [
    {
      "id": "faq_001",
      "category": "Disease Management",
      "question": "How do I identify plant diseases?",
      "answer": "Look for discoloration, spots, wilting...",
      "views": 1250,
      "helpful": 892
    }
  ]
}
```

---

## ❌ Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": "Error message",
  "errorCode": "INVALID_REQUEST",
  "statusCode": 400,
  "timestamp": "2025-01-20T15:30:00Z"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `INVALID_REQUEST` | 400 | Missing or invalid parameters |
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `FORBIDDEN` | 403 | No permission for this action |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `UNPROCESSABLE_ENTITY` | 422 | Validation error |
| `RATE_LIMIT` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Internal server error |

---

## 🔑 Authentication

### Token Format

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration

- Access Token: 7 days
- Refresh Token: 30 days

### Refresh Token

**Endpoint:** `POST /auth/refresh`

**Request:**
```json
{
  "refreshToken": "refresh_token_value"
}
```

**Response:**
```json
{
  "success": true,
  "token": "new_access_token",
  "expiresIn": 604800
}
```

---

## 📈 Rate Limiting

- **Unauthenticated**: 60 requests/minute
- **Authenticated**: 300 requests/minute
- **Burst**: 1000 requests/minute

Headers returned:
```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1610350200
```

---

## 🧪 Testing with cURL

### Signup
```bash
curl -X POST http://localhost:8000/farmer/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123",
    "name": "John Farmer"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/farmer/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer@example.com",
    "password": "password123"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:8000/farmer/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📞 Support

For API issues:
- Email: api-support@krishi-mitre.com
- GitHub Issues: https://github.com/krishi-mitre/api/issues
- Documentation: https://docs.krishi-mitre.com

---

<div align="center">

**API Version**: 1.0.0  
**Last Updated**: 2025-01-20  
**Status**: Production Ready ✅

</div>
