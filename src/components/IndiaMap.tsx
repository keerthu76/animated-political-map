
import React, { useState, useRef, useEffect } from 'react';
import { indianStates, StateData } from '@/lib/states';
import MapTooltip from './MapTooltip';
import { cn } from '@/lib/utils';

interface IndiaMapProps {
  onStateClick: (state: StateData) => void;
  activeState: StateData | null;
  className?: string;
}

// Define clickable regions based on the image
const stateRegions = [
  { id: 'JK', coords: '200,120,230,100,260,110,290,90,310,120,290,140,260,150,240,140,220,150,200,140', name: 'Jammu and Kashmir' },
  { id: 'HP', coords: '220,150,250,150,270,170,250,190,220,180,210,160', name: 'Himachal Pradesh' },
  { id: 'PB', coords: '180,160,210,160,220,180,210,200,190,210,170,190', name: 'Punjab' },
  { id: 'UK', coords: '250,190,280,180,310,200,290,220,260,210,240,200', name: 'Uttarakhand' },
  { id: 'HR', coords: '190,210,220,200,240,220,230,240,200,250,180,230', name: 'Haryana' },
  { id: 'RJ', coords: '150,250,180,230,200,250,220,270,200,320,150,330,120,290,130,250', name: 'Rajasthan' },
  { id: 'UP', coords: '230,240,260,210,290,220,330,240,340,270,310,310,270,330,240,320,220,270', name: 'Uttar Pradesh' },
  { id: 'BR', coords: '340,270,370,260,400,280,380,310,350,320,310,310', name: 'Bihar' },
  { id: 'SK', coords: '380,240,390,230,400,240,390,250', name: 'Sikkim' },
  { id: 'AR', coords: '450,210,480,215,470,235,440,240,420,230', name: 'Arunachal Pradesh' },
  { id: 'AS', coords: '420,230,440,240,460,250,430,270,400,280,370,260,390,250,410,240', name: 'Assam' },
  { id: 'WB', coords: '380,310,400,280,430,270,440,290,420,330,390,350,370,340', name: 'West Bengal' },
  { id: 'JH', coords: '350,320,380,310,370,340,350,360,330,350', name: 'Jharkhand' },
  { id: 'OD', coords: '330,350,350,360,370,370,360,400,330,410,300,380,310,350', name: 'Odisha' },
  { id: 'CT', coords: '270,330,310,310,350,320,330,350,310,350,300,380,270,370,260,350', name: 'Chhattisgarh' },
  { id: 'MP', coords: '200,320,240,320,270,330,260,350,270,370,240,390,210,370,170,350,180,320', name: 'Madhya Pradesh' },
  { id: 'GJ', coords: '120,290,150,330,170,350,150,370,130,390,100,380,80,360,70,320,90,300', name: 'Gujarat' },
  { id: 'MH', coords: '150,370,170,350,210,370,240,390,230,420,190,440,150,430,130,390', name: 'Maharashtra' },
  { id: 'TG', coords: '240,390,270,370,300,380,290,410,270,430,250,420,230,420', name: 'Telangana' },
  { id: 'AP', coords: '230,420,250,420,270,430,290,410,330,410,350,450,310,490,260,460,230,440', name: 'Andhra Pradesh' },
  { id: 'KA', coords: '190,440,230,440,260,460,240,490,200,510,180,490,160,450', name: 'Karnataka' },
  { id: 'GA', coords: '160,450,180,450,175,470,155,465', name: 'Goa' },
  { id: 'KL', coords: '200,510,220,520,215,560,195,570,180,530', name: 'Kerala' },
  { id: 'TN', coords: '200,510,240,490,280,510,290,550,260,590,230,580,215,560,220,520', name: 'Tamil Nadu' },
  // Northeast states
  { id: 'MZ', coords: '440,290,450,285,460,300,450,310', name: 'Mizoram' },
  { id: 'TR', coords: '430,310,440,300,445,315,435,325', name: 'Tripura' },
  { id: 'ML', coords: '410,265,430,270,425,280,405,275', name: 'Meghalaya' },
  { id: 'MN', coords: '450,270,465,265,470,280,455,290', name: 'Manipur' },
  { id: 'NL', coords: '445,250,460,250,465,265,450,270', name: 'Nagaland' },
  // Union Territories and other regions
  { id: 'DL', coords: '210,235,220,230,225,240,215,245', name: 'Delhi' },
  { id: 'LA', coords: '240,70,270,60,300,70,280,100,260,110,230,100', name: 'Ladakh' },
  { id: 'AN', coords: '500,500,510,490,520,510,510,520', name: 'Andaman and Nicobar Islands' },
  { id: 'CH', coords: '210,190,5', name: 'Chandigarh', shape: 'circle' },
  { id: 'PY', coords: '255,550,5', name: 'Puducherry', shape: 'circle' },
  { id: 'LD', coords: '130,520,5', name: 'Lakshadweep', shape: 'circle' },
  { id: 'DN', coords: '130,370,5', name: 'Dadra and Nagar Haveli and Daman and Diu', shape: 'circle' }
];

