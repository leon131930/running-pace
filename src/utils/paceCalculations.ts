
// Convert pace in seconds per unit to formatted string (mm:ss)
export const formatPace = (paceInSeconds: number): string => {
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = paceInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Convert formatted time string to seconds
export const parseTime = (timeString: string): number => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};

// Calculate finish time for a given distance and pace
export const calculateFinishTime = (distance: number, paceInSeconds: number): string => {
  const totalSeconds = distance * paceInSeconds;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
};

// Calculate pace from distance and total time
export const calculatePaceFromDistanceTime = (distance: number, totalMinutes: number): number => {
  return Math.round((totalMinutes * 60) / distance);
};

// Convert between km and miles
export const convertDistance = (distance: number, fromUnit: 'km' | 'mi', toUnit: 'km' | 'mi'): number => {
  if (fromUnit === toUnit) return distance;
  
  if (fromUnit === 'km' && toUnit === 'mi') {
    return distance * 0.621371;
  } else {
    return distance * 1.60934;
  }
};
