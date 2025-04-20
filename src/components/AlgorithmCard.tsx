
import { Algorithm } from "@/utils/algorithmUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AlgorithmCardProps {
  algorithm: Algorithm;
  onClick: () => void;
}

const AlgorithmCard = ({ algorithm, onClick }: AlgorithmCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{algorithm.name}</CardTitle>
        <CardDescription>{algorithm.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="complexity">
          <TabsList className="w-full">
            <TabsTrigger value="complexity" className="flex-1">Complexity</TabsTrigger>
            <TabsTrigger value="code" className="flex-1">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="complexity" className="space-y-2 mt-4">
            <div>
              <span className="font-semibold">Time Complexity:</span>
              <ul className="list-disc list-inside ml-2">
                <li>Best: {algorithm.timeComplexity.best}</li>
                <li>Average: {algorithm.timeComplexity.average}</li>
                <li>Worst: {algorithm.timeComplexity.worst}</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold">Space Complexity:</span> {algorithm.spaceComplexity}
            </div>
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto text-sm">
              <code>{algorithm.code}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-algo-primary hover:bg-algo-secondary" onClick={onClick}>
          Visualize {algorithm.name}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlgorithmCard;
