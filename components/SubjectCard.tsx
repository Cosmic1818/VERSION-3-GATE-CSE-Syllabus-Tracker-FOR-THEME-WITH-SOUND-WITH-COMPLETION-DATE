
import React, { useMemo } from 'react';
import { Subject } from '../types';
import ProgressBar from './ProgressBar';
import { playClickSound } from '../utils/sound';

interface SubjectCardProps {
  subject: Subject;
  onSelect: (subjectId: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onSelect }) => {
  const completedWeight = useMemo(() => {
    return subject.topics.reduce((sum, topic) => (topic.completed ? sum + topic.weight : sum), 0);
  }, [subject.topics]);

  const progress = useMemo(() => {
    return subject.totalWeight > 0 ? (completedWeight / subject.totalWeight) * 100 : 0;
  }, [completedWeight, subject.totalWeight]);
  
  const completedTopics = useMemo(() => subject.topics.filter(t => t.completed).length, [subject.topics]);

  const handleSelect = () => {
    playClickSound();
    onSelect(subject.id);
  };

  return (
    <div
      onClick={handleSelect}
      className="glass-card p-5 cursor-pointer flex flex-col justify-between group"
    >
      <div className="flex-grow">
        <h3 className="text-xl font-bold truncate group-hover:gradient-text transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{subject.name}</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{subject.topics.length} topics</p>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{completedTopics} / {subject.topics.length} topics</span>
          <span className="text-sm font-bold" style={{ color: 'var(--text-accent)' }}>{progress.toFixed(0)}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default SubjectCard;