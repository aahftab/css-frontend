import { usePWA } from '@/hooks/use-pwa';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wifi, WifiOff, RefreshCw, Check } from 'lucide-react';

const PWAStatus = () => {
  const { needRefresh, offlineReady, isOnline, refresh } = usePWA();

  if (!needRefresh && !offlineReady && isOnline) return null;

  return (
    <Card className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40 shadow-lg border-primary/20">
      <CardContent className="p-3">
        {needRefresh && (
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-4 w-4 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">Update available</p>
              <p className="text-xs text-muted-foreground">A new version is ready</p>
            </div>
            <Button size="sm" onClick={refresh} className="text-xs">
              Update
            </Button>
          </div>
        )}
        
        {offlineReady && !needRefresh && (
          <div className="flex items-center space-x-3">
            <Check className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Ready to work offline</p>
              <p className="text-xs text-muted-foreground">App cached for offline use</p>
            </div>
          </div>
        )}
        
        {!isOnline && (
          <div className="flex items-center space-x-3">
            <WifiOff className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-sm font-medium">You're offline</p>
              <p className="text-xs text-muted-foreground">Some features may be limited</p>
            </div>
          </div>
        )}
        
        {isOnline && (offlineReady || needRefresh) && (
          <div className="flex items-center space-x-3">
            <Wifi className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-600">Online</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PWAStatus;