const IndiaMap: React.FC<IndiaMapProps> = ({ 
  onStateClick, 
  activeState,
  className 
}) => {
  const [tooltipState, setTooltipState] = useState<StateData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [mapScale, setMapScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageMap, setImageMap] = useState<HTMLMapElement | null>(null);

  useEffect(() => {
    // Simulate loading the map data
    const loadMap = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading map:", error);
        setMapError("Failed to load map. Please try again later.");
        setIsLoading(false);
      }
    };

    loadMap();
  }, []);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

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
      setIsDragging(true);
      setStartDrag({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - startDrag.x;
    const dy = e.clientY - startDrag.y;
    
    setPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset map position
  const resetMap = () => {
    setMapScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle area hover
  const handleAreaHover = (e: React.MouseEvent<HTMLAreaElement>, stateId: string) => {
    const state = indianStates.find(s => s.id === stateId);
    if (state) {
      setTooltipState(state);
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle area click
  const handleAreaClick = (e: React.MouseEvent<HTMLAreaElement>, stateId: string) => {
    e.preventDefault();
    const state = indianStates.find(s => s.id === stateId);
    if (state) {
      onStateClick(state);
    }
  };

  // Handle mouse movement for tooltip positioning
  const handleAreaMouseMove = (e: React.MouseEvent<HTMLAreaElement>) => {
    if (tooltipState) {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse leave for tooltip
  const handleAreaMouseLeave = () => {
    setTooltipState(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-white/50 backdrop-blur-sm rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="loading-spinner"></div>
          <p className="text-sm font-medium text-muted-foreground">Loading map data...</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-white/50 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="bg-destructive/10 p-3 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-destructive">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <p className="text-destructive font-medium">{mapError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white px-4 py-2 rounded-md mt-2 text-sm hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef}
      className={cn(
        "map-container relative overflow-hidden bg-white",
        isDragging ? "cursor-grabbing" : "cursor-grab", 
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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

      {/* Map Image with Image Map */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ 
          transform: `scale(${mapScale})`,
          transition: 'transform 0.3s ease'
        }}
      >
        <div
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }}
        >
          <img
            ref={imageRef}
            src="/lovable-uploads/india-map.png"
            alt="Political Map of India"
            className={`max-w-full max-h-full object-contain ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            useMap="#india-map"
            style={{ transition: 'opacity 0.5s ease' }}
          />
          
          <map name="india-map">
            {stateRegions.map(region => (
              region.shape === 'circle' ? (
                <area
                  key={region.id}
                  shape="circle"
                  coords={region.coords}
                  alt={region.name}
                  title={region.name}
                  href="#"
                  onClick={(e) => handleAreaClick(e, region.id)}
                  onMouseEnter={(e) => handleAreaHover(e, region.id)}
                  onMouseMove={handleAreaMouseMove}
                  onMouseLeave={handleAreaMouseLeave}
                  className={`${activeState?.id === region.id ? 'active-area' : ''}`}
                />
              ) : (
                <area
                  key={region.id}
                  shape="poly"
                  coords={region.coords}
                  alt={region.name}
                  title={region.name}
                  href="#"
                  onClick={(e) => handleAreaClick(e, region.id)}
                  onMouseEnter={(e) => handleAreaHover(e, region.id)}
                  onMouseMove={handleAreaMouseMove}
                  onMouseLeave={handleAreaMouseLeave}
                  className={`${activeState?.id === region.id ? 'active-area' : ''}`}
                />
              )
            ))}
          </map>
        </div>
      </div>

      {/* Active State Overlay - Shows which state is selected */}
      {activeState && (
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md shadow-md">
          <p className="text-sm font-medium text-primary">{activeState.name}</p>
        </div>
      )}

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
