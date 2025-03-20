
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { indianStates, StateData } from '@/lib/states';

interface SearchBarProps {
  onSelectState: (state: StateData) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectState }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [results, setResults] = useState<StateData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Filter states based on search query
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = indianStates.filter(state => 
        state.name.toLowerCase().includes(query.toLowerCase()) ||
        state.id.toLowerCase() === query.toLowerCase()
      );
      setResults(filtered);
      setSelectedIndex(-1);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleSelectState(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
    }
  };

  const handleSelectState = (state: StateData) => {
    onSelectState(state);
    setQuery('');
    setResults([]);
    setIsExpanded(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className={`
        search-glassmorphism transition-all duration-300 flex items-center
        ${isExpanded ? 'rounded-t-xl shadow-lg' : 'rounded-full shadow'}
      `}>
        <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search states & territories..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onKeyDown={handleKeyDown}
          className="flex h-11 w-full rounded-md bg-transparent py-2 px-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="mr-2 p-1.5 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isExpanded && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute z-10 w-full bg-white border border-t-0 search-glassmorphism border-white/40 rounded-b-xl shadow-lg mt-[-1px] max-h-80 overflow-auto"
        >
          <ul className="py-1">
            {results.map((state, index) => (
              <li 
                key={state.id}
                className={`
                  px-4 py-2.5 cursor-pointer transition-colors
                  flex items-center justify-between
                  ${selectedIndex === index ? 'bg-secondary/70' : 'hover:bg-secondary/50'}
                `}
                onClick={() => handleSelectState(state)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{state.name}</span>
                </div>
                <span className="text-xs bg-primary/10 rounded-full px-2 py-0.5 text-primary">
                  {state.type === 'state' ? 'State' : 'UT'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
