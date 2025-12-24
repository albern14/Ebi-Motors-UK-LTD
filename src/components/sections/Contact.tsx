import { useState } from "react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, MapPin, Clock, Mail, Car, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContactProps {
  onEmailSubmit?: (email: string) => void;
}

export const Contact = ({ onEmailSubmit }: ContactProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBookMOT = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-mot-booking", {
        body: { customerEmail: email, customerName: name || undefined },
      });

      if (error) throw error;

      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you shortly to confirm your MOT appointment.",
      });

      onEmailSubmit?.(email);
      setEmail("");
      setName("");
      setIsOpen(false);
    } catch (error: any) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: "Failed to send booking request. Please try calling us instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+44 7894 458796",
      description: "Mon-Fri: 8AM-6PM, Sat: 8AM-4PM"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Unit C, 229 Ayres Road",
      description: "Manchester, M16 0WZ"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      content: "Monday - Saturday",
      description: "Book your MOT in advance"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@ebimotors.co.uk",
      description: "We'll get back to you within 24 hours"
    }
  ];

  const googleMapsUrl = "https://google.com/maps?sca_esv=53f91fdfe4187e30&rlz=1C1VDKB_enGB1126GB1127&output=search&q=Ebi+Motors&source=lnms&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZjSkgYzz5-5RrRWAIniWd7tzPwkE1KJWcRvaH01D-XIUAvg3n_tnU4u8lZtcCOD0ElNEgYLABq5AJNtEpcRNeWCN8Edzb7TNFl45cVKWapq11NYwWTMMMspLQm7tcrbaxP7_5qYBm8N_xcJki8mH9KBmUSS-InYWVDCWS2a7XOZ5_rKgs9P0dcYJPXJ0h_N4714UuXw&entry=mc&ved=1t:200715&ictx=111";

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to book your MOT or have questions? Contact us today and experience 
              professional automotive care in Manchester.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <ScrollAnimation key={index} direction="up" delay={index * 150}>
              <Card className="text-center h-full shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 border-primary/20">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <info.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-foreground mb-2">
                    {info.content}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation direction="up">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-strong border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Ready to Book Your MOT?
                </CardTitle>
                <p className="text-muted-foreground">
                  Call us now or book online for immediate assistance
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" className="text-lg px-8 py-4" asChild>
                    <a href="tel:07894458796">
                      <Phone className="mr-2 h-5 w-5" />
                      Call: +44 7894 458796
                    </a>
                  </Button>
                  <Button 
                    variant="cta" 
                    size="lg" 
                    className="text-lg px-8 py-4"
                    asChild
                  >
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-5 w-5" />
                      Get Directions
                    </a>
                  </Button>
                </div>

                <div className="mt-6 flex justify-center">
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default" size="lg" className="text-lg px-8 py-4">
                        <Car className="mr-2 h-5 w-5" />
                        Book Your MOT
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">
                          Book Your MOT
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleBookMOT} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name (optional)</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Your Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          We'll send you a confirmation and contact you to arrange a suitable time slot.
                        </p>
                        <Button 
                          type="submit" 
                          className="w-full" 
                          size="lg"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Mail className="mr-2 h-5 w-5" />
                              Submit Booking Request
                            </>
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3 text-center">
                    📍 Find Us Here
                  </h3>
                  <div className="text-center space-y-1">
                    <p className="text-foreground font-medium">Ebi Motors UK Limited</p>
                    <p className="text-muted-foreground">Unit C, 229 Ayres Road</p>
                    <p className="text-muted-foreground">Manchester, M16 0WZ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
