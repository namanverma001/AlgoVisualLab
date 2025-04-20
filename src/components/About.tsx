
const About = () => {
  return (
    <section id="about" className="py-16 bg-slate-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">About Algorithm Visualization</h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Algorithm visualization is a powerful educational tool that helps students, developers, and enthusiasts understand how algorithms work through interactive, visual representations of their execution.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Why Visualize Algorithms?</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Visual learning often makes complex concepts more accessible and memorable</li>
            <li>Seeing algorithms in action helps develop intuition about their behavior and performance</li>
            <li>Visualizations can reveal patterns and insights that may not be obvious from pseudocode alone</li>
            <li>Interactive exploration encourages experimentation and deeper understanding</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-4">How to Use This Tool</h3>
          
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>Select an algorithm from either the Searching or Sorting sections</li>
            <li>Generate a random array or input your own custom values</li>
            <li>Adjust the animation speed to your preference</li>
            <li>Click "Visualize" to see the algorithm in action</li>
            <li>Use the visualization controls to step through the algorithm</li>
            <li>Observe how elements change states during the algorithm's execution</li>
          </ol>
          
          <h3 className="text-xl font-semibold mb-4">Understanding Algorithm Complexity</h3>
          
          <p className="mb-4">
            Each algorithm's performance is characterized by its time and space complexity, which are expressed using Big O notation:
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>O(1)</strong> - Constant time: The algorithm takes the same amount of time regardless of input size</li>
            <li><strong>O(log n)</strong> - Logarithmic time: The algorithm's time increases logarithmically with input size</li>
            <li><strong>O(n)</strong> - Linear time: The algorithm's time increases linearly with input size</li>
            <li><strong>O(n log n)</strong> - Linearithmic time: Common for efficient sorting algorithms like Merge Sort</li>
            <li><strong>O(n²)</strong> - Quadratic time: Often seen in algorithms with nested loops</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
