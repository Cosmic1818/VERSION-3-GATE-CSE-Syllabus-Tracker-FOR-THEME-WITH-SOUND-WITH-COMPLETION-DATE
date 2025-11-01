
import React, { useMemo } from 'react';
import { Subject, Topic } from '../types';
import TopicItem from './TopicItem';
import ProgressBar from './ProgressBar';
import { playClickSound } from '../utils/sound';

interface SubjectDetailProps {
  subject: Subject;
  onToggleTopic: (subjectId: string, topicId:string) => void;
  onBack: () => void;
}

const SubjectDetail: React.FC<SubjectDetailProps> = ({ subject, onToggleTopic, onBack }) => {
    const completedWeight = subject.topics.reduce((sum, topic) => (topic.completed ? sum + topic.weight : sum), 0);
    const progress = subject.totalWeight > 0 ? (completedWeight / subject.totalWeight) * 100 : 0;
    const completedTopicsCount = subject.topics.filter(t => t.completed).length;

    const sortedTopics = useMemo(() => 
        [...subject.topics].sort((a, b) => b.weight - a.weight), 
    [subject.topics]);

    const handleBackClick = () => {
        playClickSound();
        onBack();
    };

  return (
    <div className="fade-in">
      <button
        onClick={handleBackClick}
        className="flex items-center gap-2 mb-6 text-sm font-medium hover:opacity-80 transition-opacity group"
        style={{ color: 'var(--text-accent)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to All Subjects
      </button>

      <div className="glass-card p-6 mb-8">
        <h2 className="text-4xl font-extrabold gradient-text mb-2">{subject.name}</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{`Completed ${completedTopicsCount} of ${subject.topics.length} topics`}</p>
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{completedWeight} / {subject.totalWeight} pts</span>
            <span className="text-sm font-bold" style={{ color: 'var(--text-accent)' }}>{progress.toFixed(0)}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className="space-y-3">
        {sortedTopics.map((topic) => (
          <TopicItem
            key={topic.id}
            topic={topic}
            subjectId={subject.id}
            onToggle={onToggleTopic}
            weightPercentage={(topic.weight / subject.totalWeight) * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectDetail;