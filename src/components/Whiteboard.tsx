import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pen, Eraser, Trash2, Undo, Redo } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WhiteboardProps {
  height?: number;
}

export const Whiteboard = ({ height = 400 }: WhiteboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [brushColor, setBrushColor] = useState("#000000");
  const { toast } = useToast();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasRef.current.parentElement?.clientWidth || 800,
      height: height,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });

    // Initialize the freeDrawingBrush
    const brush = new PencilBrush(canvas);
    brush.color = brushColor;
    brush.width = 3;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current?.parentElement) {
        canvas.setDimensions({
          width: canvasRef.current.parentElement.clientWidth,
          height: height,
        });
        canvas.renderAll();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, [height]);

  useEffect(() => {
    if (!fabricCanvas) return;
    
    fabricCanvas.isDrawingMode = isDrawing;
    
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = brushColor;
    }
  }, [isDrawing, brushColor, fabricCanvas]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast({
      title: "Whiteboard cleared",
      description: "Ready for your next calculation!",
    });
  };

  const handleUndo = () => {
    if (!fabricCanvas) return;
    const objects = fabricCanvas.getObjects();
    if (objects.length > 0) {
      fabricCanvas.remove(objects[objects.length - 1]);
      fabricCanvas.renderAll();
    }
  };

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  const handleColorChange = (color: string) => {
    setBrushColor(color);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 items-center">
          <Button
            variant={isDrawing ? "default" : "outline"}
            size="sm"
            onClick={toggleDrawing}
          >
            <Pen className="w-4 h-4" />
            Draw
          </Button>
          
          <Button
            variant={!isDrawing ? "default" : "outline"}
            size="sm"
            onClick={toggleDrawing}
          >
            <Eraser className="w-4 h-4" />
            Erase
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
          >
            <Undo className="w-4 h-4" />
            Undo
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>

          <div className="flex gap-2 ml-auto">
            {['#000000', '#2563eb', '#dc2626', '#16a34a', '#ca8a04'].map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  brushColor === color ? 'border-gray-900 scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
          <canvas ref={canvasRef} />
        </div>

        <p className="text-sm text-muted-foreground text-center">
          ✏️ Use the whiteboard to solve the practice problems above!
        </p>
      </CardContent>
    </Card>
  );
};
