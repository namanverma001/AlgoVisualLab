
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-algo-primary via-algo-accent to-algo-secondary text-transparent bg-clip-text">
          Algorithm Visualization Lab
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Interactive visualizations of classic searching and sorting algorithms
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-algo-primary hover:bg-algo-secondary text-white" size="lg" asChild>
            <a href="#searching">Searching Algorithms</a>
          </Button>
          <Button className="bg-algo-accent hover:bg-algo-secondary text-white" size="lg" asChild>
            <a href="#sorting">Sorting Algorithms</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
