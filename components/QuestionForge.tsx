
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface QuestionForgeProps {
  selectedConcepts: string[];
  onForge: () => void;
  isLoading: boolean;
}

export const QuestionForge: React.FC<QuestionForgeProps> = ({ selectedConcepts, onForge, isLoading }) => {
  const canForge = selectedConcepts.length >= 2;

  return (
    <div className="bg-bg-med p-6 rounded-xl shadow-lg border border-bg-light animate-fade-in">
      <h2 className="text-xl font-bold text-text-primary mb-1">2. The Forge</h2>
      <p className="text-text-secondary text-sm mb-4">Your selected concepts will appear here.</p>
      
      <div className="min-h-[60px] bg-bg-dark p-3 rounded-lg flex flex-wrap items-center gap-2 border border-bg-light">
        {selectedConcepts.length === 0 ? (
          <p className="text-text-secondary italic text-sm">Waiting for concepts...</p>
        ) : (
          selectedConcepts.map(concept => (
            <span key={concept} className="bg-brand-primary/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full animate-fade-in">
              {concept}
            </span>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onForge}
          disabled={!canForge || isLoading}
          className={`
            w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3 text-lg font-bold rounded-full transition-all duration-300 ease-in-out
            transform focus:outline-none focus:ring-4
            ${
              isLoading
                ? 'bg-bg-light text-text-secondary cursor-wait'
                : canForge
                ? 'bg-gradient-to-r from-accent-neon to-emerald-500 text-bg-dark hover:scale-105 animate-pulse-glow focus:ring-accent-neon/50'
                : 'bg-bg-light text-text-secondary cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Forging...
            </>
          ) : (
            <>
              <SparklesIcon className="w-6 h-6" />
              Forge Question
            </>
          )}
        </button>
      </div>
       {!isLoading && !canForge && (
        <p className="text-center text-amber-400 text-xs mt-3">
          Select at least 2 concepts to activate the forge.
        </p>
      )}
    </div>
  );
};
