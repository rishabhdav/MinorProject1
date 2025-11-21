disease_info = {
    # --------------------- APPLE ---------------------
    "Apple___Apple_scab": {
        "severity": "Medium",
        "symptoms": "Olive-green to brown spots on leaves and fruits. Leaves may curl or distort.",
        "cure": "Apply fungicides early in the season. Remove infected leaves.",
        "chemicals": ["Mancozeb", "Chlorothalonil", "Captan"],
        "organic": ["Neem oil", "Sulfur spray"],
        "prevention": "Use resistant varieties. Avoid overhead irrigation."
    },

    "Apple___Black_rot": {
        "severity": "High",
        "symptoms": "Dark brown lesions, fruit rot, cankers on branches.",
        "cure": "Remove infected branches. Apply fungicides promptly.",
        "chemicals": ["Captan", "Thiophanate-methyl"],
        "organic": ["Bordeaux mixture", "Neem oil"],
        "prevention": "Destroy fallen fruits. Prune affected limbs."
    },

    "Apple___Cedar_apple_rust": {
        "severity": "Medium",
        "symptoms": "Bright orange spots on leaves. Yellow halo develops.",
        "cure": "Apply fungicides during early growth stages.",
        "chemicals": ["Myclobutanil", "Propiconazole"],
        "organic": ["Sulfur spray"],
        "prevention": "Remove nearby cedar trees when possible."
    },

    "Apple___healthy": {
        "severity": "None",
        "symptoms": "No disease symptoms.",
        "cure": "No treatment required.",
        "chemicals": [],
        "organic": [],
        "prevention": "Maintain proper nutrition."
    },

    # --------------------- BLUEBERRY ---------------------
    "Blueberry___healthy": {
        "severity": "None",
        "symptoms": "Plant is healthy.",
        "cure": "No treatment required.",
        "chemicals": [],
        "organic": [],
        "prevention": "Maintain soil acidity and moisture."
    },

    # --------------------- CHERRY ---------------------
    "Cherry_(including_sour)___Powdery_mildew": {
        "severity": "Medium",
        "symptoms": "White powder-like fungal growth on leaves.",
        "cure": "Apply sulfur-based fungicides.",
        "chemicals": ["Myclobutanil", "Triadimefon"],
        "organic": ["Neem oil", "Potassium bicarbonate"],
        "prevention": "Increase airflow, avoid overcrowding plants."
    },

    "Cherry_(including_sour)___healthy": {
        "severity": "None",
        "symptoms": "No signs of infection.",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": "Good hygiene practices."
    },

    # --------------------- CORN / MAIZE ---------------------
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
        "severity": "Medium",
        "symptoms": "Rectangular gray or tan lesions on leaves.",
        "cure": "Use fungicides early. Improve nitrogen levels.",
        "chemicals": ["Azoxystrobin", "Propiconazole"],
        "organic": ["Compost tea spray"],
        "prevention": "Avoid dense planting. Rotate crops."
    },

    "Corn_(maize)___Common_rust_": {
        "severity": "Low",
        "symptoms": "Reddish-brown pustules on leaves.",
        "cure": "Apply fungicides only when severe.",
        "chemicals": ["Mancozeb", "Copper oxychloride"],
        "organic": ["Neem oil"],
        "prevention": "Use resistant varieties."
    },

    "Corn_(maize)___Northern_Leaf_Blight": {
        "severity": "High",
        "symptoms": "Large cigar-shaped lesions on leaves.",
        "cure": "Apply systemic fungicides.",
        "chemicals": ["Azoxystrobin", "Pyraclostrobin"],
        "organic": ["Garlic extract spray"],
        "prevention": "Remove crop debris. Rotate crops."
    },

    "Corn_(maize)___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    },

    # --------------------- GRAPE ---------------------
    "Grape___Black_rot": {
        "severity": "High",
        "symptoms": "Brown circular leaf lesions, fruit shriveling.",
        "cure": "Prune infected shoots and apply fungicides.",
        "chemicals": ["Captan", "Mancozeb"],
        "organic": ["Neem oil", "Sulfur"],
        "prevention": "Increase ventilation."
    },

    "Grape___Esca_(Black_Measles)": {
        "severity": "High",
        "symptoms": "Tiger-stripe patterns on leaves, berry shriveling.",
        "cure": "No complete cure. Remove infected wood.",
        "chemicals": ["Triazole fungicides"],
        "organic": ["Trichoderma-based treatments"],
        "prevention": "Avoid pruning during wet conditions."
    },

    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "severity": "Medium",
        "symptoms": "Angular brown leaf spots.",
        "cure": "Apply copper fungicides.",
        "chemicals": ["Copper oxychloride"],
        "organic": ["Bordeaux mixture"],
        "prevention": "Good vineyard sanitation."
    },

    "Grape___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    },

    # --------------------- ORANGE ---------------------
    "Orange___Haunglongbing_(Citrus_greening)": {
        "severity": "Very High",
        "symptoms": "Yellow shoots, blotchy leaf mottling, fruit deformation.",
        "cure": "No cure. Manage psyllid insect vector.",
        "chemicals": ["Imidacloprid"],
        "organic": ["Neem oil"],
        "prevention": "Remove infected trees promptly."
    },

    # --------------------- PEACH ---------------------
    "Peach___Bacterial_spot": {
        "severity": "Medium",
        "symptoms": "Small dark spots on leaves and fruits.",
        "cure": "Spray copper-based bactericides.",
        "chemicals": ["Copper hydroxide"],
        "organic": ["Neem oil"],
        "prevention": "Avoid overhead watering."
    },

    "Peach___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    },

    # --------------------- PEPPER ---------------------
    "Pepper,_bell___Bacterial_spot": {
        "severity": "Medium",
        "symptoms": "Small water-soaked leaf spots.",
        "cure": "Apply copper fungicides.",
        "chemicals": ["Copper oxychloride"],
        "organic": ["Potassium bicarbonate"],
        "prevention": "Use disease-free seeds."
    },

    "Pepper,_bell___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    },

    # --------------------- POTATO ---------------------
    "Potato___Early_blight": {
        "severity": "Medium",
        "symptoms": "Brown concentric rings on leaves.",
        "cure": "Use protectant fungicides.",
        "chemicals": ["Mancozeb", "Chlorothalonil"],
        "organic": ["Neem oil"],
        "prevention": "Avoid excessive irrigation."
    },

    "Potato___Late_blight": {
        "severity": "Severe",
        "symptoms": "Water-soaked patches, white mold on leaf undersides.",
        "cure": "Apply systemic fungicides immediately.",
        "chemicals": ["Metalaxyl", "Copper oxychloride"],
        "organic": ["Garlic extract"],
        "prevention": "Remove infected plants quickly."
    },

    "Potato___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    },

    # --------------------- RASPBERRY ---------------------
    "Raspberry___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    },

    # --------------------- SOYBEAN ---------------------
    "Soybean___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    },

    # --------------------- SQUASH ---------------------
    "Squash___Powdery_mildew": {
        "severity": "Medium",
        "symptoms": "White fungal patches on leaves.",
        "cure": "Use sulfur fungicides.",
        "chemicals": ["Hexaconazole", "Propiconazole"],
        "organic": ["Milk spray", "Neem oil"],
        "prevention": "Good ventilation helps."
    },

    # --------------------- STRAWBERRY ---------------------
    "Strawberry___Leaf_scorch": {
        "severity": "Medium",
        "symptoms": "Purple spots turning brown on leaves.",
        "cure": "Apply protective fungicides.",
        "chemicals": ["Captan", "Chlorothalonil"],
        "organic": ["Neem oil"],
        "prevention": "Avoid overcrowding."
    },

    "Strawberry___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    },

    # --------------------- TOMATO ---------------------
    "Tomato___Bacterial_spot": {
        "severity": "Medium",
        "symptoms": "Small water-soaked spots on leaves.",
        "cure": "Use copper bactericides.",
        "chemicals": ["Copper oxychloride"],
        "organic": ["Neem oil"],
        "prevention": "Use certified seeds."
    },

    "Tomato___Early_blight": {
        "severity": "Medium",
        "symptoms": "Concentric brown leaf lesions.",
        "cure": "Apply mancozeb-based fungicides.",
        "chemicals": ["Mancozeb", "Chlorothalonil"],
        "organic": ["Garlic spray"],
        "prevention": "Avoid wetting foliage."
    },

    "Tomato___Late_blight": {
        "severity": "Severe",
        "symptoms": "Greasy lesions, white mold underneath leaves.",
        "cure": "Use systemic fungicides urgently.",
        "chemicals": ["Metalaxyl", "Propamocarb"],
        "organic": ["Bordeaux mixture"],
        "prevention": "Remove infected plants immediately."
    },

    "Tomato___Leaf_Mold": {
        "severity": "Medium",
        "symptoms": "Yellow spots on top, olive mold on underside.",
        "cure": "Increase ventilation, apply fungicides.",
        "chemicals": ["Chlorothalonil"],
        "organic": ["Neem oil"],
        "prevention": "Avoid high humidity."
    },

    "Tomato___Septoria_leaf_spot": {
        "severity": "Medium",
        "symptoms": "Small circular spots with dark borders.",
        "cure": "Use copper or chlorothalonil fungicides.",
        "chemicals": ["Copper fungicide"],
        "organic": ["Potassium bicarbonate"],
        "prevention": "Remove infected leaves."
    },

    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "severity": "Medium",
        "symptoms": "Tiny yellow speckles, fine webbing.",
        "cure": "Use miticides.",
        "chemicals": ["Abamectin", "Spiromesifen"],
        "organic": ["Neem oil", "Soap spray"],
        "prevention": "Increase humidity."
    },

    "Tomato___Target_Spot": {
        "severity": "Medium",
        "symptoms": "Brown lesions with concentric rings.",
        "cure": "Apply broad-spectrum fungicides.",
        "chemicals": ["Azoxystrobin", "Propiconazole"],
        "organic": ["Garlic extract"],
        "prevention": "Avoid waterlogging."
    },

    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "severity": "High",
        "symptoms": "Upward leaf curling, yellowing, stunted growth.",
        "cure": "No chemical cure. Control whiteflies.",
        "chemicals": ["Imidacloprid", "Thiamethoxam"],
        "organic": ["Neem oil"],
        "prevention": "Use insect nets and resistant varieties."
    },

    "Tomato___Tomato_mosaic_virus": {
        "severity": "High",
        "symptoms": "Mosaic patterns, leaf distortion, fruit malformation.",
        "cure": "No cure. Remove infected plants.",
        "chemicals": [],
        "organic": ["Soil solarization"],
        "prevention": "Disinfect tools and avoid tobacco contamination."
    },

    "Tomato___healthy": {
        "severity": "None",
        "symptoms": "",
        "cure": "",
        "chemicals": [],
        "organic": [],
        "prevention": ""
    }
}
