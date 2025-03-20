
import React from 'react';
import { StateData } from '@/lib/states';
import { ExternalLink, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StateDetailsProps {
  state: StateData | null;
  onClose: () => void;
  className?: string;
}

const StateDetails: React.FC<StateDetailsProps> = ({ 
  state, 
  onClose,
  className
}) => {
  if (!state) return null;

  return (
    <div className={cn(
      "glass-card relative p-6 w-full max-w-md animate-fade-in",
      className
    )}>
      <button 
        onClick={onClose} 
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`
              state-chip
              ${state.type === 'state' ? 'bg-primary/10 text-primary' : 'bg-accent/80 text-accent-foreground'}
            `}>
              {state.type === 'state' ? 'State' : 'Union Territory'}
            </span>
            <span className="text-xs text-muted-foreground">
              {state.id}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">{state.name}</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Capital: {state.capital}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground">Population</p>
          <p className="font-medium">{state.population}</p>
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <p className="text-xs text-muted-foreground">Area</p>
          <p className="font-medium">{state.area}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm font-medium mb-2">Languages</p>
        <div className="flex flex-wrap gap-1.5">
          {state.languages.map(language => (
            <span key={language} className="state-chip bg-secondary/80 text-secondary-foreground">
              {language}
            </span>
          ))}
        </div>
      </div>
      
      <p className="text-sm mb-4">{state.description}</p>
      
      <a 
        href={state.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        Learn more <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
};

export default StateDetails;
