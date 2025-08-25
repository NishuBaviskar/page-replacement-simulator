
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SettingsIcon, ResetIcon, UploadIcon } from './Icons';

const EXAMPLES = {
  classic: '7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1',
  belady: '1,2,3,4,1,2,5,1,2,3,4,5',
  sequential: '0,1,2,3,4,5,6,7,8,9',
  noFaults: '1,1,2,2,3,3,1,2,3',
};

const Controls = ({ settings, setSettings, onRun, onReset }) => {
  const { frames, refString } = settings;
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'frames') {
      processedValue = Math.max(1, Math.min(10, Number(value)));
    }
    setSettings(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleRandom = () => {
    const len = Math.floor(Math.random() * 15) + 10; // 10-24 elements
    const randomString = Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join(',');
    setSettings(prev => ({ ...prev, refString: randomString }));
  };

  const handleExampleChange = (e) => {
    const value = e.target.value;
    if (EXAMPLES[value]) {
      setSettings(prev => ({ ...prev, refString: EXAMPLES[value] }));
    }
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        // Sanitize: remove non-numeric, non-comma chars, trim, remove trailing commas
        const sanitized = text.replace(/[^0-9,]/g, '').replace(/,+/g, ',').trim().replace(/,$/, '');
        setSettings(prev => ({ ...prev, refString: sanitized }));
      };
      reader.readAsText(file);
    }
    // Reset file input to allow re-uploading the same file
    e.target.value = null;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onRun('all');
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-card dark:bg-dark-card p-4 sm:p-6 rounded-lg shadow-md print-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <SettingsIcon className="text-primary dark:text-dark-primary" />
        <h2 className="text-2xl font-bold">Controls</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Frames Input */}
        <div>
          <label htmlFor="frames" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Frames (1-10)</label>
          <input
            type="number"
            id="frames"
            name="frames"
            value={frames}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            min="1"
            max="10"
            className="w-full px-3 py-2 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Reference String Input */}
        <div className="lg:col-span-3">
          <label htmlFor="refString" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Reference String (comma-separated)</label>
          <input
            type="text"
            id="refString"
            name="refString"
            value={refString}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 1,2,3,1,4,5"
            className="w-full px-3 py-2 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
            <select onChange={handleExampleChange} defaultValue="" className="px-3 py-2 bg-secondary dark:bg-dark-secondary text-secondary-foreground dark:text-dark-secondary-foreground border border-transparent rounded-md hover:bg-secondary/80 dark:hover:bg-dark-secondary/80 focus:ring-2 focus:ring-primary focus:outline-none">
                <option value="" disabled>Load Example</option>
                <option value="classic">Classic</option>
                <option value="belady">Belady's Anomaly</option>
                <option value="sequential">Sequential</option>
                <option value="noFaults">Low Faults</option>
            </select>
            <button onClick={handleRandom} className="px-3 py-2 bg-secondary dark:bg-dark-secondary text-secondary-foreground dark:text-dark-secondary-foreground border border-transparent rounded-md hover:bg-secondary/80 dark:hover:bg-dark-secondary/80">
                Randomize
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv,.txt" className="hidden" />
            <button onClick={() => fileInputRef.current.click()} className="px-3 py-2 bg-secondary dark:bg-dark-secondary text-secondary-foreground dark:text-dark-secondary-foreground border border-transparent rounded-md hover:bg-secondary/80 dark:hover:bg-dark-secondary/80 flex items-center gap-2">
                <UploadIcon size={16}/> Import
            </button>
        </div>
        <button onClick={onReset} className="px-4 py-2 bg-muted dark:bg-dark-muted text-muted-foreground dark:text-dark-muted-foreground rounded-md hover:bg-muted/80 dark:hover:bg-dark-muted/80 flex items-center gap-2">
            <ResetIcon size={16}/> Reset
        </button>
      </div>

      <div className="mt-4 border-t border-border dark:border-dark-border pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button onClick={() => onRun('fifo')} className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-semibold">Run FIFO</button>
        <button onClick={() => onRun('lru')} className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-semibold">Run LRU</button>
        <button onClick={() => onRun('optimal')} className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 font-semibold">Run Optimal</button>
        <button onClick={() => onRun('all')} className="w-full px-4 py-2 bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground rounded-md hover:bg-primary/90 dark:hover:bg-dark-primary/90 font-bold col-span-full sm:col-span-1">Run All</button>
      </div>
    </motion.div>
  );
};

export default Controls;