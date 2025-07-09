import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculatePaceFromDistanceTime, formatPace } from "@/utils/paceCalculations";
interface DistanceTimeCalculatorProps {
  unit: 'km' | 'mi';
}
const DistanceTimeCalculator = ({
  unit
}: DistanceTimeCalculatorProps) => {
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const calculatePace = () => {
    const dist = parseFloat(distance);
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    if (dist > 0 && (h > 0 || m > 0 || s > 0)) {
      const totalMinutes = h * 60 + m + s / 60;
      return calculatePaceFromDistanceTime(dist, totalMinutes);
    }
    return null;
  };
  const calculatedPace = calculatePace();
  return <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Distance Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Distance</h3>
          <div className="space-y-2">
            <Label htmlFor="distance" className="text-white">
              Distance ({unit})
            </Label>
            <Input id="distance" type="number" step="0.01" placeholder={`e.g., 5.25`} value={distance} onChange={e => setDistance(e.target.value)} className="bg-white/10 border-blue-300/20 text-white placeholder:text-blue-200" />
          </div>
        </div>

        {/* Time Section */}
        <div className=" ">
          <h3 className="text-lg font-semibold text-white">Time</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="hours" className="text-white">
                Hours
              </Label>
              <Input id="hours" type="number" min="0" placeholder="0" value={hours} onChange={e => setHours(e.target.value)} className="bg-white/10 border-blue-300/20 text-white placeholder:text-blue-200" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minutes" className="text-white">
                Minutes
              </Label>
              <Input id="minutes" type="number" min="0" max="59" placeholder="0" value={minutes} onChange={e => setMinutes(e.target.value)} className="bg-white/10 border-blue-300/20 text-white placeholder:text-blue-200" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seconds" className="text-white">
                Seconds
              </Label>
              <Input id="seconds" type="number" min="0" max="59" placeholder="0" value={seconds} onChange={e => setSeconds(e.target.value)} className="bg-white/10 border-blue-300/20 text-white placeholder:text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {calculatedPace && <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-blue-300/10">
          <div className="text-sm text-blue-200 mb-2">Your pace</div>
          <div className="text-3xl font-bold text-white">
            {formatPace(calculatedPace)}
          </div>
          <div className="text-blue-200">min/{unit}</div>
        </div>}
    </div>;
};
export default DistanceTimeCalculator;