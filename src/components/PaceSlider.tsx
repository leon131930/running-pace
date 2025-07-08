import { useState, useEffect, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { formatPace, parseTime } from "@/utils/paceCalculations";

interface PaceSliderProps {
  pace: number;
  onPaceChange: (pace: number) => void;
  unit: 'km' | 'mi';
}

const PaceSlider = ({ pace, onPaceChange, unit }: PaceSliderProps) => {
  const minPace = 120; // 2:00 min/unit
  const maxPace = 480; // 8:00 min/unit
  const [isMobile, setIsMobile] = useState(false);
  const [inputValue, setInputValue] = useState(formatPace(pace));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setInputValue(formatPace(pace));
  }, [pace]);

  const handleSliderChange = (values: number[]) => {
    let newPace = values[0];
    
    // Snap to nearest 5 seconds on mobile
    if (isMobile) {
      newPace = Math.round(newPace / 5) * 5;
    }
    
    onPaceChange(newPace);
  };

  const handlePaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/[^0-9]/g, ''); // Strip everything except numbers
  
    // Limit to 3 digits: 1 for minutes, 2 for seconds
    if (digits.length > 3) digits = digits.slice(0, 3);
  
    // Extract minute and seconds
    const minutes = digits.slice(0, 1);
    let seconds = digits.slice(1).padEnd(2, '0').slice(0, 2);
  
    // Clamp minutes to max 8
    const clampedMin = Math.min(parseInt(minutes || '0', 10), 8).toString();
  
    const formatted = `${clampedMin}:${seconds}`;
    setInputValue(formatted);
  
    if (/^[0-8]:[0-5]\d$/.test(formatted)) {
      try {
        const paceInSeconds = parseTime(formatted);
        if (paceInSeconds >= minPace && paceInSeconds <= maxPace) {
          onPaceChange(paceInSeconds);
        }
      } catch {
        // Do nothing on parse error
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
          ref={inputRef}
          value={inputValue}
          onChange={handlePaceInputChange}
          maxLength={4}
          className="bg-transparent border-none text-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/50 text-center w-32 mx-auto h-auto p-0 text-3xl md:text-4xl lg:text-5xl font-bold"
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
        <span>Fast (2:00)</span>
        <span>Moderate (5:00)</span>
        <span>Slow (8:00)</span>
      </div>
    </div>
  );
};

export default PaceSlider;
