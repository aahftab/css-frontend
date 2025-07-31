import React from "react";
import { cn } from "@/lib/utils";

interface AppBackgroundProps {
  children: React.ReactNode;
}

export function AppBackground({ children }: AppBackgroundProps) {
  return (
    <div 
      className={cn(
        "min-h-screen w-full bg-background text-foreground flex flex-col",
        // Add support for top and bottom safe areas
        "pt-[env(safe-area-inset-top,0px)]",
        "pb-[env(safe-area-inset-bottom,0px)]"
      )}
      style={{
        // This ensures the background color extends into the safe areas
        '--safe-area-inset-top': 'env(safe-area-inset-top, 0px)',
        '--safe-area-inset-bottom': 'env(safe-area-inset-bottom, 0px)',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
