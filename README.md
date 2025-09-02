# 🌍 Earthquake Visualizer

An interactive React web app that visualizes **real-time earthquake data** from the USGS Earthquake API.  
Designed for Casey (a geography student) to explore **seismic patterns** across the world.  

---

## 🚀 Features

- **Interactive World Map** using [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/).
- **Real-time Data** from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
- **Color-coded markers** by magnitude:
  - 🟢 ≤ 3.0 (Minor)  
  - 🟠 3.1 – 5.0 (Moderate)  
  - 🔴 > 5.0 (Strong)  
- **Marker size scales with magnitude** for quick visual cues.
- **Filters**:
  - Time range → *Past Hour, Past Day, Past Week*  
  - Minimum magnitude → *All, ≥2.5, ≥4.5, ≥6.0*  
- **Popup details** → location, magnitude, depth, time.  
- **Responsive design**:
  - Controls reposition neatly on mobile.  
  - Legend adapts to small screens.  
- **World boundaries locked** (no repeated maps when panning).  

---

## 🛠️ Tech Stack

- **React (Create React App)** → framework  
- **React-Leaflet + Leaflet** → mapping & visualization  
- **Axios** → API requests  
- **Plain CSS** → responsive styling  

---

## 📡 API Used

- **USGS Earthquake GeoJSON Feeds**  
  Example endpoint (past day):  
  ```
  https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
  ```

---

## ⚡ Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## 📂 Project Structure
```
earthquake-visualizer/
├── public/
├── src/
│   ├── App.js         # Main app with map, filters, and legend
│   ├── App.css        # Styling (responsive)
│   ├── index.js       # Entry point
│   └── ...
├── package.json
└── README.md
```

---

## 📱 Responsiveness

- **Desktop**:  
  - Filters on top-left  
  - Legend bottom-left  
  - Header top-center  

- **Mobile**:  
  - Filters move to bottom (control panel style)  
  - Legend centered below filters  
  - Compact fonts & spacing  

---

## 🧭 Possible Extensions
- 🌋 Add **heatmap layer** for earthquake clusters.  
- 🗺️ Provide **tectonic plate boundaries overlay**.  
- 📈 Add **charts** showing frequency vs magnitude over time.  

---

## 📜 License
This project is for educational & demonstration purposes.  
Data provided by **USGS Earthquake Hazards Program**.  
