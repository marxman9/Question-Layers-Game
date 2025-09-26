
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ConceptSelector } from './components/ConceptSelector';
import { QuestionForge } from './components/QuestionForge';
import { QuestionDisplay } from './components/QuestionDisplay';
import { PHYSICS_CONCEPTS } from './constants';
import { generateQuestion } from './services/geminiService';
import type { Question } from './types';

const App: React.FC = () => {
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [generatedQuestion, setGeneratedQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleConceptToggle = useCallback((concept: string) => {
    setSelectedConcepts(prev =>
      prev.includes(concept)
        ? prev.filter(c => c !== concept)
        : [...prev, concept]
    );
  }, []);

  const handleForgeQuestion = useCallback(async () => {
    if (selectedConcepts.length < 2) {
      setError('Please select at least two concepts to forge a question.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedQuestion(null);
    try {
      const question = await generateQuestion(selectedConcepts);
      setGeneratedQuestion(question);
    } catch (e) {
      console.error(e);
      setError('Failed to forge a question. The AI might be busy, please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedConcepts]);

  return (
    <div className="min-h-screen bg-bg-dark font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 animate-fade-in">
             <div className="bg-bg-med p-6 rounded-xl shadow-lg border border-bg-light">
              <h2 className="text-xl font-bold text-text-primary mb-1">1. Choose Your Ingredients</h2>
              <p className="text-text-secondary text-sm mb-4">Select two or more concepts to combine.</p>
              <ConceptSelector
                concepts={PHYSICS_CONCEPTS}
                selectedConcepts={selectedConcepts}
                onConceptToggle={handleConceptToggle}
              />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <QuestionForge
              selectedConcepts={selectedConcepts}
              onForge={handleForgeQuestion}
              isLoading={isLoading}
            />
            {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center animate-fade-in">{error}</div>}
            {generatedQuestion && (
              <QuestionDisplay question={generatedQuestion} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
