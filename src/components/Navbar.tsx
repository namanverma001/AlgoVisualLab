
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-2xl bg-gradient-to-r from-algo-primary to-algo-accent text-transparent bg-clip-text">
            AlgoVisualLab
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <a href="#searching" className="text-gray-700 dark:text-gray-300 hover:text-algo-primary dark:hover:text-algo-accent">Searching</a>
            <a href="#sorting" className="text-gray-700 dark:text-gray-300 hover:text-algo-primary dark:hover:text-algo-accent">Sorting</a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-algo-primary dark:hover:text-algo-accent">About</a>
          </div>
          
          <ThemeToggle />
          
          <Button 
            className="md:hidden"
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
            </svg>
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden container mx-auto px-4 py-2 flex flex-col space-y-2 bg-white dark:bg-gray-900 animate-fade-in border-t">
          <a href="#searching" className="text-gray-700 dark:text-gray-300 hover:text-algo-primary dark:hover:text-algo-accent py-2">Searching</a>
          <a href="#sorting" className="text-gray-700 dark:text-gray-300 hover:text-algo-primary dark:hover:text-algo-accent py-2">Sorting</a>
          <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-algo-primary dark:hover:text-algo-accent py-2">About</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
