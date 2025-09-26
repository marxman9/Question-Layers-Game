
import React from 'react';

interface ConceptSelectorProps {
  concepts: string[];
  selectedConcepts: string[];
  onConceptToggle: (concept: string) => void;
}

export const ConceptSelector: React.FC<ConceptSelectorProps> = ({ concepts, selectedConcepts, onConceptToggle }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {concepts.map(concept => {
        const isSelected = selectedConcepts.includes(concept);
        return (
          <button
            key={concept}
            onClick={() => onConceptToggle(concept)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ease-in-out
              transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-med
              ${
                isSelected
                  ? 'bg-accent-neon text-bg-dark shadow-md focus:ring-accent-neon'
                  : 'bg-bg-light text-text-secondary hover:bg-gray-600 hover:text-text-primary focus:ring-brand-light'
              }
            `}
          >
            {concept}
          </button>
        );
      })}
    </div>
  );
};
