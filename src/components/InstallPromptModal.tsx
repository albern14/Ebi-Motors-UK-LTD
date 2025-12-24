import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Bell, Share, Plus, X } from "lucide-react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useToast } from "@/hooks/use-toast";

interface InstallPromptModalProps {
  userEmail?: string;
}

export const InstallPromptModal = ({ userEmail }: InstallPromptModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"install" | "notify">("install");
  const [dismissed, setDismissed] = useState(false);
  const { canInstall, isInstalled, isIOS, promptInstall } = useInstallPrompt();
  const { isSupported, permission, subscribe } = usePushNotifications();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already dismissed in this session
    const wasDismissed = sessionStorage.getItem("installPromptDismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Show modal after a short delay if can install or need notification permission
    const timer = setTimeout(() => {
      if (canInstall || (isSupported && permission === "default")) {
        setIsOpen(true);
        setStep(canInstall ? "install" : "notify");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [canInstall, isSupported, permission]);

  const handleInstall = async () => {
    if (isIOS) {
      // Show iOS instructions
      toast({
        title: "Install on iPhone/iPad",
        description: "Tap the Share button, then tap 'Add to Home Screen'",
      });
      handleNext();
    } else {
      const installed = await promptInstall();
      if (installed) {
        toast({
          title: "App Installed!",
          description: "You can now access Ebi Motors from your home screen.",
        });
      }
      handleNext();
    }
  };

  const handleEnableNotifications = async () => {
    if (!userEmail) {
      toast({
        title: "Email Required",
        description: "Please book an MOT first to receive notifications.",
        variant: "destructive",
      });
      setIsOpen(false);
      return;
    }

    const subscribed = await subscribe(userEmail);
    if (subscribed) {
      toast({
        title: "Notifications Enabled!",
        description: "You'll receive updates about your MOT bookings.",
      });
    } else {
      toast({
        title: "Notifications Blocked",
        description: "You can enable them later in your browser settings.",
        variant: "destructive",
      });
    }
    setIsOpen(false);
  };

  const handleNext = () => {
    if (step === "install" && isSupported && permission === "default") {
      setStep("notify");
    } else {
      setIsOpen(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("installPromptDismissed", "true");
    setIsOpen(false);
  };

  if (dismissed || (!canInstall && !(isSupported && permission === "default"))) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
        
        {step === "install" ? (
          <>
            <DialogHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <DialogTitle className="text-center text-2xl">
                Install Ebi Motors App
              </DialogTitle>
              <DialogDescription className="text-center">
                Get quick access to book your MOT and receive instant notifications about your appointments.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {isIOS ? (
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="text-sm font-medium">To install on iOS:</p>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-xs">1</span>
                      Tap the <Share className="inline h-4 w-4" /> Share button
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center text-xs">2</span>
                      Scroll down and tap <Plus className="inline h-4 w-4" /> Add to Home Screen
                    </li>
                  </ol>
                </div>
              ) : null}
              
              <Button onClick={handleInstall} className="w-full" size="lg">
                <Download className="mr-2 h-5 w-5" />
                {isIOS ? "I Understand" : "Install App"}
              </Button>
              
              <Button variant="ghost" onClick={handleNext} className="w-full">
                Skip for now
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Bell className="h-8 w-8 text-primary" />
              </div>
              <DialogTitle className="text-center text-2xl">
                Enable Notifications
              </DialogTitle>
              <DialogDescription className="text-center">
                Stay updated! Get instant notifications when your MOT time slot is confirmed.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <Button onClick={handleEnableNotifications} className="w-full" size="lg">
                <Bell className="mr-2 h-5 w-5" />
                Enable Notifications
              </Button>
              
              <Button variant="ghost" onClick={handleDismiss} className="w-full">
                Maybe later
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
