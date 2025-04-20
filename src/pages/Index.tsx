
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AlgorithmSection from "@/components/AlgorithmSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { SEARCH_ALGORITHMS, SORT_ALGORITHMS } from "@/utils/algorithmUtils";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <AlgorithmSection 
          title="Searching Algorithms" 
          id="searching"
          algorithms={SEARCH_ALGORITHMS}
          description="Searching algorithms are methods for finding a specific element within a data structure. These visualizations demonstrate how different searching techniques work and their efficiency."
        />
        
        <AlgorithmSection 
          title="Sorting Algorithms" 
          id="sorting"
          algorithms={SORT_ALGORITHMS}
          description="Sorting algorithms arrange elements in a certain order. These visualizations illustrate the different approaches to sorting and their performance characteristics."
        />
        
        <About />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
