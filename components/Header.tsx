
import React from 'react';
import { FlaskIcon } from './icons/FlaskIcon';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center sm:justify-start text-center sm:text-left p-4 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary shadow-lg">
      <div className="bg-white/20 p-3 rounded-full mr-4 hidden sm:block">
        <FlaskIcon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          JEE Physics Question Forge
        </h1>
        <p className="text-indigo-200 mt-1">
          Mix concepts, spark curiosity, and master physics.
        </p>
      </div>
    </header>
  );
};
