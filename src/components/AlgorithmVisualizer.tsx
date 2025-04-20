
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Algorithm, ArrayItem, convertToArrayItems, sleep } from "@/utils/algorithmUtils";
import ArrayControls from "./ArrayControls";

interface AlgorithmVisualizerProps {
  algorithm: Algorithm;
  onClose: () => void;
}

const AlgorithmVisualizer = ({ algorithm, onClose }: AlgorithmVisualizerProps) => {
  const [array, setArray] = useState<ArrayItem[]>([]);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [searchValue, setSearchValue] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  // Calculate the delay based on speed (inverse relationship)
  const delay = () => Math.max(10, Math.floor(1000 * (1 - speed / 100)));

  useEffect(() => {
    // Generate initial random array
    const initialArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 95) + 5);
    setArray(convertToArrayItems(initialArray));

    // Set initial search value if applicable
    if (algorithm.type === 'search' && initialArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * initialArray.length);
      setSearchValue(initialArray[randomIndex]);
    }
  }, [algorithm.type]);

  const handleArrayGeneration = (newArray: number[]) => {
    setResult(null);
    setArray(convertToArrayItems(newArray));
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleSearchValueChange = (value: number) => {
    setSearchValue(value);
  };

  const visualizeBubbleSort = async () => {
    setIsVisualizing(true);
    setResult(null);

    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Mark elements being compared
        arrayCopy[j].state = 'compared';
        arrayCopy[j + 1].state = 'compared';
        setArray([...arrayCopy]);
        await sleep(delay());

        if (arrayCopy[j].value > arrayCopy[j + 1].value) {
          // Mark elements being swapped
          arrayCopy[j].state = 'swapping';
          arrayCopy[j + 1].state = 'swapping';
          setArray([...arrayCopy]);
          await sleep(delay());

          // Swap elements
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
          setArray([...arrayCopy]);
          await sleep(delay());
        }

        // Reset the state of compared elements
        arrayCopy[j].state = 'default';
        arrayCopy[j + 1].state = 'default';

        // Mark elements in sorted position
        if (j === n - i - 2) {
          arrayCopy[n - i - 1].state = 'sorted';
        }
      }
    }

    // Mark all elements as sorted when done
    for (let i = 0; i < arrayCopy.length; i++) {
      arrayCopy[i].state = 'sorted';
      setArray([...arrayCopy]);
      await sleep(delay() / 2);
    }

    setIsVisualizing(false);
    setResult("Array sorted successfully!");
  };

  const visualizeSelectionSort = async () => {
    setIsVisualizing(true);
    setResult(null);

    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      arrayCopy[i].state = 'selected';
      setArray([...arrayCopy]);
      await sleep(delay());

      for (let j = i + 1; j < n; j++) {
        arrayCopy[j].state = 'compared';
        setArray([...arrayCopy]);
        await sleep(delay());

        if (arrayCopy[j].value < arrayCopy[minIdx].value) {
          // Reset previous minimum
          if (minIdx !== i) {
            arrayCopy[minIdx].state = 'default';
          }
          minIdx = j;
          arrayCopy[minIdx].state = 'selected';
        } else {
          arrayCopy[j].state = 'default';
        }

        setArray([...arrayCopy]);
        await sleep(delay());
      }

      // Swap elements if minimum is not already at position i
      if (minIdx !== i) {
        arrayCopy[i].state = 'swapping';
        arrayCopy[minIdx].state = 'swapping';
        setArray([...arrayCopy]);
        await sleep(delay());

        // Swap elements
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[minIdx];
        arrayCopy[minIdx] = temp;

        arrayCopy[minIdx].state = 'default';
      }

      arrayCopy[i].state = 'sorted';
      setArray([...arrayCopy]);
      await sleep(delay());
    }

    setIsVisualizing(false);
    setResult("Array sorted successfully!");
  };

  const visualizeInsertionSort = async () => {
    setIsVisualizing(true);
    setResult(null);

    const arrayCopy = [...array];
    const n = arrayCopy.length;

    // Mark the first element as sorted
    arrayCopy[0].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(delay());

    for (let i = 1; i < n; i++) {
      const key = arrayCopy[i].value;
      arrayCopy[i].state = 'selected';
      setArray([...arrayCopy]);
      await sleep(delay());

      let j = i - 1;

      while (j >= 0 && arrayCopy[j].value > key) {
        arrayCopy[j].state = 'compared';
        setArray([...arrayCopy]);
        await sleep(delay());

        arrayCopy[j].state = 'swapping';
        arrayCopy[j + 1].state = 'swapping';
        setArray([...arrayCopy]);
        await sleep(delay());

        // Move element to the right
        arrayCopy[j + 1].value = arrayCopy[j].value;

        arrayCopy[j].state = 'sorted';
        arrayCopy[j + 1].state = 'default';
        setArray([...arrayCopy]);
        await sleep(delay());

        j--;
      }

      // Insert the key at the correct position
      arrayCopy[j + 1].value = key;
      arrayCopy[j + 1].state = 'sorted';
      setArray([...arrayCopy]);
      await sleep(delay());
    }

    setIsVisualizing(false);
    setResult("Array sorted successfully!");
  };

  const visualizeMergeSort = async () => {
    setIsVisualizing(true);
    setResult(null);

    const arrayCopy = [...array];

    async function merge(start: number, mid: number, end: number) {
      const leftSize = mid - start + 1;
      const rightSize = end - mid;

      // Create temporary arrays
      const leftArray: number[] = [];
      const rightArray: number[] = [];

      // Copy data to temporary arrays
      for (let i = 0; i < leftSize; i++) {
        leftArray[i] = arrayCopy[start + i].value;
        arrayCopy[start + i].state = 'selected';
      }

      for (let i = 0; i < rightSize; i++) {
        rightArray[i] = arrayCopy[mid + 1 + i].value;
        arrayCopy[mid + 1 + i].state = 'compared';
      }

      setArray([...arrayCopy]);
      await sleep(delay());

      // Merge the temporary arrays back
      let i = 0;
      let j = 0;
      let k = start;

      while (i < leftSize && j < rightSize) {
        // Highlight elements being compared
        arrayCopy[start + i].state = 'compared';
        arrayCopy[mid + 1 + j].state = 'compared';
        setArray([...arrayCopy]);
        await sleep(delay());

        if (leftArray[i] <= rightArray[j]) {
          arrayCopy[k].value = leftArray[i];
          arrayCopy[k].state = 'swapping';
          setArray([...arrayCopy]);
          await sleep(delay());
          arrayCopy[k].state = 'default';
          i++;
        } else {
          arrayCopy[k].value = rightArray[j];
          arrayCopy[k].state = 'swapping';
          setArray([...arrayCopy]);
          await sleep(delay());
          arrayCopy[k].state = 'default';
          j++;
        }
        k++;
      }

      // Copy the remaining elements of leftArray
      while (i < leftSize) {
        arrayCopy[k].value = leftArray[i];
        arrayCopy[k].state = 'swapping';
        setArray([...arrayCopy]);
        await sleep(delay());
        arrayCopy[k].state = 'default';
        i++;
        k++;
      }

      // Copy the remaining elements of rightArray
      while (j < rightSize) {
        arrayCopy[k].value = rightArray[j];
        arrayCopy[k].state = 'swapping';
        setArray([...arrayCopy]);
        await sleep(delay());
        arrayCopy[k].state = 'default';
        j++;
        k++;
      }

      // Mark the merged section as temporarily sorted
      for (let i = start; i <= end; i++) {
        arrayCopy[i].state = 'sorted';
        setArray([...arrayCopy]);
        await sleep(delay() / 2);
      }
    }

    async function mergeSortRecursive(start: number, end: number) {
      if (start < end) {
        const mid = Math.floor((start + end) / 2);

        await mergeSortRecursive(start, mid);
        await mergeSortRecursive(mid + 1, end);
        await merge(start, mid, end);
      }
    }

    await mergeSortRecursive(0, arrayCopy.length - 1);

    // Mark all elements as sorted when done
    for (let i = 0; i < arrayCopy.length; i++) {
      arrayCopy[i].state = 'sorted';
    }
    setArray([...arrayCopy]);

    setIsVisualizing(false);
    setResult("Array sorted successfully!");
  };

  const visualizeQuickSort = async () => {
    setIsVisualizing(true);
    setResult(null);

    const arrayCopy = [...array];

    async function partition(low: number, high: number): Promise<number> {
      // Choose the rightmost element as pivot
      const pivot = arrayCopy[high].value;
      arrayCopy[high].state = 'selected';
      setArray([...arrayCopy]);
      await sleep(delay());

      let i = low - 1;

      for (let j = low; j < high; j++) {
        arrayCopy[j].state = 'compared';
        setArray([...arrayCopy]);
        await sleep(delay());

        if (arrayCopy[j].value <= pivot) {
          i++;

          // Swap arrayCopy[i] and arrayCopy[j]
          if (i !== j) {
            arrayCopy[i].state = 'swapping';
            arrayCopy[j].state = 'swapping';
            setArray([...arrayCopy]);
            await sleep(delay());

            const temp = { ...arrayCopy[i] };
            arrayCopy[i] = { ...arrayCopy[j] };
            arrayCopy[j] = { ...temp };
          }
        }

        // Reset states
        if (i >= low) arrayCopy[i].state = 'default';
        arrayCopy[j].state = 'default';
        setArray([...arrayCopy]);
        await sleep(delay());
      }

      // Swap arrayCopy[i+1] and arrayCopy[high] (pivot)
      arrayCopy[high].state = 'swapping';
      if (i + 1 !== high) {
        arrayCopy[i + 1].state = 'swapping';
        setArray([...arrayCopy]);
        await sleep(delay());

        const temp = { ...arrayCopy[i + 1] };
        arrayCopy[i + 1] = { ...arrayCopy[high] };
        arrayCopy[high] = { ...temp };
      }

      // Reset states
      for (let k = low; k <= high; k++) {
        arrayCopy[k].state = 'default';
      }

      // Mark pivot in its final position
      arrayCopy[i + 1].state = 'sorted';
      setArray([...arrayCopy]);
      await sleep(delay());

      return i + 1;
    }

    async function quickSortRecursive(low: number, high: number) {
      if (low < high) {
        const pivotIndex = await partition(low, high);

        await quickSortRecursive(low, pivotIndex - 1);
        await quickSortRecursive(pivotIndex + 1, high);
      } else if (low === high) {
        // Mark single elements as sorted
        arrayCopy[low].state = 'sorted';
        setArray([...arrayCopy]);
        await sleep(delay());
      }
    }

    await quickSortRecursive(0, arrayCopy.length - 1);

    // Mark all elements as sorted when done
    for (let i = 0; i < arrayCopy.length; i++) {
      if (arrayCopy[i].state !== 'sorted') {
        arrayCopy[i].state = 'sorted';
      }
    }
    setArray([...arrayCopy]);

    setIsVisualizing(false);
    setResult("Array sorted successfully!");
  };

  const visualizeHeapSort = async () => {
    setIsVisualizing(true);
    setResult(null);

    const arrayCopy = [...array];
    const n = arrayCopy.length;

    async function heapify(size: number, rootIndex: number) {
      let largest = rootIndex;
      const left = 2 * rootIndex + 1;
      const right = 2 * rootIndex + 2;

      // Highlight the current root
      arrayCopy[rootIndex].state = 'selected';
      setArray([...arrayCopy]);
      await sleep(delay());

      // Compare with left child
      if (left < size) {
        arrayCopy[left].state = 'compared';
        setArray([...arrayCopy]);
        await sleep(delay());

        if (arrayCopy[left].value > arrayCopy[largest].value) {
          // Reset previous largest
          arrayCopy[largest].state = 'default';
          largest = left;
          arrayCopy[largest].state = 'selected';
          setArray([...arrayCopy]);
          await sleep(delay());
        } else {
          arrayCopy[left].state = 'default';
          setArray([...arrayCopy]);
          await sleep(delay());
        }
      }

      // Compare with right child
      if (right < size) {
        arrayCopy[right].state = 'compared';
        setArray([...arrayCopy]);
        await sleep(delay());

        if (arrayCopy[right].value > arrayCopy[largest].value) {
          // Reset previous largest
          arrayCopy[largest].state = 'default';
          largest = right;
          arrayCopy[largest].state = 'selected';
          setArray([...arrayCopy]);
          await sleep(delay());
        } else {
          arrayCopy[right].state = 'default';
          setArray([...arrayCopy]);
          await sleep(delay());
        }
      }

      // If largest is not root, swap and continue heapifying
      if (largest !== rootIndex) {
        arrayCopy[rootIndex].state = 'swapping';
        arrayCopy[largest].state = 'swapping';
        setArray([...arrayCopy]);
        await sleep(delay());

        // Swap
        const temp = { ...arrayCopy[rootIndex] };
        arrayCopy[rootIndex] = { ...arrayCopy[largest] };
        arrayCopy[largest] = { ...temp };

        // Reset states
        arrayCopy[rootIndex].state = 'default';
        arrayCopy[largest].state = 'default';
        setArray([...arrayCopy]);
        await sleep(delay());

        // Recursively heapify the affected sub-tree
        await heapify(size, largest);
      } else {
        // Reset state if no swap occurred
        arrayCopy[rootIndex].state = 'default';
        setArray([...arrayCopy]);
        await sleep(delay());
      }
    }

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      arrayCopy[0].state = 'swapping';
      arrayCopy[i].state = 'swapping';
      setArray([...arrayCopy]);
      await sleep(delay());

      // Swap
      const temp = { ...arrayCopy[0] };
      arrayCopy[0] = { ...arrayCopy[i] };
      arrayCopy[i] = { ...temp };

      // Mark the element as sorted
      arrayCopy[i].state = 'sorted';
      arrayCopy[0].state = 'default';
      setArray([...arrayCopy]);
      await sleep(delay());

      // Heapify the reduced heap
      await heapify(i, 0);
    }

    // Mark the last element as sorted
    arrayCopy[0].state = 'sorted';
    setArray([...arrayCopy]);

    setIsVisualizing(false);
    setResult("Array sorted successfully!");
  };

  const visualizeLinearSearch = async () => {
    if (searchValue === null) return;

    setIsVisualizing(true);
    setResult(null);

    const arrayCopy = [...array];
    let found = false;

    for (let i = 0; i < arrayCopy.length; i++) {
      // Highlight current element being checked
      arrayCopy[i].state = 'compared';
      setArray([...arrayCopy]);
      await sleep(delay());

      if (arrayCopy[i].value === searchValue) {
        // Mark as found
        arrayCopy[i].state = 'selected';
        setArray([...arrayCopy]);
        found = true;
        break;
      } else {
        // Reset state if not found
        arrayCopy[i].state = 'default';
        setArray([...arrayCopy]);
        await sleep(delay() / 2);
      }
    }

    setIsVisualizing(false);
    setResult(found ? `Value ${searchValue} found!` : `Value ${searchValue} not found in the array.`);
  };

  const visualizeBinarySearch = async () => {
    if (searchValue === null) return;

    setIsVisualizing(true);
    setResult(null);

    // First sort the array for binary search
    const arrayCopy = [...array].sort((a, b) => a.value - b.value);
    setArray(arrayCopy);
    await sleep(delay());

    let left = 0;
    let right = arrayCopy.length - 1;
    let found = false;

    while (left <= right) {
      // Highlight the current search range
      for (let i = left; i <= right; i++) {
        arrayCopy[i].state = 'compared';
      }
      setArray([...arrayCopy]);
      await sleep(delay());

      const mid = Math.floor((left + right) / 2);

      // Highlight the middle element
      arrayCopy[mid].state = 'selected';
      setArray([...arrayCopy]);
      await sleep(delay() * 2);

      if (arrayCopy[mid].value === searchValue) {
        // Value found
        found = true;

        // Reset all states except the found element
        for (let i = 0; i < arrayCopy.length; i++) {
          if (i !== mid) {
            arrayCopy[i].state = 'default';
          }
        }

        setArray([...arrayCopy]);
        break;
      } else if (arrayCopy[mid].value < searchValue) {
        // Reset left half states
        for (let i = left; i <= mid; i++) {
          arrayCopy[i].state = 'default';
        }
        left = mid + 1;
      } else {
        // Reset right half states
        for (let i = mid; i <= right; i++) {
          arrayCopy[i].state = 'default';
        }
        right = mid - 1;
      }

      setArray([...arrayCopy]);
      await sleep(delay());
    }

    setIsVisualizing(false);
    setResult(found ? `Value ${searchValue} found!` : `Value ${searchValue} not found in the array.`);
  };

  const handleVisualize = () => {
    if (isVisualizing) return;

    switch (algorithm.name) {
      case 'Bubble Sort':
        visualizeBubbleSort();
        break;
      case 'Selection Sort':
        visualizeSelectionSort();
        break;
      case 'Insertion Sort':
        visualizeInsertionSort();
        break;
      case 'Merge Sort':
        visualizeMergeSort();
        break;
      case 'Quick Sort':
        visualizeQuickSort();
        break;
      case 'Heap Sort':
        visualizeHeapSort();
        break;
      case 'Linear Search':
        visualizeLinearSearch();
        break;
      case 'Binary Search':
        visualizeBinarySearch();
        break;
      default:
        console.error('Unknown algorithm');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-bounce-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{algorithm.name} Visualization</h2>
        <Button variant="outline" onClick={onClose}>Close</Button>
      </div>

      <ArrayControls
        onGenerateArray={handleArrayGeneration}
        onSpeedChange={handleSpeedChange}
        isVisualizing={isVisualizing}
        algorithmType={algorithm.type}
        onSearchValueChange={algorithm.type === 'search' ? handleSearchValueChange : undefined}
      />

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Visualization</h3>
        <div className="visualization-container">
          {array.map((item, index) => (
            <div
              key={index}
              className={`array-bar array-bar-${item.state} dynamic-bar`}
            >
              {array.length <= 20 && (
                <div className="text-xs text-center mt-2">{item.value}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex justify-between">
        <div>
          {result && (
            <div className={`p-2 rounded ${result.includes('not found') ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
              {result}
            </div>
          )}
        </div>

        <Button
          onClick={handleVisualize}
          disabled={isVisualizing || array.length === 0 || (algorithm.type === 'search' && searchValue === null)}
          className="bg-algo-primary hover:bg-algo-secondary text-white"
        >
          {isVisualizing ? 'Visualizing...' : 'Visualize'}
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-algo-primary mr-2 rounded"></div>
            <span>Default</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-algo-compare mr-2 rounded"></div>
            <span>Compared</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-algo-swap mr-2 rounded"></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-algo-selected mr-2 rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-algo-sorted mr-2 rounded"></div>
            <span>Sorted/Found</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
