# 🪔 KalaSetu (कला सेतु)
### *Bridging Indian Artisans and Micro-Entrepreneurs to the Global Market through Generative AI*

![KalaSetu Banner](https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Project Purpose & Vision

Millions of rural Indian artisans produce world-class handicrafts — such as **Jaipur Blue Pottery**, **Kashmiri Pashmina**, **Saharanpur Wood Carvings**, **Madhubani Folk Paintings**, and **Bastar Dhokra Metalcraft**. However, marginalized craftspersons often struggle with:
1. **Digital Illiteracy & Language Barriers**: Inability to write attractive e-commerce titles, SEO keywords, and English listings.
2. **Sub-par Product Photography**: Smartphone photos taken in dark rural workshops with cluttered backdrops.
3. **Unfair Middlemen & Price Exploitation**: Undervaluing intricate labor without knowing fair retail markups and living wages.

**KalaSetu (कला सेतु)** is a mobile-first, full-stack AI platform designed specifically with warm, culturally-connected Indian aesthetics and accessible UX. It empowers artisans to digitize their legacy in minutes.

---

## ✨ Core Features & User Flows

### 1. 🏡 Artisan Dashboard
- **Warm Welcome**: *"Namaste, Radha Devi 🙏"* with craft specialty badges (*"Jaipur Blue Pottery"*).
- **Quick Stats**: Total items, active marketplace listings, completed sales, and catalog valuation.
- **Quick Action Tiles**: Capture photo, create AI catalog, calculate fair price, enhance photos, add new craft.
- **Filterable Product Grid**: Filter by status (*All*, *Active*, *Sold*), search by material/region, and switch craft categories.

### 2. ✍️ Multilingual AI Catalog Generator (English & हिन्दी)
- **Voice-First Input**: Integrated **Web Speech API** allowing artisans with low literacy to speak in Hindi or English.
- **Cultural Storytelling**: Generates heritage background, GI tag context, care instructions, and eco-friendly highlights.
- **Outputs**:
  - Professional Product Title
  - High-converting E-Commerce English Copy
  - Authentic हिन्दी (Hindi) Devanagari Translation
  - SEO Search Keywords (`#jaipurpottery`, `#fairtradegift`)
  - Direct WhatsApp & Instagram pitch text.

### 3. 🪄 AI Studio Image Enhancement
- **Background Clutter Removal**: Isolates craft from workshop clutter.
- **Studio Diffuser Lighting**: Calibrates ambient lighting and color warmth.
- **Interactive Split Slider**: Real-time Before/After comparison tool.
- **Presets**: *Studio White Backdrop*, *Warm Artisanal Glow*, *E-Commerce Crisp Pro*.

### 4. 💰 Fair-Trade AI Price Calculator
- **Living Wage Standard**: Calculates minimum fair hourly wages for skilled artisans ($₹120-₹180/\text{hr}$).
- **Transparent Margins**: Visual breakdown of Raw Material, Fair Labor Wage, Protective Packaging, Platform Reserve, and Artisan Net Profit.
- **Tiered Recommendations**:
  - 🟢 **Minimum Fair Price**: Break-even + living wage safety net.
  - 🟠 **Recommended Retail Price**: Optimized market sweet spot ($35\text{--}50\%$ net margin).
  - 🟣 **Premium / Export Price**: Boutique, luxury exhibition, and export tier.

### 5. 📦 Product Management (CRUD)
- Create, View, Edit, and Delete listings.
- 1-Click Status Toggling (*Active* $\leftrightarrow$ *Sold*).
- Instant WhatsApp & Social Media share card generator.

---

## 🛠️ Tech Stack & Architecture

```
kalasetu/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection & in-memory zero-config fallback
│   │   ├── controllers/     # Auth, Product, and AI feature controllers
│   │   ├── middleware/      # JWT auth guard with demo-user resilience
│   │   ├── models/          # User, Product, Catalog, PriceSuggestion
│   │   ├── routes/          # Express REST endpoints
│   │   ├── seeds/           # Authentic Indian handicraft seed data
│   │   ├── services/        # AI multilingual NLP, pricing algorithm, image filters
│   │   └── server.js        # Main Express server (port 5000)
│   ├── tests/               # Automated backend API test suite
│   ├── uploads/             # Image storage
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, ProductCard, BeforeAfterSlider, VoiceRecorder, PriceGauge
│   │   ├── context/         # AuthContext, LanguageContext (EN/HI), ToastContext
│   │   ├── pages/           # Dashboard, AddProduct, ProductDetail, AICatalog, ImageEnhancer, PriceSuggest, Login
│   │   ├── services/        # Fetch API client
│   │   ├── utils/           # Bilingual translations dictionary
│   │   ├── App.jsx          # Tab routing & mobile navigation bar
│   │   └── main.jsx
│   ├── tailwind.config.js   # Warm Indian artisanal color palette (Terracotta, Sandalwood, Indigo, Khadi)
│   ├── vite.config.js       # Vite build + API proxy setup
│   └── package.json
└── README.md
```

- **Frontend**: React 18, Vite 5, Tailwind CSS, Lucide React, Canvas Confetti, Web Speech API.
- **Backend**: Node.js, Express.js, Multer, JSON Web Tokens, BCrypt.
- **Database**: MongoDB / Mongoose with **automatic resilient In-Memory store fallback** for instant zero-configuration demoing.

---

## 🚀 Quick Start Guide (Demo Ready)

### 1. Prerequisites
- **Node.js** (v18+ or v20+ recommended)
- **npm**

### 2. Running the Backend Server
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start backend server (runs on http://localhost:5000)
npm start
```

### 3. Running the Frontend Application
In a new terminal window:
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Launch frontend development server (runs on http://localhost:3000)
npm run dev
```
Open **`http://localhost:3000`** in your browser (or on a mobile device).

### 4. Running Automated API Tests
```bash
node backend/tests/api.test.js
```
*Executes all 10 automated test suites verifying auth, CRUD, multilingual catalog, pricing engine, and image enhancement.*

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new artisan account |
| `POST` | `/api/auth/login` | Login & receive JWT |
| `GET` | `/api/auth/me` | Fetch authenticated artisan profile |
| `GET` | `/api/products` | List craft products (with category, status, search filters) |
| `GET` | `/api/products/:id` | Fetch full details for a product |
| `POST` | `/api/products` | Create a new handicraft listing |
| `PUT` | `/api/products/:id` | Update product details |
| `DELETE` | `/api/products/:id` | Delete product listing |
| `PATCH` | `/api/products/:id/toggle-status` | Toggle product status (active / sold) |
| `POST` | `/api/ai/catalog` | Generate bilingual catalog (English + Hindi + SEO + Story) |
| `POST` | `/api/ai/price-suggestion` | Calculate fair-trade pricing & living wage margin breakdown |
| `POST` | `/api/ai/enhance-image` | Process image for studio lighting & background cleaning |

---

## 🪔 Demonstration Highlights for Judges

1. **⚡ 1-Click Demo Login**: Tap *"⚡ 1-Click Demo Login (Radha Devi)"* on the login screen to enter the app as master potter Radha Devi from Jaipur with pre-loaded handcrafted products.
2. **🌐 Real-Time Bilingual Toggle**: Click the **हिन्दी / English** button in the navbar to toggle all UI labels, descriptions, and voice guidance.
3. **🎙️ Voice-to-Text Catalog Creation**: Go to the **AI Catalog Generator** tab, tap *" बोलें (Voice Input)"* or *"Sample Voice"* to auto-transcribe spoken craft notes and generate full Devanagari and English copy.
4. **🪄 Interactive Before/After Photo Comparison**: Go to **AI Image Enhancer** to drag the split slider and view the enhanced lighting and studio clean-up.
5. **💰 Fair Living Wage Price Calculator**: Go to **Price Suggestion** to slide production hours and see the transparent rupee breakdown for artisan living wages.
#   k a l a s e t u  
 