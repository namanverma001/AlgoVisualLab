
import { ExternalLink, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-gray-900 py-10 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold bg-gradient-to-r from-algo-primary to-algo-accent text-transparent bg-clip-text">
              AlgoVisualLab
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Interactive algorithm visualizations for learning and exploration
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a 
              href="#searching" 
              className="text-gray-600 dark:text-gray-400 hover:text-algo-primary dark:hover:text-algo-accent"
            >
              Searching Algorithms
            </a>
            <a 
              href="#sorting" 
              className="text-gray-600 dark:text-gray-400 hover:text-algo-primary dark:hover:text-algo-accent"
            >
              Sorting Algorithms
            </a>
            <a 
              href="#about" 
              className="text-gray-600 dark:text-gray-400 hover:text-algo-primary dark:hover:text-algo-accent"
            >
              About
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <p>© AlgoVisualLab. Made By Naman Verma.</p>
            
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-algo-primary dark:hover:text-algo-accent transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              
              <a 
                href="https://example.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-algo-primary dark:hover:text-algo-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
