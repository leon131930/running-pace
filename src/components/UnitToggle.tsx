import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
interface UnitToggleProps {
  unit: 'km' | 'mi';
  onUnitChange: (unit: 'km' | 'mi') => void;
}
const UnitToggle = ({
  unit,
  onUnitChange
}: UnitToggleProps) => {
  return <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-blue-300/20">
      <Label htmlFor="unit-toggle" className="text-white font-medium">
        km
      </Label>
      <Switch id="unit-toggle" checked={unit === 'mi'} onCheckedChange={checked => onUnitChange(checked ? 'mi' : 'km')} className="text-slate-700 bg-teal-700 hover:bg-teal-600" />
      <Label htmlFor="unit-toggle" className="text-white font-medium">
        mi
      </Label>
    </div>;
};
export default UnitToggle;