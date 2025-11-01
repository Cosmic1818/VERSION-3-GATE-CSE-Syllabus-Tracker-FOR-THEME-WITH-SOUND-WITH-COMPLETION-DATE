
import React, { useState } from 'react';
import { THEMES } from '../themes';
import { playClickSound } from '../utils/sound';

interface ThemeSwitcherProps {
  activeTheme: string;
  setActiveTheme: (themeId: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ activeTheme, setActiveTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    playClickSound();
    setIsOpen(!isOpen);
  }

  const handleThemeChange = (themeId: string) => {
    playClickSound();
    setActiveTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors"
        style={{ 
            backgroundColor: 'var(--card-bg)', 
            borderColor: 'var(--card-border)'
        }}
        aria-label="Change theme"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM3 11a1 1 0 100-2H2a1 1 0 100 2h1z" />
        </svg>
      </button>

      {isOpen && (
        <div 
            className="absolute right-0 mt-2 w-48 p-2 glass-card z-50 origin-top-right animate-in fade-in-0 zoom-in-95"
            onMouseLeave={() => setIsOpen(false)}
        >
          <p className="text-sm font-semibold px-2 pb-2" style={{ color: 'var(--text-secondary)' }}>Select Theme</p>
          <div className="space-y-1">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between transition-colors`}
                style={{ backgroundColor: activeTheme === theme.id ? 'var(--card-hover-bg)' : 'transparent' }}
              >
                <span className={activeTheme === theme.id ? 'font-semibold' : ''} style={{ color: 'var(--text-primary)'}}>
                  {theme.name}
                </span>
                <div className="w-5 h-5 rounded-full" style={{ background: theme.colors['--accent-gradient'] }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;