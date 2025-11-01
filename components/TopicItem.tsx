import React from 'react';
import { Topic } from '../types';
import { playClickSound } from '../utils/sound';

interface TopicItemProps {
  topic: Topic;
  subjectId: string;
  onToggle: (subjectId: string, topicId: string) => void;
  weightPercentage: number;
}

const CheckIcon = () => (
    <svg className="w-4 h-4" style={{ color: 'var(--text-on-accent)'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const TopicItem: React.FC<TopicItemProps> = ({ topic, subjectId, onToggle, weightPercentage }) => {
  const handleToggle = () => {
    playClickSound();
    onToggle(subjectId, topic.id);
  };
  
  return (
    <div 
        className="flex items-center justify-between p-4 glass-card cursor-pointer"
        onClick={handleToggle}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 pt-1">
            <input
                type="checkbox"
                checked={topic.completed}
                onChange={() => {}}
                className="sr-only peer"
            />
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                topic.completed ? 'progress-bar-gradient' : ''
            }`}
            style={{
                backgroundColor: topic.completed ? '' : 'var(--checkbox-bg)',
                border: topic.completed ? '' : `2px solid var(--checkbox-border)`,
            }}
            >
                {topic.completed && <CheckIcon />}
            </div>
        </div>
        <div>
          <span className={`transition-colors duration-300 ${topic.completed ? 'line-through' : ''}`}
              style={{ color: topic.completed ? 'var(--text-secondary)' : 'var(--text-primary)' }}
          >
            {topic.name}
          </span>
          {topic.completed && topic.completionDate && (
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Completed on: {new Date(topic.completionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{topic.weight} pts</div>
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{weightPercentage.toFixed(1)}%</div>
      </div>
    </div>
  );
};

export default TopicItem;