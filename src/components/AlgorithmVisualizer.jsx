
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, PauseIcon, RewindIcon, FastForwardIcon } from './Icons';

const AlgorithmVisualizer = ({ result, frameCount, beladyAnomaly }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // Reset state when result changes
    setCurrentStep(0);
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [result]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => (prev < result.steps.length - 1 ? prev + 1 : prev));
      }, 800);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, result.steps.length]);

  if (!result) return null;

  const { name, steps, faults, hits, hitRatio } = result;

  const handlePlayPause = () => {
    if (currentStep === steps.length - 1) {
        setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleScrub = (e) => {
    setIsPlaying(false);
    setCurrentStep(Number(e.target.value));
  };
  
  const stepTo = (newStep) => {
    setIsPlaying(false);
    setCurrentStep(Math.max(0, Math.min(steps.length - 1, newStep)));
  }

  const currentStepData = steps[currentStep];

  const getCellColor = (isFault) => {
    return isFault ? 'bg-destructive/20 dark:bg-dark-destructive/20' : 'bg-accent/20 dark:bg-dark-accent/20';
  };
  
  const getHighlightColor = (isFault) => {
    return isFault ? 'bg-destructive/80 text-destructive-foreground' : 'bg-accent/80 text-accent-foreground';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card dark:bg-dark-card p-4 sm:p-6 rounded-lg shadow-md print-card"
    >
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground flex items-center gap-2">
          {name}
          {name === 'FIFO' && beladyAnomaly && (
             <span className="group relative">
                <span className="text-xs bg-yellow-400 text-yellow-900 font-semibold px-2 py-1 rounded-full cursor-help">
                    Belady's Anomaly!
                </span>
                <span className="absolute bottom-full mb-2 w-64 bg-card dark:bg-dark-card text-card-foreground dark:text-dark-card-foreground text-sm rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Faults increased from {beladyAnomaly.previousFaults} (at {beladyAnomaly.previousFrames} frames) to {beladyAnomaly.anomalyFaults} (at {beladyAnomaly.anomalyFrames} frames).
                </span>
             </span>
          )}
        </h3>
        <div className="flex gap-2 text-sm">
          <span className="font-semibold text-destructive dark:text-dark-destructive">Faults: {faults}</span>
          <span className="font-semibold text-accent dark:text-dark-accent">Hits: {hits}</span>
          <span className="font-semibold text-primary dark:text-dark-primary">Hit Ratio: {(hitRatio * 100).toFixed(2)}%</span>
        </div>
      </div>

      {/* Timeline Scrubber & Controls */}
      <div className="flex items-center gap-4 mb-4 no-print">
        <button onClick={() => stepTo(0)} className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted"><RewindIcon size={20}/></button>
        <button onClick={handlePlayPause} className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted">
          {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
        </button>
        <button onClick={() => stepTo(steps.length - 1)} className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted"><FastForwardIcon size={20}/></button>
        <input
          type="range"
          min="0"
          max={steps.length - 1}
          value={currentStep}
          onChange={handleScrub}
          className="w-full h-2 bg-muted dark:bg-dark-muted rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm font-mono w-24 text-center">Step: {currentStep + 1}/{steps.length}</span>
      </div>

      {/* Visualization Table */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {/* Header Row */}
          <div className="flex flex-col">
            <div className="h-10 w-24 flex items-center justify-center font-semibold text-sm">Ref String</div>
            {Array.from({ length: frameCount }).map((_, i) => (
              <div key={i} className="h-12 w-24 flex items-center justify-center font-semibold text-sm border-t border-border dark:border-dark-border">Frame {i + 1}</div>
            ))}
            <div className="h-10 w-24 flex items-center justify-center font-semibold text-sm border-t border-border dark:border-dark-border">Status</div>
          </div>
          {/* Steps Columns */}
          <div className="flex gap-2">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col rounded-md transition-all duration-300 ${index === currentStep ? 'bg-primary/10 dark:bg-dark-primary/10 scale-105' : ''}`}>
                <div className="h-10 w-12 flex items-center justify-center font-bold text-lg text-primary dark:text-dark-primary">{step.ref}</div>
                {step.frameSnapshot.map((page, i) => (
                  <div key={i} className="h-12 w-12 flex items-center justify-center font-mono text-lg border-t border-border dark:border-dark-border">
                    <AnimatePresence>
                    {page !== null && (
                      <motion.span
                        key={`${index}-${i}-${page}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`w-10 h-10 flex items-center justify-center rounded-md
                          ${(page === step.ref) ? getHighlightColor(step.isFault) : ''}
                        `}
                      >
                        {page}
                      </motion.span>
                    )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className={`h-10 w-12 flex items-center justify-center font-semibold text-xs border-t border-border dark:border-dark-border ${step.isFault ? 'text-destructive dark:text-dark-destructive' : 'text-accent dark:text-dark-accent'}`}>
                  {step.isFault ? 'FAULT' : 'HIT'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlgorithmVisualizer;