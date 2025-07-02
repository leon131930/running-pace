
import { Slider } from "@/components/ui/slider";
import { formatPace } from "@/utils/paceCalculations";

interface PaceSliderProps {
  pace: number;
  onPaceChange: (pace: number) => void;
  unit: 'km' | 'mi';
}

const PaceSlider = ({ pace, onPaceChange, unit }: PaceSliderProps) => {
  const minPace = 60; // 1:00 min/unit
  const maxPace = 600; // 10:00 min/unit

  const handleSliderChange = (values: number[]) => {
    // Auto-snap to nearest 5-second interval
    const snapValue = Math.round(values[0] / 5) * 5;
    onPaceChange(snapValue);
  };

  const getPaceZoneColor = (paceValue: number) => {
    if (paceValue <= 180) return 'from-green-400 to-green-600'; // Fast
    if (paceValue <= 300) return 'from-yellow-400 to-orange-500'; // Moderate
    return 'from-red-400 to-red-600'; // Slow
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-2">
          {formatPace(pace)}
        </div>
        <div className="text-blue-200">
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
          step={5}
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
