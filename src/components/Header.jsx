
import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, InfoIcon, DownloadIcon, GithubIcon } from './Icons';

const Header = ({ theme, toggleTheme, onTheoryClick, onExport }) => {
  return (
    <header className="sticky top-0 z-40 bg-card/80 dark:bg-dark-card/80 backdrop-blur-lg border-b border-border dark:border-dark-border shadow-sm no-print print-header">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground dark:text-dark-foreground tracking-tight">
            Page Replacement Simulator
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-1 sm:gap-2"
        >
          <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted" aria-label="GitHub Repository">
            <GithubIcon size={20} />
          </a>
          <button onClick={onExport} className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted" aria-label="Export Results">
            <DownloadIcon size={20} />
          </button>
          <button onClick={onTheoryClick} className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted" aria-label="Show Theory">
            <InfoIcon size={20} />
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted" aria-label="Toggle Theme">
            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;