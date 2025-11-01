
import React from 'react';
import { Subject } from '../types';

interface OverallProgressProps {
  syllabusData: Subject[];
}

const DonutChart: React.FC<{ percentage: number }> = ({ percentage }) => {
    const sqSize = 140;
    const strokeWidth = 12;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 100;

    return (
        <div className="relative w-36 h-36">
             <svg width={sqSize} height={sqSize} viewBox={viewBox}>
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f2fe" />
                        <stop offset="50%" stopColor="#b43dff" />
                        <stop offset="100%" stopColor="#ff34a3" />
                    </linearGradient>
                </defs>
                <circle
                    className="fill-transparent transition-colors duration-300"
                    style={{ stroke: 'var(--progress-track-bg)' }}
                    cx={sqSize / 2}
                    cy={sqSize / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                />
                <circle
                    className="fill-transparent transition-all duration-700 ease-out"
                    stroke="url(#progressGradient)"
                    cx={sqSize / 2}
                    cy={sqSize / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                        strokeLinecap: 'round',
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-3xl font-bold tracking-tighter" style={{ color: 'var(--text-primary)' }}>{`${percentage.toFixed(0)}%`}</span>
            </div>
        </div>
    );
};


const OverallProgress: React.FC<OverallProgressProps> = ({ syllabusData }) => {
  const totalWeight = syllabusData.reduce((sum, subject) => sum + subject.totalWeight, 0);
  const completedWeight = syllabusData.reduce((sum, subject) => {
    return sum + subject.topics.reduce((topicSum, topic) => {
      return topic.completed ? topicSum + topic.weight : topicSum;
    }, 0);
  }, 0);

  const overallPercentage = totalWeight > 0 ? (completedWeight / totalWeight) * 100 : 0;
  
  const totalTopics = syllabusData.reduce((sum, subject) => sum + subject.topics.length, 0);
  const completedTopics = syllabusData.reduce((sum, subject) => {
      return sum + subject.topics.filter(t => t.completed).length;
  }, 0);

  return (
    <div className="glass-card p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
       <div className="flex items-center gap-6">
        <DonutChart percentage={overallPercentage} />
        <div>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Overall Progress</h2>
            <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>Your journey to GATE excellence visualized.</p>
        </div>
       </div>
       <div className="flex gap-8 text-center">
            <div>
                <p className="text-4xl font-extrabold gradient-text">{completedTopics}</p>
                <p className="text-sm tracking-wider uppercase" style={{ color: 'var(--text-secondary)' }}>Topics Done</p>
            </div>
            <div>
                <p className="text-4xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{totalTopics}</p>
                <p className="text-sm tracking-wider uppercase" style={{ color: 'var(--text-secondary)' }}>Total Topics</p>
            </div>
       </div>
    </div>
  );
};

export default OverallProgress;
