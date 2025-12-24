import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Settings, LogIn, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AdminLoginButton = () => {
  const { user, isAdmin, isLoading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleClick = async () => {
    if (isAdmin) {
      navigate("/admin");
    } else if (!user) {
      setIsSigningIn(true);
      try {
        await signInWithGoogle();
      } catch (err) {
        toast({
          title: "Sign In Failed",
          description: "Could not sign in with Google. Please try again.",
          variant: "destructive",
        });
        setIsSigningIn(false);
      }
    }
  };

  if (isLoading || isSigningIn) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full shadow-lg z-50"
        disabled
      >
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  // Only show for admin or when not logged in
  if (!isAdmin && user) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 rounded-full shadow-lg z-50 bg-card hover:bg-primary hover:text-primary-foreground transition-all"
      onClick={handleClick}
      title={isAdmin ? "Admin Panel" : "Admin Login"}
    >
      {isAdmin ? <Settings className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
    </Button>
  );
};
