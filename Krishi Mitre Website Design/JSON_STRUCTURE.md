{
  "dashboard": {
    "totalCrops": 5,
    "healthScore": 78,
    "activeAlerts": 2,
    "productivity": "92%",
    "lastSync": "2025-11-16T10:30:00Z"
  },
  "weather": {
    "temperature": 28,
    "humidity": 65,
    "rainfall": 12.5,
    "windSpeed": 15,
    "condition": "Partly Cloudy",
    "lastUpdate": "2025-11-16T10:25:00Z",
    "forecast": [
      {
        "day": "Tomorrow",
        "high": 30,
        "low": 22,
        "condition": "Sunny",
        "rainfall": 0
      },
      {
        "day": "Day After",
        "high": 28,
        "low": 21,
        "condition": "Cloudy",
        "rainfall": 5
      }
    ]
  },
  "soil": {
    "ph": 6.8,
    "nitrogen": 45,
    "phosphorus": 22,
    "potassium": 190,
    "moisture": 35,
    "organicMatter": 3.2,
    "ec": 0.8,
    "lastTested": "2025-11-10T14:00:00Z"
  },
  "crops": [
    {
      "id": "crop_1",
      "name": "Wheat",
      "variety": "HD 2967",
      "plantedDate": "2025-08-15",
      "sowingArea": 5.5,
      "health": 85,
      "stage": "Flowering",
      "daysLeft": 45,
      "expectedYield": "2500 kg",
      "diseaseRisk": "Low",
      "irrigationNeeded": false
    },
    {
      "id": "crop_2",
      "name": "Rice",
      "variety": "Basmati",
      "plantedDate": "2025-07-20",
      "sowingArea": 3.2,
      "health": 78,
      "stage": "Vegetative",
      "daysLeft": 60,
      "expectedYield": "1800 kg",
      "diseaseRisk": "Medium",
      "irrigationNeeded": true
    },
    {
      "id": "crop_3",
      "name": "Maize",
      "variety": "Hybrid",
      "plantedDate": "2025-09-01",
      "sowingArea": 4.0,
      "health": 92,
      "stage": "Silking",
      "daysLeft": 30,
      "expectedYield": "3200 kg",
      "diseaseRisk": "Low",
      "irrigationNeeded": false
    }
  ],
  "diseaseAlerts": [
    {
      "id": "alert_1",
      "cropId": "crop_2",
      "cropName": "Rice",
      "disease": "Blast Disease",
      "severity": "High",
      "description": "Early signs of blast disease detected in your rice field",
      "recommendation": "Apply fungicide immediately. Increase field drainage.",
      "detectedDate": "2025-11-16T09:00:00Z",
      "status": "Active"
    },
    {
      "id": "alert_2",
      "cropId": "crop_1",
      "cropName": "Wheat",
      "disease": "Powdery Mildew",
      "severity": "Medium",
      "description": "Fungal spores detected on wheat leaves",
      "recommendation": "Monitor closely. Consider spraying if conditions worsen.",
      "detectedDate": "2025-11-15T14:30:00Z",
      "status": "Active"
    }
  ],
  "analytics": {
    "totalFeedback": 248,
    "avgRating": 4.2,
    "ratingDistribution": {
      "1": 8,
      "2": 15,
      "3": 45,
      "4": 95,
      "5": 85
    },
    "usersCount": 342,
    "activeFarmers": 156,
    "trendData": [
      {
        "date": "2025-11-10",
        "feedback": 12,
        "avgRating": 4.1
      },
      {
        "date": "2025-11-11",
        "feedback": 18,
        "avgRating": 4.3
      },
      {
        "date": "2025-11-12",
        "feedback": 15,
        "avgRating": 4.0
      },
      {
        "date": "2025-11-13",
        "feedback": 22,
        "avgRating": 4.4
      },
      {
        "date": "2025-11-14",
        "feedback": 25,
        "avgRating": 4.2
      }
    ]
  },
  "userFarmData": {
    "userId": "user_123",
    "farmName": "Green Fields",
    "totalArea": 12.7,
    "location": "Punjab, India",
    "soilType": "Loamy",
    "waterSource": "Canal Irrigation",
    "memberSince": "2024-06-15",
    "totalHarvests": 8,
    "averageYield": "2150 kg",
    "bestCrop": "Wheat"
  },
  "recommendations": [
    {
      "id": "rec_1",
      "type": "Irrigation",
      "crop": "Rice",
      "message": "Your rice field needs water. Soil moisture is at 30%.",
      "priority": "High",
      "actionUrl": "/irrigation-schedule"
    },
    {
      "id": "rec_2",
      "type": "Fertilizer",
      "crop": "Wheat",
      "message": "Time for second nitrogen application. Flowering stage is critical.",
      "priority": "Medium",
      "actionUrl": "/fertilizer-guide"
    },
    {
      "id": "rec_3",
      "type": "Disease",
      "crop": "Rice",
      "message": "Blast disease detected. Apply preventive fungicide.",
      "priority": "High",
      "actionUrl": "/disease-management"
    }
  ]
}
