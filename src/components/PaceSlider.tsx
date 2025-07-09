import { useState, useEffect, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { formatPace, parseTime } from "@/utils/paceCalculations";
interface PaceSliderProps {
  pace: number;
  onPaceChange: (pace: number) => void;
  unit: 'km' | 'mi';
}
const PaceSlider = ({
  pace,
  onPaceChange,
  unit
}: PaceSliderProps) => {
  const minPace = 120; // 2:00 min/unit
  const maxPace = 480; // 8:00 min/unit
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
  const getPaceZoneColor = (paceValue: number) => {
    if (paceValue <= 180) return 'from-green-400 to-green-600'; // Fast
    if (paceValue <= 300) return 'from-yellow-400 to-orange-500'; // Moderate
    return 'from-red-400 to-red-600'; // Slow
  };
  return <div className="space-y-3 md:space-y-4">
      <div className="text-center">
        <div className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
          {formatPace(pace)}
        </div>
        <div className="text-blue-200 mt-2">
          min/{unit}
        </div>
      </div>
      
      <div className="relative">
        {/* Gradient background for pace zones */}
        <div className="absolute inset-0 h-2 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 opacity-30" />
        
        <Slider value={[pace]} onValueChange={handleSliderChange} max={maxPace} min={minPace} step={isMobile ? 5 : 1} className="relative z-10" />
      </div>
      
      <div className="flex justify-between text-sm text-blue-200">
        <span>Sprint pace (2:00)</span>
        <span>Recovery (8:00)</span>
      </div>
    </div>;
};
export default PaceSlider;