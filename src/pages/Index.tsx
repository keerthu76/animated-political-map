
import React, { useState } from 'react';
import IndiaMap from '@/components/IndiaMap';
import SearchBar from '@/components/SearchBar';
import StateDetails from '@/components/StateDetails';
import { StateData } from '@/lib/states';
import { ExternalLink, Info } from 'lucide-react';

const Index = () => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  
  const handleStateClick = (state: StateData) => {
    setSelectedState(state);
  };

  const handleCloseDetails = () => {
    setSelectedState(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-10 animate-fade-in">
            <div className="text-center">
              <div className="inline-block bg-primary/5 rounded-full px-4 py-1.5 mb-2">
                <span className="text-sm font-medium text-primary">Interactive Exploration</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                India Political Map
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the diverse states and union territories of India through this interactive map. 
                Click on any region to learn more about its history, culture, and significance.
              </p>
            </div>

            {/* Search */}
            <div className="mt-8 max-w-md mx-auto">
              <SearchBar onSelectState={handleStateClick} />
            </div>
          </header>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className={`
              col-span-1 md:col-span-${selectedState ? '2' : '3'} 
              transition-all duration-500 
              h-[500px] md:h-[600px]
            `}>
              <IndiaMap 
                onStateClick={handleStateClick} 
                activeState={selectedState}
                className="w-full h-full animate-slide-up" 
              />
            </div>

            {selectedState && (
              <div className="col-span-1 md:animate-fade-in">
                <StateDetails 
                  state={selectedState} 
                  onClose={handleCloseDetails} 
                />
              </div>
            )}
          </div>

          {/* Info section */}
          <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-primary/10 p-2 rounded-full">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-medium mb-2">About this map</h2>
                <p className="text-muted-foreground mb-4">
                  India is a diverse nation with 28 states and 8 union territories, each with its unique culture, 
                  language, and traditions. This interactive map allows you to explore the political divisions 
                  of India and learn about each region's distinctive characteristics.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-map-default"></div>
                    <span className="text-sm">States</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-map-highlight"></div>
                    <span className="text-sm">Selected State</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              © {new Date().getFullYear()} India Political Map Explorer
            </p>
            <p>
              Data sources: <a href="https://www.census2011.co.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-0.5">
                Census of India <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
