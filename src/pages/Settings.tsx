import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toogle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/store/auth";
import { AuthAPI } from "@/lib/api";
import { Settings as SettingsIcon, Edit, User, Mail, MapPin, LogOut, Loader2 } from "lucide-react";

export function Settings() {
  const isMobile = useIsMobile();
  const { user, setUser, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setIsLoading(true);
        setError('');
        
        try {
          const userProfile = await AuthAPI.getUserProfile();
          setUser(userProfile);
        } catch (err) {
          setError('Failed to load user profile');
          console.error('Error fetching user profile:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [user, setUser]);

  const handleLogout = async () => {
    try {
      await AuthAPI.logout();
      logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading profile...</span>
          </div>
        </div>
      </div>
    );
  }

  // if (error && !user) {
  //   return (
  //     <div className="container mx-auto p-4 max-w-4xl">
  //       <Card className="w-full">
  //         <CardContent className="flex items-center justify-center min-h-[200px]">
  //           <div className="text-center space-y-2">
  //             <p className="text-destructive">{error}</p>
  //             <Button onClick={() => window.location.reload()} variant="outline">
  //               Retry
  //             </Button>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Header with Settings title and theme toggle on desktop */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && <ModeToggle />}
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        {(!user || error) && (
        <Card className="w-full">
          <CardContent className="flex items-center justify-center min-h-[200px]">
            <div className="text-center space-y-2">
              <p className="text-destructive">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
        )}
        {user && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.username}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your application experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Theme Mode</div>
                <div className="text-xs text-muted-foreground">
                  Choose your preferred color scheme
                </div>
              </div>
              {isMobile ? <ModeToggle /> : <span className="text-sm text-muted-foreground">Controlled via header button</span>}
            </div>
            
            <div className="pt-4 border-t">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Edit Profile</div>
                <div className="text-xs text-muted-foreground mb-2">
                  Update your personal information and preferences
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Manage Profile
                </Button>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Additional settings and preferences can be added here as your application grows.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
