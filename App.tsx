import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SyllabusView from './components/SyllabusView';
import SubjectDetail from './components/SubjectDetail';
import { SYLLABUS_DATA } from './constants';
import { Subject } from './types';
import { THEMES } from './themes';

const SYLLABUS_STORAGE_KEY = 'gateCseSyllabusProgress';
const THEME_STORAGE_KEY = 'gateCseTheme';

const App: React.FC = () => {
  const [syllabusData, setSyllabusData] = useState<Subject[]>(() => {
    try {
      const savedData = localStorage.getItem(SYLLABUS_STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : SYLLABUS_DATA;
    } catch (error) {
      console.error("Error loading syllabus data from localStorage", error);
      return SYLLABUS_DATA;
    }
  });
  
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'deepSpace';
  });

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  // Effect to save syllabus progress
  useEffect(() => {
    try {
        localStorage.setItem(SYLLABUS_STORAGE_KEY, JSON.stringify(syllabusData));
    } catch (error) {
        console.error("Error saving syllabus data to localStorage", error);
    }
  }, [syllabusData]);
  
  // Effect to apply and save theme
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
    const theme = THEMES.find(t => t.id === activeTheme);
    if (theme) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }, [activeTheme]);

  const handleToggleTopic = useCallback((subjectId: string, topicId: string) => {
    setSyllabusData(prevData =>
      prevData.map(subject => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            topics: subject.topics.map(topic => {
              if (topic.id === topicId) {
                const isCompleted = !topic.completed;
                return { 
                  ...topic, 
                  completed: isCompleted,
                  completionDate: isCompleted ? Date.now() : undefined,
                };
              }
              return topic;
            }),
          };
        }
        return subject;
      })
    );
  }, []);

  const handleSelectSubject = useCallback((subjectId: string) => {
    setSelectedSubjectId(subjectId);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedSubjectId(null);
  }, []);

  const selectedSubject = useMemo(() => {
    return syllabusData.find(s => s.id === selectedSubjectId) || null;
  }, [selectedSubjectId, syllabusData]);

  return (
    <div className="min-h-screen font-sans">
      <Header activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedSubject ? (
          <SubjectDetail
            subject={selectedSubject}
            onToggleTopic={handleToggleTopic}
            onBack={handleBack}
          />
        ) : (
          <SyllabusView
            syllabusData={syllabusData}
            onSelectSubject={handleSelectSubject}
          />
        )}
      </main>
       <footer className="text-center py-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
        <p>Built for GATE CSE Aspirants with a futuristic touch.</p>
      </footer>
    </div>
  );
};

export default App;