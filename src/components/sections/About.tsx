import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Award, MapPin } from "lucide-react";
import customerService from "@/assets/ebi-garage-exterior.jpg";

export const About = () => {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "100%", label: "DVSA Approved" },
    { number: "4.9★", label: "Customer Rating" }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollAnimation direction="left">
            <div>
              <Badge variant="secondary" className="mb-4 text-primary font-semibold">
                About Ebi Motors
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.1]">
                Manchester's Trusted
                <span className="block text-primary mt-2">MOT Specialists</span>
              </h2>
              
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                Located in the heart of Manchester, Ebi Motors UK Limited has been providing 
                professional MOT testing and automotive services to the local community. 
                Our state-of-the-art facility and experienced technicians ensure your vehicle 
                meets all safety standards.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-medium">
                    DVSA Approved Testing Station
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-medium">
                    Experienced Certified Technicians
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-medium">
                    Commitment to Excellence
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-medium">
                    Central Manchester Location
                  </span>
                </div>
              </div>
              
              <Button variant="cta" size="lg" onClick={scrollToContact}>
                Learn More About Us
              </Button>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <div className="relative">
              <img 
                src={customerService} 
                alt="Customer Service at Ebi Motors"
                className="rounded-2xl shadow-strong w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-primary/5 rounded-2xl"></div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-8 -left-8 right-8">
                <div className="bg-white rounded-2xl shadow-strong p-8 border border-border">
                  <div className="grid grid-cols-2 gap-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-extrabold text-primary mb-2">
                          {stat.number}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};
