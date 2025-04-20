import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { generateRandomArray, parseInputArray } from "@/utils/algorithmUtils";

interface ArrayControlsProps {
  onGenerateArray: (array: number[]) => void;
  onSpeedChange: (speed: number) => void;
  isVisualizing: boolean;
  algorithmType: 'search' | 'sort';
  onSearchValueChange?: (value: number) => void;
}

const ArrayControls = ({
  onGenerateArray,
  onSpeedChange,
  isVisualizing,
  algorithmType,
  onSearchValueChange
}: ArrayControlsProps) => {
  const [arrayInput, setArrayInput] = useState("");
  const [arraySize, setArraySize] = useState(20);
  const [minValue, setMinValue] = useState(5);
  const [maxValue, setMaxValue] = useState(100);
  const [speed, setSpeed] = useState(50);
  const [searchValue, setSearchValue] = useState(0);

  const handleRandomGenerate = () => {
    const array = generateRandomArray(arraySize, minValue, maxValue);
    onGenerateArray(array);

    // Set a default search value from the generated array
    if (algorithmType === 'search' && onSearchValueChange && array.length > 0) {
      const randomIndex = Math.floor(Math.random() * array.length);
      setSearchValue(array[randomIndex]);
      onSearchValueChange(array[randomIndex]);
    }
  };

  const handleInputArraySubmit = () => {
    if (arrayInput.trim()) {
      const array = parseInputArray(arrayInput);
      if (array.length > 0) {
        onGenerateArray(array);

        // Set a default search value from the input array
        if (algorithmType === 'search' && onSearchValueChange && array.length > 0) {
          const randomIndex = Math.floor(Math.random() * array.length);
          setSearchValue(array[randomIndex]);
          onSearchValueChange(array[randomIndex]);
        }
      }
    }
  };

  const handleSpeedChange = (newSpeed: number[]) => {
    setSpeed(newSpeed[0]);
    onSpeedChange(newSpeed[0]);
  };

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setSearchValue(0);
      if (onSearchValueChange) {
        onSearchValueChange(0);
      }
      return;
    }

    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      setSearchValue(value);
      if (onSearchValueChange) {
        onSearchValueChange(value);
      }
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Random Array</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-4">
              <Label htmlFor="array-size">Size:</Label>
              <Input
                id="array-size"
                type="number"
                min="5"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value))}
                disabled={isVisualizing}
                className="w-20"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Label htmlFor="min-value">Min Value:</Label>
              <Input
                id="min-value"
                type="number"
                min="1"
                max="999"
                value={minValue}
                onChange={(e) => setMinValue(parseInt(e.target.value))}
                disabled={isVisualizing}
                className="w-20"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Label htmlFor="max-value">Max Value:</Label>
              <Input
                id="max-value"
                type="number"
                min="1"
                max="999"
                value={maxValue}
                onChange={(e) => setMaxValue(parseInt(e.target.value))}
                disabled={isVisualizing}
                className="w-20"
              />
            </div>

            <Button
              onClick={handleRandomGenerate}
              disabled={isVisualizing}
              className="w-full"
            >
              Generate Random Array
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-lg">Custom Array</h3>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="array-input">Enter comma or space separated values:</Label>
            <Input
              id="array-input"
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              placeholder="e.g., 5, 2, 9, 1, 5, 6"
              disabled={isVisualizing}
            />

            <Button
              onClick={handleInputArraySubmit}
              disabled={isVisualizing || !arrayInput.trim()}
              className="w-full"
            >
              Use Custom Array
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="animation-speed">Animation Speed:</Label>
          <span className="text-sm">{speed}%</span>
        </div>
        <Slider
          id="animation-speed"
          value={[speed]}
          onValueChange={handleSpeedChange}
          min={1}
          max={100}
          step={1}
          disabled={isVisualizing}
        />
        <div className="flex justify-between text-xs">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {algorithmType === 'search' && (
        <div className="space-y-2">
          <Label htmlFor="search-value">Value to Search:</Label>
          <Input
            id="search-value"
            type="number"
            value={searchValue || ''}
            onChange={handleSearchValueChange}
            disabled={isVisualizing}
            placeholder="Enter a number to search"
          />
        </div>
      )}
    </div>
  );
};

export default ArrayControls;
