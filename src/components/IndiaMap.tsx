
import React, { useState, useRef, useEffect } from 'react';
import { indianStates, StateData } from '@/lib/states';
import MapTooltip from './MapTooltip';
import { cn } from '@/lib/utils';

interface IndiaMapProps {
  onStateClick: (state: StateData) => void;
  activeState: StateData | null;
  className?: string;
}

// Note: For the actual implementation, we need a comprehensive SVG map of India
// This is a simplified version for demonstration purposes
const IndiaMap: React.FC<IndiaMapProps> = ({ 
  onStateClick, 
  activeState,
  className 
}) => {
  const [tooltipState, setTooltipState] = useState<StateData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<SVGSVGElement>(null);
  const [mapScale, setMapScale] = useState(1);
  const [viewBox, setViewBox] = useState("0 0 700 800");
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Zoom functionality
  const handleZoom = (zoomIn: boolean) => {
    setMapScale(prev => {
      const newScale = zoomIn 
        ? Math.min(prev + 0.2, 3) 
        : Math.max(prev - 0.2, 0.5);
      return newScale;
    });
  };

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsPanning(true);
      setStartPan({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    
    const dx = (e.clientX - startPan.x) / mapScale;
    const dy = (e.clientY - startPan.y) / mapScale;
    
    setTranslate(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    
    setStartPan({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Handle tooltip position
  const handleStateHover = (
    e: React.MouseEvent<SVGPathElement>, 
    state: StateData | null
  ) => {
    setTooltipState(state);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle tooltip when mouse moves over state
  const handleStateMouseMove = (e: React.MouseEvent<SVGPathElement>) => {
    if (tooltipState) {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Reset map position
  const resetMap = () => {
    setMapScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  // Find if a state is active
  const isStateActive = (stateId: string) => {
    return activeState?.id === stateId;
  };

  return (
    <div 
      className={cn(
        "map-container",
        isPanning ? "cursor-grabbing" : "cursor-grab", 
        className
      )}
    >
      {/* Map controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={() => handleZoom(true)} 
          className="glass-card p-2 hover:bg-secondary/30 transition-colors"
          aria-label="Zoom in"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button 
          onClick={() => handleZoom(false)} 
          className="glass-card p-2 hover:bg-secondary/30 transition-colors"
          aria-label="Zoom out"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button 
          onClick={resetMap} 
          className="glass-card p-2 hover:bg-secondary/30 transition-colors"
          aria-label="Reset view"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
        </button>
      </div>

      {/* Map SVG */}
      <svg
        ref={mapRef}
        viewBox={viewBox}
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{ 
          transform: `scale(${mapScale}) translate(${translate.x}px, ${translate.y}px)` 
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* This is a simplified example - you'll need the actual SVG paths for India's states */}
        {/* Example state paths */}
        <path
          id="MH"
          d="M250,350 L300,350 L320,400 L280,450 L230,430 Z"
          className={`map-state ${isStateActive('MH') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'MH') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'MH');
            if (state) onStateClick(state);
          }}
        />
        <path
          id="GJ"
          d="M200,300 L250,350 L230,430 L180,410 L150,350 Z"
          className={`map-state ${isStateActive('GJ') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'GJ') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'GJ');
            if (state) onStateClick(state);
          }}
        />
        <path
          id="RJ"
          d="M150,250 L250,250 L250,350 L150,350 Z"
          className={`map-state ${isStateActive('RJ') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'RJ') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'RJ');
            if (state) onStateClick(state);
          }}
        />
        <path
          id="KA"
          d="M250,450 L320,400 L350,450 L330,500 L280,520 Z"
          className={`map-state ${isStateActive('KA') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'KA') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'KA');
            if (state) onStateClick(state);
          }}
        />
        <path
          id="TN"
          d="M300,520 L330,500 L380,530 L350,580 L300,570 Z"
          className={`map-state ${isStateActive('TN') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'TN') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'TN');
            if (state) onStateClick(state);
          }}
        />
        <path
          id="UP"
          d="M250,250 L350,250 L350,350 L250,350 Z"
          className={`map-state ${isStateActive('UP') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'UP') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'UP');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Additional states would be added here */}
        {/* This is a simplified representation - you would need actual SVG paths for all states */}
      </svg>

      {/* Tooltip */}
      <MapTooltip 
        content={
          tooltipState && (
            <div className="flex flex-col gap-1">
              <p className="font-medium">{tooltipState.name}</p>
              <p className="text-xs text-muted-foreground">Click to view details</p>
            </div>
          )
        }
        isVisible={!!tooltipState}
        position={tooltipPosition}
      />
    </div>
  );
};

export default IndiaMap;
