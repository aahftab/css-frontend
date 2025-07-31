import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsIOS } from "@/hooks/use-ios-detection";
import { Home, Settings, FileBadge, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const isMobile = useIsMobile();
  const isIOS = useIsIOS();

  return (
    <nav
      className={cn(
        "fixed w-full backdrop-blur-sm bg-background/50 z-50 px-2 transition-all duration-300",
        isMobile
          ? "bottom-0 left-0 right-0 border-t border-border/70 shadow-[0_-1px_15px_rgba(0,0,0,0.03)]"
          : "top-0 left-0 right-0 border-b border-border/70 shadow-[0_1px_15px_rgba(0,0,0,0.03)]"
      )}
      style={
        isMobile && isIOS 
          ? { paddingBottom: "env(safe-area-inset-bottom, 0px)" } 
          : !isMobile 
            ? { paddingTop: "env(safe-area-inset-top, 0px)" } 
            : {}
      }
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-around w-full">
          {/* Navigation Links */}
          <NavItem to="/" label="Home" icon={<Home size={20} />} />
          <NavItem to="/services" label="Services" icon={<FileBadge size={20} />} />
          <NavItem to="/projects" label="Projects" icon={<Briefcase size={20} />} />
          <NavItem to="/settings" label="Settings" icon={<Settings size={20} />} />
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

function NavItem({ to, label, icon, ...props }: NavItemProps) {
  const isMobile = useIsMobile();

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 transition-all duration-200 relative overflow-hidden",
          isMobile ? "flex-col gap-1" : "flex-row gap-2",
          isActive
            ? "text-primary font-medium"
            : "text-muted-foreground hover:text-foreground hover:scale-105"
        )
      }
      {...props}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className={cn(
              "absolute backdrop-blur-md bg-primary/5 border border-primary/20 -z-10",
              isMobile 
                ? "inset-0 bottom-1 rounded-lg" 
                : "inset-0 left-1 right-1 rounded-lg"
            )} />
          )}
          <span className={cn(
            "absolute",
            isMobile 
              ? "bottom-0 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-t-full" 
              : "left-0 top-1/2 h-3/4 w-0.5 -translate-y-1/2 rounded-r-full",
            isActive ? "bg-primary shadow-glow" : "bg-transparent"
          )} />
          {icon}
          <span className={cn("text-sm", isMobile && "text-xs")}>{label}</span>
        </>
      )}
    </NavLink>
  );
}
