import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Phone, MapPin, Clock } from "lucide-react";
import ebiLogo from "@/assets/ebi-logo.png";
import heroGarage from "@/assets/ebi-garage-front.jpg";

export const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroGarage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <ScrollAnimation direction="up">
          <img 
            src={ebiLogo} 
            alt="Ebi Motors Logo" 
            className="mx-auto mb-8 h-24 w-auto"
          />
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={200}>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Professional
            <span className="block text-primary-light mt-2">MOT Testing</span>
          </h1>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={400}>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-white/90 font-medium">
            Expert automotive care in Manchester with customer MOT reminders. 
            Trust your vehicle to our certified technicians.
          </p>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              variant="hero" 
              className="text-base px-10 py-6 h-auto"
              asChild
            >
              <a href="tel:07894458796">
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +44 7894 458796
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="cta" 
              className="text-base px-10 py-6 h-auto"
              onClick={scrollToContact}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Learn More About Us
            </Button>
          </div>
        </ScrollAnimation>
        
        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
          <ScrollAnimation direction="up" delay={800}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-strong border border-white/20 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300">
              <Clock className="h-10 w-10 text-primary-light mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Fast Service</h3>
              <p className="text-white/85 text-sm">Quick and efficient MOT testing</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={1000}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-strong border border-white/20 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300">
              <MapPin className="h-10 w-10 text-primary-light mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Central Location</h3>
              <p className="text-white/85 text-sm">Unit C, 229 Ayres Road, Manchester</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={1200}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-strong border border-white/20 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300">
              <Phone className="h-10 w-10 text-primary-light mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">MOT Reminders</h3>
              <p className="text-white/85 text-sm">Never miss your next MOT date</p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
