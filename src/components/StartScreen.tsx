import { useEffect, useState } from "react";
import logoIcon from "@/assets/logo-icon.png";

interface StartScreenProps {
  onComplete: () => void;
}

export function StartScreen({ onComplete }: StartScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center space-y-6 animate-float">
        <img 
          src={logoIcon} 
          alt="FlowHivee" 
          className="w-32 h-32 mx-auto animate-pulse-glow" 
        />
        <h1 className="text-4xl font-bold bg-gradient-warm bg-clip-text text-transparent">
          FlowHivee
        </h1>
        <p className="text-lg text-muted-foreground">Learn Anywhere ✨</p>
      </div>
    </div>
  );
}
