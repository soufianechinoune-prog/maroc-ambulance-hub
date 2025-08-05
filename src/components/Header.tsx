import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

interface HeaderProps {
  city?: string;
}

const Header = ({ city = "Casablanca" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Ambulance Maroc" className="h-10 w-10 rounded-lg" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Ambulance Maroc</h1>
              <p className="text-xs text-muted-foreground">Service 24/7</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Nos Services
            </Link>
            <Link to="/zones" className="text-foreground hover:text-primary transition-colors font-medium">
              Zones d'intervention
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Emergency Contact */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Urgence 24/7</p>
              <a href="tel:+212522000000" className="text-lg font-bold text-emergency hover:text-emergency-hover">
                +212 522 000 000
              </a>
            </div>
            <Button variant="emergency" size="sm" asChild>
              <a href="tel:+212522000000" className="flex items-center">
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </Button>
            <Button variant="success" size="sm" asChild>
              <a href="https://wa.me/212522000000" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Accueil
              </Link>
              <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Nos Services
              </Link>
              <Link to="/zones" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Zones d'intervention
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Contact
              </Link>
              <div className="pt-3 border-t">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground">Urgence 24/7</p>
                  <div className="flex space-x-2">
                    <Button variant="emergency" size="sm" asChild className="flex-1">
                      <a href="tel:+212522000000" className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        +212 522 000 000
                      </a>
                    </Button>
                    <Button variant="success" size="sm" asChild>
                      <a href="https://wa.me/212522000000" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;