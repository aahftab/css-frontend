import { useIsMobile } from "@/hooks/use-mobile";
import { useIsIOS } from "@/hooks/use-ios-detection";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const isIOS = useIsIOS();

  return (
    <div 
      className={cn(
        "container mx-auto px-4 z-10 relative",
        isMobile ? "pb-16 pt-4" : "pb-4",
        // Add extra bottom padding for iOS devices to account for the bottom bar
        isIOS && isMobile ? "pb-[env(safe-area-inset-bottom,24px)]" : ""
      )}
      style={{
        paddingBottom: isIOS && isMobile ? 
          "calc(4rem + env(safe-area-inset-bottom, 24px))" : undefined,
        paddingTop: !isMobile ? 
          "calc(4rem + env(safe-area-inset-top, 0px))" : undefined
      }}
    >
      <div className="backdrop-blur-[2px] rounded-lg">
        {children}
      </div>
    </div>
  );
}
