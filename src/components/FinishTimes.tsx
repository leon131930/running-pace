
import { useState } from 'react';
import { calculateFinishTime } from "@/utils/paceCalculations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FinishTimesProps {
  pace: number;
  unit: 'km' | 'mi';
}

const FinishTimes = ({ pace, unit }: FinishTimesProps) => {
  const [customDistance, setCustomDistance] = useState('');
  const distances = [
    { distance: 1, label: `1 ${unit}` },
    { distance: 5, label: `5 ${unit}` },
    { distance: 10, label: `10 ${unit}` },
    { distance: 15, label: `15 ${unit}` },
    { distance: 20, label: `20 ${unit}` },
    { 
      distance: unit === 'km' ? 21.1 : 13.1094, 
      label: `Half Marathon` 
    },
    { 
      distance: unit === 'km' ? 30 : 18.64, 
      label: unit === 'km' ? '30 km' : '18.64 mi'
    },
    { 
      distance: unit === 'km' ? 42.2 : 26.219, 
      label: `Full Marathon` 
    },
  ];

  const customDistanceValue = parseFloat(customDistance);
  const isValidCustomDistance = !isNaN(customDistanceValue) && customDistanceValue > 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {distances.map(({ distance, label }) => {
          const finishTime = calculateFinishTime(distance, pace);
          
          return (
            <div 
              key={label}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-blue-300/10 hover:bg-white/10 transition-colors"
            >
              <div className="text-sm text-blue-200 mb-1">{label}</div>
              <div className="text-lg font-semibold text-white">{finishTime}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <Label htmlFor="custom-distance" className="text-white font-medium">
          Or add your own distance
        </Label>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Input
              id="custom-distance"
              type="number"
              value={customDistance}
              onChange={(e) => setCustomDistance(e.target.value)}
              placeholder="0"
              className="w-24 bg-white/5 border-blue-300/20 text-white placeholder:text-white/50"
              min="0"
              step="0.1"
            />
            <span className="text-blue-200">{unit}</span>
          </div>
          {isValidCustomDistance && (
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-blue-300/10">
              <div className="text-sm text-blue-200">Finish time</div>
              <div className="text-lg font-semibold text-white">
                {calculateFinishTime(customDistanceValue, pace)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinishTimes;
