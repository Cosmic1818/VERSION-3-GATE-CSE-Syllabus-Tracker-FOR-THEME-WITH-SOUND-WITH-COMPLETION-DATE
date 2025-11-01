
import React from 'react';
import { Subject } from '../types';
import SubjectCard from './SubjectCard';
import OverallProgress from './OverallProgress';

interface SyllabusViewProps {
  syllabusData: Subject[];
  onSelectSubject: (subjectId: string) => void;
}

const SyllabusView: React.FC<SyllabusViewProps> = ({ syllabusData, onSelectSubject }) => {
  return (
    <div>
        <OverallProgress syllabusData={syllabusData} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {syllabusData.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} onSelect={onSelectSubject} />
        ))}
        </div>
    </div>
  );
};

export default SyllabusView;
