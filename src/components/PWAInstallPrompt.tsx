import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInStandaloneMode = 'standalone' in window.navigator && 
      (window.navigator as { standalone?: boolean }).standalone;
    
    if (isStandalone || isInStandaloneMode) {
      setShowInstallPrompt(false);
    } else if (isIOSDevice && !localStorage.getItem('ios-install-dismissed')) {
      // Show iOS install instructions after a delay
      setTimeout(() => setShowInstallPrompt(true), 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    if (isIOS) {
      localStorage.setItem('ios-install-dismissed', 'true');
    }
  };

  if (!showInstallPrompt) return null;

  return (
    <Card className="fixed left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 shadow-2xl border-primary/20" style={{ bottom: 'max(env(safe-area-inset-bottom) + 52px, 58px)' }}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Smartphone className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm">Install CSS Portal</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {isIOS 
                ? 'Tap the share button and "Add to Home Screen" for quick access'
                : 'Install our app for faster access and better experience'
              }
            </p>
            <div className="flex space-x-2 mt-3">
              {!isIOS && (
                <Button 
                  size="sm" 
                  onClick={handleInstallClick}
                  className="text-xs h-8"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Install
                </Button>
              )}
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleDismiss}
                className="text-xs h-8"
              >
                Maybe later
              </Button>
            </div>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="p-1 h-6 w-6 flex-shrink-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PWAInstallPrompt;
