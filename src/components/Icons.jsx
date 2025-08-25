// -----------------------------------------------------------------------------
// 🖼️ src/components/Icons.jsx
// -----------------------------------------------------------------------------
import React from 'react'; // <-- This line was missing
import {
  Sun, Moon, Play, Pause, FastForward, Rewind, RotateCcw, Download, Upload, Info, X, Menu, Github, Settings
} from 'lucide-react';

export const SunIcon = (props) => <Sun {...props} />;
export const MoonIcon = (props) => <Moon {...props} />;
export const PlayIcon = (props) => <Play {...props} />;
export const PauseIcon = (props) => <Pause {...props} />;
export const FastForwardIcon = (props) => <FastForward {...props} />;
export const RewindIcon = (props) => <Rewind {...props} />;
export const ResetIcon = (props) => <RotateCcw {...props} />;
export const DownloadIcon = (props) => <Download {...props} />;
export const UploadIcon = (props) => <Upload {...props} />;
export const InfoIcon = (props) => <Info {...props} />;
export const XIcon = (props) => <X {...props} />;
export const MenuIcon = (props) => <Menu {...props} />;
export const GithubIcon = (props) => <Github {...props} />;
export const SettingsIcon = (props) => <Settings {...props} />;