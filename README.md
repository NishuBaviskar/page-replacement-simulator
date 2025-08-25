# Page Replacement Algorithm Simulator

A production-ready web application built with React, Vite, and Tailwind CSS to simulate, visualize, and compare various page replacement algorithms (FIFO, LRU, Optimal).

**[➡️ View Live Demo]([https://your-vercel-deployment-url.vercel.app/)**](https://page-replacement-simulator-gamma.vercel.app/) <!-- Replace with your actual Vercel URL after deployment -->

![Screenshot of the Simulator](./public/screenshot.png) <!-- Optional: Add a screenshot of your app to the public folder -->

---

## ✨ Features

- **Algorithm Simulation**: Simulates FIFO, LRU, and Optimal (Belady's) algorithms.
- **Interactive Visualization**: Step-by-step frame tables with dynamic hit/fault highlighting and playback controls (play, pause, scrub).
- **Detailed Comparison**: A summary table and a bar chart (using Recharts) to compare algorithm performance.
- **Modern UI/UX**:
  - Fully responsive design for all screen sizes.
  - Dark/Light theme support with persistence.
  - Smooth animations and transitions powered by Framer Motion.
- **Helpful Utilities**:
  - Pre-loaded classic examples and a random reference string generator.
  - Import reference strings from CSV/TXT files or pasted text.
  - Export simulation results to a JSON file.
  - **Belady's Anomaly Detection**: Automatically flags when FIFO exhibits this behavior.
- **Session Persistence**: Saves your last-used inputs to `localStorage` for convenience.
- **Educational Content**: A built-in "Theory" modal explaining the concepts behind each algorithm.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

---

## 🚀 Setup and Usage

Follow these steps to run the project locally.

**Prerequisites**:
- Node.js (v18 or later)
- npm or yarn

**1. Clone the repository:**
```bash
git clone [https://github.com/your-username/page-replacement-simulator.git](https://github.com/your-username/page-replacement-simulator.git)
cd page-replacement-simulator"# page-replacement-simulator" 
