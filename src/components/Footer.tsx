import { Phone, MessageCircle, MapPin, Clock, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const cities = [
    { name: "Casablanca", slug: "casablanca" },
    { name: "Rabat", slug: "rabat" },
    { name: "Marrakech", slug: "marrakech" },
    { name: "Tanger", slug: "tanger" },
    { name: "Fès", slug: "fes" },
    { name: "Agadir", slug: "agadir" }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Emergency Contact Bar */}
        <div className="bg-emergency py-4 -mx-4 mb-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">Urgence 24/7 :</span>
                <a href="tel:+212777722311" className="text-lg font-bold hover:underline">
                  +212 7777 223 11
                </a>
              </div>
              <div className="flex space-x-3">
                <Button variant="secondary" size="sm" asChild>
                  <a href="tel:+212777722311">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler
                  </a>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <Link to="/" className="flex items-center space-x-3">
                  <img src={logo} alt="Ambulance Maroc" className="h-10 w-10 rounded-lg" />
                  <div>
                    <h3 className="text-lg font-bold">Ambulance Maroc</h3>
                    <p className="text-sm text-background/70">Service 24/7</p>
                  </div>
                </Link>
                <p className="text-background/80 text-sm leading-relaxed">
                  Service d'ambulance professionnel disponible 24h/24 et 7j/7 
                  partout au Maroc. Intervention rapide et équipe qualifiée.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span>Agréé Ministère de la Santé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-success" />
                    <span>+ de 5000 interventions/an</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Nos Services</h4>
                <ul className="space-y-2 text-sm text-background/80">
                  <li>
                    <Link to="/services#urgence" className="hover:text-success transition-colors">
                      Ambulance d'urgence
                    </Link>
                  </li>
                  <li>
                    <Link to="/services#inter-hopitaux" className="hover:text-success transition-colors">
                      Transport inter-hôpitaux
                    </Link>
                  </li>
                  <li>
                    <Link to="/services#longue-distance" className="hover:text-success transition-colors">
                      Transport longue distance
                    </Link>
                  </li>
                  <li>
                    <Link to="/services#evenements" className="hover:text-success transition-colors">
                      Couverture événements
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Cities */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Villes Couvertes</h4>
                <ul className="space-y-2 text-sm text-background/80">
                  {cities.map((city) => (
                    <li key={city.slug}>
                      <Link 
                        to={`/${city.slug}`} 
                        className="hover:text-success transition-colors"
                      >
                        Ambulance {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/zones" 
                  className="text-success hover:underline text-sm font-medium"
                >
                  Voir toutes les villes →
                </Link>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Contact</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Phone className="h-4 w-4 mt-0.5 text-emergency flex-shrink-0" />
                    <div>
                      <p className="font-medium">Urgence 24/7</p>
                      <a href="tel:+212777722311" className="text-background/80 hover:text-success">
                        +212 7777 223 11
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contact@ambulance-maroc.ma" className="text-background/80 hover:text-success">
                        contact@ambulance-maroc.ma
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-success flex-shrink-0" />
                    <div>
                      <p className="font-medium">Siège social</p>
                      <p className="text-background/80">
                        Casablanca, Maroc
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/70">
            <p>
              © {currentYear} Ambulance Maroc. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <Link to="/mentions-legales" className="hover:text-success transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-success transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/conditions-generales-utilisation" className="hover:text-success transition-colors">
                Conditions générales d’utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;