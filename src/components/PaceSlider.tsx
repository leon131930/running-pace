
import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { formatPace, parseTime } from "@/utils/paceCalculations";

interface PaceSliderProps {
  pace: number;
  onPaceChange: (pace: number) => void;
  unit: 'km' | 'mi';
}

const PaceSlider = ({ pace, onPaceChange, unit }: PaceSliderProps) => {
  const minPace = 60; // 1:00 min/unit
  const maxPace = 600; // 10:00 min/unit
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSliderChange = (values: number[]) => {
    let newPace = values[0];
    
    // Snap to nearest 5 seconds on mobile
    if (isMobile) {
      newPace = Math.round(newPace / 5) * 5;
    }
    
    onPaceChange(newPace);
  };

  const handlePaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow typing mm:ss format
    if (value.match(/^\d{1,2}:\d{0,2}$/)) {
      try {
        const paceInSeconds = parseTime(value);
        if (paceInSeconds >= minPace && paceInSeconds <= maxPace) {
          onPaceChange(paceInSeconds);
        }
      } catch {
        // Invalid format, ignore
      }
    }
  };

  const getPaceZoneColor = (paceValue: number) => {
    if (paceValue <= 180) return 'from-green-400 to-green-600'; // Fast
    if (paceValue <= 300) return 'from-yellow-400 to-orange-500'; // Moderate
    return 'from-red-400 to-red-600'; // Slow
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Input
          value={formatPace(pace)}
          onChange={handlePaceInputChange}
          className="text-3xl font-bold text-center bg-transparent border-none text-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/50 w-32 mx-auto h-auto p-0 text-3xl"
          placeholder="5:00"
        />
        <div className="text-blue-200 mt-2">
          min/{unit}
        </div>
      </div>
      
      <div className="relative">
        {/* Gradient background for pace zones */}
        <div className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 opacity-30" />
        
        <Slider
          value={[pace]}
          onValueChange={handleSliderChange}
          max={maxPace}
          min={minPace}
          step={isMobile ? 5 : 1}
          className="relative z-10"
        />
      </div>
      
      <div className="flex justify-between text-sm text-blue-200">
        <span>Fast (1:00)</span>
        <span>Moderate (5:00)</span>
        <span>Slow (10:00)</span>
      </div>
    </div>
  );
};

export default PaceSlider;
