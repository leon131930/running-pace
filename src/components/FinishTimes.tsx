
import { calculateFinishTime } from "@/utils/paceCalculations";

interface FinishTimesProps {
  pace: number;
  unit: 'km' | 'mi';
}

const FinishTimes = ({ pace, unit }: FinishTimesProps) => {
  const distances = [
    { distance: 1, label: `1 ${unit}` },
    { distance: 5, label: `5 ${unit}` },
    { distance: 10, label: `10 ${unit}` },
    { distance: 15, label: `15 ${unit}` },
    { distance: 20, label: `20 ${unit}` },
    { 
      distance: unit === 'km' ? 21.0975 : 13.1094, 
      label: `Half Marathon` 
    },
    { 
      distance: unit === 'km' ? 30 : 18.64, 
      label: unit === 'km' ? '30 km' : '18.64 mi'
    },
    { 
      distance: unit === 'km' ? 42.195 : 26.219, 
      label: `Full Marathon` 
    },
  ];

  return (
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
  );
};

export default FinishTimes;
