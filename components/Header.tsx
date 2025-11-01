
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
    activeTheme: string;
    setActiveTheme: (themeId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTheme, setActiveTheme }) => {
  return (
    <header 
        className="py-6 px-4 sm:px-6 lg:px-8 backdrop-blur-sm sticky top-0 z-50 border-b"
        style={{ 
            backgroundColor: 'var(--header-bg)', 
            borderColor: 'var(--header-border)',
            transition: 'background-color 0.3s, border-color 0.3s'
        }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                style={{ background: 'var(--accent-gradient)' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{color: 'var(--text-on-accent)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
             <h1 className="text-3xl font-bold tracking-tighter">
                GATE CSE <span className="gradient-text">Syllabus Tracker</span>
             </h1>
         </div>
         <ThemeSwitcher activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
      </div>
    </header>
  );
};

export default Header;