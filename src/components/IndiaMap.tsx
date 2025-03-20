
import React, { useState, useRef, useEffect } from 'react';
import { indianStates, StateData } from '@/lib/states';
import MapTooltip from './MapTooltip';
import { cn } from '@/lib/utils';

interface IndiaMapProps {
  onStateClick: (state: StateData) => void;
  activeState: StateData | null;
  className?: string;
}

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
        {/* More accurate map of India with all states and UTs */}
        {/* Jammu and Kashmir */}
        <path
          id="JK"
          d="M200,120 L230,100 L260,110 L290,90 L310,120 L290,140 L260,150 L240,140 L220,150 L200,140 Z"
          className={`map-state ${isStateActive('JK') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'JK') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'JK');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Himachal Pradesh */}
        <path
          id="HP"
          d="M220,150 L250,150 L270,170 L250,190 L220,180 L210,160 Z"
          className={`map-state ${isStateActive('HP') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'HP') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'HP');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Punjab */}
        <path
          id="PB"
          d="M180,160 L210,160 L220,180 L210,200 L190,210 L170,190 Z"
          className={`map-state ${isStateActive('PB') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'PB') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'PB');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Uttarakhand */}
        <path
          id="UK"
          d="M250,190 L280,180 L310,200 L290,220 L260,210 L240,200 Z"
          className={`map-state ${isStateActive('UK') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'UK') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'UK');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Haryana */}
        <path
          id="HR"
          d="M190,210 L220,200 L240,220 L230,240 L200,250 L180,230 Z"
          className={`map-state ${isStateActive('HR') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'HR') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'HR');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Delhi */}
        <path
          id="DL"
          d="M210,235 L220,230 L225,240 L215,245 Z"
          className={`map-state ${isStateActive('DL') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'DL') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'DL');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Rajasthan */}
        <path
          id="RJ"
          d="M150,250 L180,230 L200,250 L220,270 L200,320 L150,330 L120,290 L130,250 Z"
          className={`map-state ${isStateActive('RJ') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'RJ') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'RJ');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Uttar Pradesh */}
        <path
          id="UP"
          d="M230,240 L260,210 L290,220 L330,240 L340,270 L310,310 L270,330 L240,320 L220,270 Z"
          className={`map-state ${isStateActive('UP') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'UP') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'UP');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Bihar */}
        <path
          id="BR"
          d="M340,270 L370,260 L400,280 L380,310 L350,320 L310,310 Z"
          className={`map-state ${isStateActive('BR') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'BR') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'BR');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Sikkim */}
        <path
          id="SK"
          d="M380,240 L390,230 L400,240 L390,250 Z"
          className={`map-state ${isStateActive('SK') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'SK') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'SK');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Arunachal Pradesh */}
        <path
          id="AR"
          d="M450,210 L480,215 L470,235 L440,240 L420,230 Z"
          className={`map-state ${isStateActive('AR') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'AR') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'AR');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Assam */}
        <path
          id="AS"
          d="M420,230 L440,240 L460,250 L430,270 L400,280 L370,260 L390,250 L410,240 Z"
          className={`map-state ${isStateActive('AS') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'AS') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'AS');
            if (state) onStateClick(state);
          }}
        />
        
        {/* West Bengal */}
        <path
          id="WB"
          d="M380,310 L400,280 L430,270 L440,290 L420,330 L390,350 L370,340 Z"
          className={`map-state ${isStateActive('WB') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'WB') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'WB');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Jharkhand */}
        <path
          id="JH"
          d="M350,320 L380,310 L370,340 L350,360 L330,350 Z"
          className={`map-state ${isStateActive('JH') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'JH') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'JH');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Odisha (formerly Orissa) */}
        <path
          id="OD"
          d="M330,350 L350,360 L370,370 L360,400 L330,410 L300,380 L310,350 Z"
          className={`map-state ${isStateActive('OD') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'OD') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'OD');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Chhattisgarh */}
        <path
          id="CT"
          d="M270,330 L310,310 L350,320 L330,350 L310,350 L300,380 L270,370 L260,350 Z"
          className={`map-state ${isStateActive('CT') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'CT') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'CT');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Madhya Pradesh */}
        <path
          id="MP"
          d="M200,320 L240,320 L270,330 L260,350 L270,370 L240,390 L210,370 L170,350 L180,320 Z"
          className={`map-state ${isStateActive('MP') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'MP') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'MP');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Gujarat */}
        <path
          id="GJ"
          d="M120,290 L150,330 L170,350 L150,370 L130,390 L100,380 L80,360 L70,320 L90,300 Z"
          className={`map-state ${isStateActive('GJ') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'GJ') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'GJ');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Maharashtra */}
        <path
          id="MH"
          d="M150,370 L170,350 L210,370 L240,390 L230,420 L190,440 L150,430 L130,390 Z"
          className={`map-state ${isStateActive('MH') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'MH') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'MH');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Telangana */}
        <path
          id="TG"
          d="M240,390 L270,370 L300,380 L290,410 L270,430 L250,420 L230,420 Z"
          className={`map-state ${isStateActive('TG') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'TG') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'TG');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Andhra Pradesh */}
        <path
          id="AP"
          d="M230,420 L250,420 L270,430 L290,410 L330,410 L350,450 L310,490 L260,460 L230,440 Z"
          className={`map-state ${isStateActive('AP') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'AP') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'AP');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Karnataka */}
        <path
          id="KA"
          d="M190,440 L230,440 L260,460 L240,490 L200,510 L180,490 L160,450 Z"
          className={`map-state ${isStateActive('KA') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'KA') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'KA');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Goa */}
        <path
          id="GA"
          d="M160,450 L180,450 L175,470 L155,465 Z"
          className={`map-state ${isStateActive('GA') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'GA') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'GA');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Kerala */}
        <path
          id="KL"
          d="M200,510 L220,520 L215,560 L195,570 L180,530 Z"
          className={`map-state ${isStateActive('KL') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'KL') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'KL');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Tamil Nadu */}
        <path
          id="TN"
          d="M200,510 L240,490 L280,510 L290,550 L260,590 L230,580 L215,560 L220,520 Z"
          className={`map-state ${isStateActive('TN') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'TN') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'TN');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Mizoram */}
        <path
          id="MZ"
          d="M440,290 L450,285 L460,300 L450,310 Z"
          className={`map-state ${isStateActive('MZ') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'MZ') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'MZ');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Tripura */}
        <path
          id="TR"
          d="M430,310 L440,300 L445,315 L435,325 Z"
          className={`map-state ${isStateActive('TR') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'TR') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'TR');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Meghalaya */}
        <path
          id="ML"
          d="M410,265 L430,270 L425,280 L405,275 Z"
          className={`map-state ${isStateActive('ML') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'ML') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'ML');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Manipur */}
        <path
          id="MN"
          d="M450,270 L465,265 L470,280 L455,290 Z"
          className={`map-state ${isStateActive('MN') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'MN') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'MN');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Nagaland */}
        <path
          id="NL"
          d="M445,250 L460,250 L465,265 L450,270 Z"
          className={`map-state ${isStateActive('NL') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'NL') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'NL');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Ladakh */}
        <path
          id="LA"
          d="M240,70 L270,60 L300,70 L280,100 L260,110 L230,100 Z"
          className={`map-state ${isStateActive('LA') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'LA') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'LA');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Andaman and Nicobar Islands */}
        <path
          id="AN"
          d="M500,500 L510,490 L520,510 L510,520 Z"
          className={`map-state ${isStateActive('AN') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'AN') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'AN');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Chandigarh */}
        <circle
          id="CH"
          cx="210"
          cy="190"
          r="5"
          className={`map-state ${isStateActive('CH') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'CH') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'CH');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Puducherry */}
        <circle
          id="PY"
          cx="255"
          cy="550"
          r="5"
          className={`map-state ${isStateActive('PY') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'PY') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'PY');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Lakshadweep */}
        <circle
          id="LD"
          cx="130"
          cy="520"
          r="5"
          className={`map-state ${isStateActive('LD') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'LD') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'LD');
            if (state) onStateClick(state);
          }}
        />
        
        {/* Dadra and Nagar Haveli and Daman and Diu */}
        <circle
          id="DN"
          cx="130"
          cy="370"
          r="5"
          className={`map-state ${isStateActive('DN') ? 'active' : ''}`}
          onMouseEnter={(e) => handleStateHover(e, indianStates.find(s => s.id === 'DN') || null)}
          onMouseLeave={(e) => handleStateHover(e, null)}
          onMouseMove={handleStateMouseMove}
          onClick={() => {
            const state = indianStates.find(s => s.id === 'DN');
            if (state) onStateClick(state);
          }}
        />
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
        url={tooltipState?.url}
      />
    </div>
  );
};

export default IndiaMap;
