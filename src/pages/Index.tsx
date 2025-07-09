import { useState, useEffect } from 'react';
import UnitToggle from '@/components/UnitToggle';
import PaceSlider from '@/components/PaceSlider';
import FinishTimes from '@/components/FinishTimes';
import DistanceTimeCalculator from '@/components/DistanceTimeCalculator';
import { Card } from '@/components/ui/card';
const Index = () => {
  const [unit, setUnit] = useState<'km' | 'mi'>('km');
  const [pace, setPace] = useState(300); // 5:00 in seconds

  // Load unit preference from localStorage
  useEffect(() => {
    const savedUnit = localStorage.getItem('running-unit') as 'km' | 'mi' | null;
    if (savedUnit) {
      setUnit(savedUnit);
    }
  }, []);

  // Save unit preference to localStorage
  const handleUnitChange = (newUnit: 'km' | 'mi') => {
    setUnit(newUnit);
    localStorage.setItem('running-unit', newUnit);
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Running Pace Calculator
            </h1>
            <p className="text-blue-200">Calculate your finish time and running pace</p>
          </div>
          <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
        </div>

        <div className="space-y-4 md:space-y-8">
          {/* Section 1: Start from pace */}
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-blue-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Calculate finish time</h2>
            <div className="space-y-4 md:space-y-6">
              <PaceSlider pace={pace} onPaceChange={setPace} unit={unit} />
              <FinishTimes pace={pace} unit={unit} />
            </div>
          </Card>

          {/* Section 2: Start from distance and time */}
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-blue-300/20">
            <h2 className="text-2xl font-semibold text-white mb-6">Calculate pace</h2>
            <DistanceTimeCalculator unit={unit} />
          </Card>
        </div>
      </div>
    </div>;
};
export default Index;