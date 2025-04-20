
export type AlgorithmType = 'search' | 'sort';

export interface Algorithm {
  name: string;
  type: AlgorithmType;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  code: string;
}

export interface ArrayItem {
  value: number;
  state: 'default' | 'compared' | 'swapping' | 'selected' | 'sorted';
}

export const SEARCH_ALGORITHMS: Algorithm[] = [
  {
    name: 'Linear Search',
    type: 'search',
    description: 'Sequentially checks each element of the list until a match is found or the whole list has been searched.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`
  },
  {
    name: 'Binary Search',
    type: 'search',
    description: 'Finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`
  }
];

export const SORT_ALGORITHMS: Algorithm[] = [
  {
    name: 'Bubble Sort',
    type: 'sort',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    code: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j + 1]
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`
  },
  {
    name: 'Selection Sort',
    type: 'sort',
    description: 'Divides the array into a sorted and an unsorted part, and repeatedly selects the smallest element from the unsorted part and moves it to the sorted part.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    code: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      // Swap arr[i] and arr[minIdx]
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}`
  },
  {
    name: 'Insertion Sort',
    type: 'sort',
    description: 'Builds the sorted array one item at a time by comparing each new element to the already sorted elements and inserting it into the correct position.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    code: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}`
  },
  {
    name: 'Merge Sort',
    type: 'sort',
    description: 'Divides the array into two halves, recursively sorts them, and then merges the sorted halves.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIdx = 0;
  let rightIdx = 0;
  
  while (leftIdx < left.length && rightIdx < right.length) {
    if (left[leftIdx] < right[rightIdx]) {
      result.push(left[leftIdx]);
      leftIdx++;
    } else {
      result.push(right[rightIdx]);
      rightIdx++;
    }
  }
  
  return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));
}`
  },
  {
    name: 'Quick Sort',
    type: 'sort',
    description: 'Selects a "pivot" element and partitions the array such that all elements less than the pivot come before it, and all elements greater than the pivot come after it.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
  },
  {
    name: 'Heap Sort',
    type: 'sort',
    description: 'Builds a max-heap from the input array, then repeatedly extracts the maximum element and places it at the end of the sorted portion of the array.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    code: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Heapify the reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`
  }
];

export function generateRandomArray(length: number, min: number, max: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

export function parseInputArray(input: string): number[] {
  // Handle comma or space separated values
  const cleaned = input.replace(/\s+/g, ' ').trim();
  
  if (cleaned.includes(',')) {
    return cleaned.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
  } else {
    return cleaned.split(' ').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
  }
}

export function convertToArrayItems(array: number[]): ArrayItem[] {
  return array.map(value => ({
    value,
    state: 'default'
  }));
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
