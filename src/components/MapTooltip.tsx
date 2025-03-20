
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface MapTooltipProps {
  content: React.ReactNode;
  isVisible: boolean;
  position: { x: number; y: number };
  className?: string;
  url?: string;
}

const MapTooltip: React.FC<MapTooltipProps> = ({
  content,
  isVisible,
  position,
  className,
  url
}) => {
  const [tooltipStyles, setTooltipStyles] = useState<React.CSSProperties>({
    transform: 'translate(-50%, -100%) translateY(-12px)',
    opacity: 0,
    visibility: 'hidden'
  });
  
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) {
      setTooltipStyles(prev => ({ 
        ...prev, 
        opacity: 0, 
        visibility: 'hidden',
        pointerEvents: 'none'
      }));
      return;
    }

    // Calculate position adjustments
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Default position above the cursor
      let translateX = '-50%';
      let translateY = '-100% translateY(-12px)';
      
      // Adjust if tooltip would go off the right edge
      if (position.x + tooltipRect.width / 2 > viewportWidth) {
        translateX = `-100%`;
      }
      // Adjust if tooltip would go off the left edge
      else if (position.x - tooltipRect.width / 2 < 0) {
        translateX = '0';
      }
      
      // Adjust if tooltip would go off the top edge
      if (position.y - tooltipRect.height < 0) {
        translateY = '12px';
      }

      setTooltipStyles({
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(${translateX}, ${translateY})`,
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        zIndex: 50
      });
    }
  }, [isVisible, position, tooltipRef]);

  return (
    <div 
      ref={tooltipRef}
      className={cn(
        "tooltip-glassmorphism rounded-lg px-4 py-2 transition-all duration-200 overflow-hidden",
        "min-w-[150px] max-w-[300px] z-50",
        isVisible ? "animate-scale-in" : "animate-scale-out",
        className
      )}
      style={tooltipStyles}
    >
      {content}
      {url && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-1 text-xs font-medium text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Visit website <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
};

export default MapTooltip;
