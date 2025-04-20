
import { useState } from "react";
import { Algorithm } from "@/utils/algorithmUtils";
import AlgorithmList from "./AlgorithmList";
import AlgorithmVisualizer from "./AlgorithmVisualizer";

interface AlgorithmSectionProps {
  title: string;
  id: string;
  algorithms: Algorithm[];
  description: string;
}

const AlgorithmSection = ({ title, id, algorithms, description }: AlgorithmSectionProps) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);

  const handleSelectAlgorithm = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleCloseVisualizer = () => {
    setSelectedAlgorithm(null);
  };

  return (
    <section id={id} className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{description}</p>
        
        {selectedAlgorithm ? (
          <AlgorithmVisualizer 
            algorithm={selectedAlgorithm} 
            onClose={handleCloseVisualizer} 
          />
        ) : (
          <AlgorithmList 
            algorithms={algorithms} 
            onSelect={handleSelectAlgorithm} 
          />
        )}
      </div>
    </section>
  );
};

export default AlgorithmSection;
