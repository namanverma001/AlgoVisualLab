
import { Algorithm } from "@/utils/algorithmUtils";
import AlgorithmCard from "./AlgorithmCard";

interface AlgorithmListProps {
  algorithms: Algorithm[];
  onSelect: (algorithm: Algorithm) => void;
}

const AlgorithmList = ({ algorithms, onSelect }: AlgorithmListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {algorithms.map((algorithm) => (
        <AlgorithmCard 
          key={algorithm.name} 
          algorithm={algorithm}
          onClick={() => onSelect(algorithm)}
        />
      ))}
    </div>
  );
};

export default AlgorithmList;
