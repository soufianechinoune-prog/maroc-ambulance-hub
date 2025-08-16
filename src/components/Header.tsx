import { Phone, MessageCircle, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cities } from "@/data/cities";
import { neighborhoodsByCity } from "@/data/neighborhoods";
import logo from "@/assets/logo.jpg";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";

interface HeaderProps {
  city?: string;
}

const Header = ({ city = "Casablanca" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const navigate = useNavigate();
  const path = location.pathname;
  let currentCitySlug: string | null = null;
  if (path.startsWith('/ambulance-')) {
    const rest = path.replace('/ambulance-', '');
    const cityCandidate = rest.split('-')[0];
    if (cities.some((c) => c.slug === cityCandidate)) {
      currentCitySlug = cityCandidate;
    }
  }
  const isCityPage = !!currentCitySlug;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNavigate = (href: string) => (e: any) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/63bee4de-b62b-41e3-82a0-f4e71697ea78.png" 
              alt="Logo Ambulance Privée Maroc - Transport médicalisé professionnel" 
              className="h-10 w-10 rounded-lg" 
              loading="lazy"
              width="40"
              height="40"
            />
            {isHomepage ? (
              <div className="flex flex-col" aria-label="Ambulance Privée Maroc – Accueil">
                <span className="text-lg font-bold text-foreground">Ambulance Privée Maroc</span>
                <span className="text-xs text-muted-foreground">Service 24/7</span>
              </div>
            ) : (
              <div>
                <div className="text-lg font-bold text-foreground">Ambulance Privée Maroc</div>
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
        <ul className="flex gap-4 text-sm text-foreground/80 justify-start whitespace-nowrap items-center">
          <li>
            <a
              href="/"
              className="hover:text-primary transition-colors"
              onClick={handleNavigate('/')}>

              ← Retour aux villes
            </a>
          </li>
          {neighborhoodsByCity[currentCitySlug as keyof typeof neighborhoodsByCity].map((n) => {
            const href = `/ambulance-${currentCitySlug}-${n.slug}`;
            return (
              <li key={n.slug}>
                <a
                  href={href}
                  className="hover:text-primary transition-colors"
                  aria-label={`Ambulance ${currentCitySlug} ${n.label}`}
                  onClick={handleNavigate(href)}
                >
                  {n.label}
                </a>
              </li>
            );
          })}
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
              <CallButton phone="+212777722311" className="text-lg font-bold text-emergency hover:text-emergency-hover">
                +212 7777 223 11
              </CallButton>
            </div>
            <Button variant="emergency" size="sm" asChild>
              <CallButton phone="+212777722311" className="flex items-center">
                <Phone className="h-4 w-4" />
                Appeler
              </CallButton>
            </Button>
            <Button variant="success" size="sm" asChild>
              <WhatsAppButton phone="+212777722311" className="flex items-center">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </WhatsAppButton>
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
                      <CallButton phone="+212777722311" className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        +212 7777 223 11
                      </CallButton>
                    </Button>
                    <Button variant="success" size="sm" asChild>
                      <WhatsAppButton phone="+212777722311" className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">WhatsApp</span>
                      </WhatsAppButton>
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