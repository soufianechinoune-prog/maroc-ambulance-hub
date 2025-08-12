import { Phone, MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cities } from "@/data/cities";
import { neighborhoodsByCity } from "@/data/neighborhoods";
import logo from "@/assets/logo.jpg";

interface HeaderProps {
  city?: string;
}

const Header = ({ city = "Casablanca" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const path = location.pathname;
  const matchCityPage = path.match(/^\/ambulance-([a-z-]+)$/);
  const currentCitySlug = matchCityPage?.[1] && cities.some(c => c.slug === matchCityPage[1]) ? matchCityPage[1] : null;
  const isCityPage = !!currentCitySlug;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Ambulance Maroc – Accueil" className="h-10 w-10 rounded-lg" loading="lazy" />
            {isHomepage ? (
              <h1 className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Ambulance Maroc</span>
                <span className="text-xs text-muted-foreground">Service 24/7</span>
              </h1>
            ) : (
              <div>
                <div className="text-lg font-bold text-foreground">Ambulance Maroc</div>
                <p className="text-xs text-muted-foreground">Service 24/7</p>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Menu principal">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Nos Services
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-colors font-medium">
                Zones d'intervention
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/zones-d-intervention" className="w-full">
                    Toutes les zones
                  </Link>
                </DropdownMenuItem>
                {cities.map((city) => (
                  <DropdownMenuItem key={city.slug} asChild>
                    <Link to={`/ambulance-${city.slug}`} className="w-full">
                      Ambulance {city.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

{/* Maillage interne - Vitrine contextuelle */}
<div className="hidden xl:block absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border/50">
  <div className="container mx-auto px-4 py-2">
    {isCityPage && neighborhoodsByCity[currentCitySlug as keyof typeof neighborhoodsByCity]?.length ? (
      <div className="overflow-x-auto">
        <ul className="flex gap-4 text-sm text-foreground/80 justify-start whitespace-nowrap">
          {neighborhoodsByCity[currentCitySlug as keyof typeof neighborhoodsByCity].map((n) => (
            <li key={n.slug}>
              <Link to={`/ambulance-${currentCitySlug}-${n.slug}`} className="hover:text-primary transition-colors">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <ul className="flex gap-4 text-sm text-foreground/80 justify-center">
        <li><Link to="/ambulance-casablanca" className="hover:text-primary transition-colors">Casablanca</Link></li>
        <li><Link to="/ambulance-rabat" className="hover:text-primary transition-colors">Rabat</Link></li>
        <li><Link to="/ambulance-marrakech" className="hover:text-primary transition-colors">Marrakech</Link></li>
        <li><Link to="/ambulance-fes" className="hover:text-primary transition-colors">Fès</Link></li>
        <li><Link to="/ambulance-tanger" className="hover:text-primary transition-colors">Tanger</Link></li>
        <li><Link to="/ambulance-agadir" className="hover:text-primary transition-colors">Agadir</Link></li>
        <li><Link to="/ambulance-meknes" className="hover:text-primary transition-colors">Meknès</Link></li>
        <li><Link to="/ambulance-oujda" className="hover:text-primary transition-colors">Oujda</Link></li>
      </ul>
    )}
  </div>
</div>

          {/* Emergency Contact */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Urgence 24/7</p>
              <a href="tel:+212777722311" className="text-lg font-bold text-emergency hover:text-emergency-hover">
                +212 7777 223 11
              </a>
            </div>
            <Button variant="emergency" size="sm" asChild>
              <a href="tel:+212777722311" className="flex items-center">
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </Button>
            <Button variant="success" size="sm" asChild>
              <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" className="flex items-center">
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
            <nav className="flex flex-col space-y-3" aria-label="Menu mobile">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Accueil
              </Link>
              <Link to="/services" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Nos Services
              </Link>
              <Link to="/zones-d-intervention" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Zones d'intervention
              </Link>
              <Link to="/blog" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Blog
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Contact
              </Link>
              <div className="pt-3 border-t">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground">Urgence 24/7</p>
                  <div className="flex space-x-2">
                    <Button variant="emergency" size="sm" asChild className="flex-1">
                      <a href="tel:+212777722311" className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        +212 7777 223 11
                      </a>
                    </Button>
                    <Button variant="success" size="sm" asChild>
                      <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">WhatsApp</span>
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