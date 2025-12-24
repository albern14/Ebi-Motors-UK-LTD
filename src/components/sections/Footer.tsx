import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Phone, MapPin, Clock } from "lucide-react";
import ebiLogo from "@/assets/ebi-logo.png";

export const Footer = () => {
  return (
  <footer className="hero-gradient text-white py-16">
      <div className="container mx-auto px-6 md:px-8">
        <ScrollAnimation direction="up">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <img 
                src={ebiLogo} 
                alt="Ebi Motors Logo" 
                className="h-16 w-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-4 text-primary-light">Ebi Motors UK Limited</h3>
              <p className="text-white/80 leading-relaxed">
                Professional MOT testing and automotive services in Manchester. 
                Your trusted partner for vehicle safety and compliance.
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary-light">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-light" />
                  <span>+44 7894 458796</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary-light" />
                  <span>Unit C, 229 Ayres Road, Manchester M16 0WZ</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary-light" />
                  <span>Mon-Fri: 8AM-6PM, Sat: 8AM-4PM</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary-light">Our Services</h3>
              <ul className="space-y-2 text-white/80">
                <li>• MOT Testing (Class 4)</li>
                <li>• MOT Reminders</li>
                <li>• Vehicle Repairs</li>
                <li>• Pre-MOT Inspections</li>
                <li>• General Maintenance</li>
                <li>• Parts Replacement</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60">
              © 2024 Ebi Motors UK Limited. All rights reserved. | 
              DVSA Approved Testing Station | 
              Professional Automotive Services in Manchester
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  );
};