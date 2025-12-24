import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Car, Calendar, FileText, Shield, Wrench } from "lucide-react";
import motService from "@/assets/ebi-garage-interior.jpg";

export const Services = () => {
  const services = [
    {
      icon: Car,
      title: "MOT Testing",
      description: "Comprehensive MOT testing for all vehicle types",
      features: ["Class 4 vehicles", "Thorough inspection", "Same-day results", "Competitive prices"]
    },
    {
      icon: Calendar,
      title: "MOT Reminders",
      description: "Never miss your MOT renewal date again",
      features: ["SMS notifications", "Email reminders", "Advance booking", "Customer database"]
    },
    {
      icon: Wrench,
      title: "Vehicle Repairs",
      description: "Professional repair services to get you back on the road",
      features: ["Pre-MOT repairs", "General maintenance", "Parts replacement", "Expert diagnosis"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimation direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Book Your MOT Today
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional automotive services you can trust, with customer care that goes the extra mile
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollAnimation direction="left">
            <div className="relative">
              <img 
                src={motService} 
                alt="MOT Service"
                className="rounded-2xl shadow-strong w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-2xl"></div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="right">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Why Choose Ebi Motors?
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  "DVSA approved testing station",
                  "Experienced certified technicians",
                  "Customer MOT reminder system",
                  "Competitive and transparent pricing",
                  "Same-day service available",
                  "Professional customer care"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <Button variant="cta" size="lg">
                Book Your MOT Today
              </Button>
            </div>
          </ScrollAnimation>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollAnimation key={index} direction="up" delay={index * 150}>
              <Card className="h-full shadow-soft hover:shadow-strong transition-all duration-300 hover:scale-105 border-primary/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};