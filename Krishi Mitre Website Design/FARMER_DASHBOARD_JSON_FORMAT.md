# Farmer Dashboard API JSON Format

## Overview

The FarmerDashboard component fetches user profile and statistics data from `/api/farmer/profile` endpoint. Here's the complete JSON structure needed:

## Request

```bash
GET /api/farmer/profile
Headers: {
  'Authorization': 'Bearer {token}',
  'Content-Type': 'application/json'
}
```

## Response JSON Structure

### Option 1: Standard Response Format

```json
{
  "data": {
    "user": {
      "name": "Rajesh Kumar",
      "email": "rajesh@example.com",
      "location": "Punjab, India",
      "joinedDate": "01/15/2023",
      "phoneNumber": "+91 9876543210",
      "farmSize": "5 acres"
    },
    "stats": {
      "feedbackCount": 12,
      "diseaseDetections": 24,
      "cropRotations": 8,
      "totalPoints": 450,
      "lastActivity": "2 hours ago",
      "achievements": [
        {
          "icon": "🎯",
          "name": "First Feedback",
          "unlocked": true
        },
        {
          "icon": "⭐",
          "name": "5 Star Reviewer",
          "unlocked": true
        },
        {
          "icon": "🚀",
          "name": "Active Farmer",
          "unlocked": true
        }
      ]
    }
  }
}
```

### Option 2: Alternative Response Format (Direct Data)

```json
{
  "user": {
    "name": "Priya Singh",
    "email": "priya@example.com",
    "location": "Maharashtra, India",
    "joinedDate": "06/20/2022",
    "phoneNumber": "+91 9876543211",
    "farmSize": "3 acres"
  },
  "stats": {
    "feedbackCount": 18,
    "diseaseDetections": 32,
    "cropRotations": 12,
    "totalPoints": 650,
    "lastActivity": "1 hour ago",
    "achievements": [
      {
        "icon": "🎯",
        "name": "First Feedback",
        "unlocked": true
      },
      {
        "icon": "⭐",
        "name": "5 Star Reviewer",
        "unlocked": true
      },
      {
        "icon": "🚀",
        "name": "Active Farmer",
        "unlocked": false
      }
    ]
  }
}
```

## Field Descriptions

### User Profile Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name of the farmer |
| `email` | string | Yes | Email address |
| `location` | string | Yes | City/State, Country |
| `joinedDate` | string | Yes | Date format (DD/MM/YYYY or similar) |
| `phoneNumber` | string | No | Contact number with country code |
| `farmSize` | string | No | Size of farm (e.g., "5 acres") |

### Statistics Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `feedbackCount` | number | Yes | Total feedback submissions |
| `diseaseDetections` | number | Yes | Number of disease detections performed |
| `cropRotations` | number | Yes | Number of crop rotations planned |
| `totalPoints` | number | Yes | Cumulative points earned |
| `lastActivity` | string | Yes | Relative time format (e.g., "2 hours ago") |
| `achievements` | array | Yes | Array of achievement objects |

### Achievement Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `icon` | string | Yes | Emoji icon (e.g., "🎯", "⭐", "🚀") |
| `name` | string | Yes | Achievement name/title |
| `unlocked` | boolean | Yes | Whether user has unlocked this achievement |

## Complete Example

```json
{
  "data": {
    "user": {
      "name": "Amit Patel",
      "email": "amit.patel@farmer.com",
      "location": "Gujarat, India",
      "joinedDate": "03/10/2023",
      "phoneNumber": "+91 9988776655",
      "farmSize": "7 acres"
    },
    "stats": {
      "feedbackCount": 25,
      "diseaseDetections": 45,
      "cropRotations": 18,
      "totalPoints": 850,
      "lastActivity": "30 minutes ago",
      "achievements": [
        {
          "icon": "🎯",
          "name": "First Feedback",
          "unlocked": true
        },
        {
          "icon": "⭐",
          "name": "5 Star Reviewer",
          "unlocked": true
        },
        {
          "icon": "🚀",
          "name": "Active Farmer",
          "unlocked": true
        }
      ]
    }
  }
}
```

## Error Handling

If the API request fails (401, 403, 404, 500), the component:

1. Falls back to using `auth.user` data for profile
2. Displays mock statistics (all zeros)
3. Shows empty achievements array
4. Still renders the dashboard with available data

## Authentication

- **Required:** Bearer token in Authorization header
- **Source:** `localStorage.getItem('token')`
- **Format:** `Authorization: Bearer {token}`

## Mock Data (Fallback)

When API fails, component uses mock data:

```json
{
  "name": "Farmer (from auth.user)",
  "email": "farmer@example.com",
  "location": "India",
  "joinedDate": "Today",
  "feedbackCount": 0,
  "diseaseDetections": 0,
  "cropRotations": 0,
  "totalPoints": 0,
  "achievements": []
}
```

## API Configuration

```bash
Base URL: http://localhost:8080/api
Endpoint: /api/farmer/profile
Environment Variable: VITE_API_BASE
```

## Hindi Support

All stats labels support Hindi:

- feedbackCount → "जमा की गई प्रतिक्रिया"
- diseaseDetections → "रोग पहचान"
- cropRotations → "फसल चक्र"
- achievements → "उपलब्धियां"

## Notes

- Token must be valid and not expired
- All dates can be in any readable format
- Icon emojis can be customized
- Achievement names localize based on language prop
- Stats should be non-negative integers
- lastActivity supports relative time format (e.g., "2 hours ago", "1 day ago")
