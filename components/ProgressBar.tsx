
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div 
      className="w-full rounded-full h-2 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: 'var(--progress-track-bg)' }}
    >
      <div
        className="progress-bar-gradient h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${safeProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
