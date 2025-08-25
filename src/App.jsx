import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Controls from './components/Controls';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import Comparison from './components/Comparison';
import TheoryModal from './components/TheoryModal';
import { fifo, lru, optimal, detectBeladyAnomaly } from './utils/algorithms';

// Main App Component - This is the entry point of our React application.
const App = () => {
    // --- STATE MANAGEMENT ---
    // Manages the current theme (light/dark)
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    // Manages user inputs (frames, reference string)
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('page-sim-settings');
        return savedSettings ? JSON.parse(savedSettings) : {
            frames: 3,
            refString: '7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1',
        };
    });
    // Stores the results of the algorithm simulations
    const [results, setResults] = useState({ fifo: null, lru: null, optimal: null });
    // Stores information about Belady's Anomaly if detected
    const [beladyAnomaly, setBeladyAnomaly] = useState(null);
    // Controls the visibility of the theory modal
    const [isTheoryModalOpen, setIsTheoryModalOpen] = useState(false);

    // --- EFFECTS ---
    // Effect to apply the theme to the document and save it to localStorage
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Effect to save user settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('page-sim-settings', JSON.stringify(settings));
    }, [settings]);

    // --- HANDLERS ---
    // Toggles the theme between light and dark
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Main function to run simulations
    const handleRun = useCallback((algo = 'all') => {
        // 1. Sanitize and parse the reference string
        const refStringArray = settings.refString
            .split(',')
            .map(s => s.trim())
            .filter(s => s !== '')
            .map(Number)
            .filter(n => !isNaN(n));

        if (refStringArray.length === 0) {
            alert("Please enter a valid, non-empty reference string.");
            return;
        }
        
        const frameCount = Number(settings.frames);

        // 2. Run the selected algorithm(s)
        let newResults = { ...results };
        if (algo === 'fifo' || algo === 'all') newResults.fifo = fifo(frameCount, refStringArray);
        if (algo === 'lru' || algo === 'all') newResults.lru = lru(frameCount, refStringArray);
        if (algo === 'optimal' || algo === 'all') newResults.optimal = optimal(frameCount, refStringArray);
        
        // 3. Check for Belady's Anomaly for FIFO
        if (algo === 'fifo' || algo === 'all') {
            const anomaly = detectBeladyAnomaly(frameCount, refStringArray);
            setBeladyAnomaly(anomaly);
        }

        setResults(newResults);
    }, [settings, results]);

    // Resets all results and clears the simulation view
    const handleReset = () => {
        setResults({ fifo: null, lru: null, optimal: null });
        setBeladyAnomaly(null);
    };

    // Exports the current results as a JSON file
    const handleExport = () => {
        const hasResults = Object.values(results).some(r => r);
        if (!hasResults) {
            alert("No results to export. Please run a simulation first.");
            return;
        }
        const dataStr = JSON.stringify({ settings, results }, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'page_replacement_results.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // --- RENDER ---
    return (
        <div className="min-h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground transition-colors duration-300">
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                onTheoryClick={() => setIsTheoryModalOpen(true)}
                onExport={handleExport}
            />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 print-container">
                <Controls
                    settings={settings}
                    setSettings={setSettings}
                    onRun={handleRun}
                    onReset={handleReset}
                />

                <div className="mt-8 space-y-8">
                    {results.fifo && (
                        <AlgorithmVisualizer result={results.fifo} frameCount={settings.frames} beladyAnomaly={beladyAnomaly} />
                    )}
                    {results.lru && (
                        <AlgorithmVisualizer result={results.lru} frameCount={settings.frames} />
                    )}
                    {results.optimal && (
                        <AlgorithmVisualizer result={results.optimal} frameCount={settings.frames} />
                    )}
                </div>

                <Comparison results={results} />
            </main>
            <TheoryModal isOpen={isTheoryModalOpen} onClose={() => setIsTheoryModalOpen(false)} />
        </div>
    );
};

export default App;
