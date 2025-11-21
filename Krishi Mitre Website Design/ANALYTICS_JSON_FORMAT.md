# Analytics API JSON Format

## Overview

The Analytics component expects data from `/api/analytics` endpoint. Here's the complete JSON structure needed:

## Request

```bash
GET /api/analytics
```

## Response JSON Structure

```json
{
  "totalFeedback": 248,
  "avgRating": 4.2,
  "usersCount": 342,
  "ratingDistribution": {
    "1": 8,
    "2": 15,
    "3": 45,
    "4": 95,
    "5": 85
  },
  "latestFeedback": [
    {
      "name": "Rajesh Kumar",
      "rating": 5,
      "message": "Excellent app for farming!",
      "time": "2 hours ago"
    },
    {
      "name": "Priya Singh",
      "rating": 4,
      "message": "Very helpful features",
      "time": "5 hours ago"
    }
  ],
  "trendData": [
    {
      "date": "Mon",
      "feedback": 12
    },
    {
      "date": "Tue",
      "feedback": 18
    },
    {
      "date": "Wed",
      "feedback": 25
    },
    {
      "date": "Thu",
      "feedback": 22
    },
    {
      "date": "Fri",
      "feedback": 30
    },
    {
      "date": "Sat",
      "feedback": 28
    },
    {
      "date": "Sun",
      "feedback": 20
    }
  ]
}
```

## Field Descriptions

### Root Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `totalFeedback` | number | Yes | Total count of all feedback submissions |
| `avgRating` | number | Yes | Average rating (0-5, can be decimal like 4.2) |
| `usersCount` | number | Yes | Number of active users |
| `ratingDistribution` | object | Yes | Count of feedbacks by rating (1-5 stars) |
| `latestFeedback` | array | Yes | Array of recent feedback entries |
| `trendData` | array | Yes | Weekly trend data for feedback submissions |

### ratingDistribution Object

```json
{
  "1": 8,    // Number of 1-star ratings
  "2": 15,   // Number of 2-star ratings
  "3": 45,   // Number of 3-star ratings
  "4": 95,   // Number of 4-star ratings
  "5": 85    // Number of 5-star ratings
}
```

### latestFeedback Array Items

```json
{
  "name": "string",      // User's full name
  "rating": 1-5,         // Rating from 1 to 5 stars
  "message": "string",   // User's feedback message
  "time": "string"       // Relative time (e.g., "2 hours ago", "1 day ago")
}
```

### trendData Array Items

```json
{
  "date": "string",      // Day of week (Mon, Tue, Wed, etc.)
  "feedback": number     // Number of feedback entries for that day
}
```

## Complete Example

```json
{
  "totalFeedback": 248,
  "avgRating": 4.2,
  "usersCount": 342,
  "ratingDistribution": {
    "1": 8,
    "2": 15,
    "3": 45,
    "4": 95,
    "5": 85
  },
  "latestFeedback": [
    {
      "name": "Rajesh Kumar",
      "rating": 5,
      "message": "Excellent app for farming!",
      "time": "2 hours ago"
    },
    {
      "name": "Priya Singh",
      "rating": 4,
      "message": "Very helpful features",
      "time": "5 hours ago"
    },
    {
      "name": "Amit Patel",
      "rating": 5,
      "message": "Love the disease detection feature",
      "time": "1 day ago"
    },
    {
      "name": "Maya Singh",
      "rating": 3,
      "message": "Good but needs improvement",
      "time": "2 days ago"
    }
  ],
  "trendData": [
    { "date": "Mon", "feedback": 12 },
    { "date": "Tue", "feedback": 18 },
    { "date": "Wed", "feedback": 25 },
    { "date": "Thu", "feedback": 22 },
    { "date": "Fri", "feedback": 30 },
    { "date": "Sat", "feedback": 28 },
    { "date": "Sun", "feedback": 20 }
  ]
}
```

## Error Handling

If the API request fails or returns a non-200 status, the component automatically displays mock data (as shown above).

## API Configuration

The API base URL can be configured via environment variable:

```bash
VITE_API_BASE=http://localhost:8080/api
```

Default: `http://localhost:8080/api`

## Notes

- All numbers should be integers except `avgRating` which can be decimal
- Rating values must be between 1 and 5
- The component handles missing fields gracefully with defaults
- Time strings should be human-readable relative format
- Trend data typically shows 7 days (one week)
