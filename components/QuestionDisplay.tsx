
import React, { useState } from 'react';
import type { Question } from '../types';

interface QuestionDisplayProps {
  question: Question;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="bg-bg-med p-6 rounded-xl shadow-lg border border-bg-light animate-slide-in-up">
      <div className="mb-4">
        <span className="bg-brand-secondary text-white text-xs font-bold px-3 py-1 rounded-full">{question.topic}</span>
      </div>
      <h3 className="text-2xl font-bold text-accent-neon mb-4">Your Custom Challenge</h3>
      
      <div className="space-y-4 text-text-secondary prose prose-invert max-w-none">
        <p className="whitespace-pre-wrap">{question.questionText}</p>
      </div>
      
      <div className="mt-6 border-t border-bg-light pt-4">
        {!showSolution ? (
          <button
            onClick={() => setShowSolution(true)}
            className="bg-brand-primary hover:bg-brand-light text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Show Solution
          </button>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">Step-by-Step Solution:</h4>
              <p className="whitespace-pre-wrap text-text-secondary">{question.solution}</p>
            </div>
            <div className="bg-bg-dark p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-text-primary mb-2">Final Answer:</h4>
              <p className="text-accent-neon font-bold text-xl">{question.finalAnswer}</p>
            </div>
            <button
                onClick={() => setShowSolution(false)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
            >
                Hide Solution
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
