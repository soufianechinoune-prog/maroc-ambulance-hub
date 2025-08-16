import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cities } from "@/data/cities";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

export default function SmartBreadcrumb() {
  const location = useLocation();
  const pathname = location.pathname;

  // Ne pas afficher sur la page d'accueil
  if (pathname === "/") return null;

  const segments: BreadcrumbSegment[] = [
    { label: "Accueil", href: "/" }
  ];

  // Pages de services
  if (pathname === "/services") {
    segments.push({ label: "Services ambulance" });
  } else if (pathname === "/zones-d-intervention") {
    segments.push({ label: "Zones d'intervention" });
  } else if (pathname === "/contact") {
    segments.push({ label: "Contact" });
  }
  
  // Blog
  else if (pathname.startsWith("/blog")) {
    segments.push({ label: "Blog", href: "/blog" });
    
    if (pathname === "/blog/casablanca") {
      segments.push({ label: "Articles Casablanca" });
    } else if (pathname === "/blog/rabat") {
      segments.push({ label: "Articles Rabat" });
    } else if (pathname === "/blog/marrakech") {
      segments.push({ label: "Articles Marrakech" });
    } else if (pathname === "/blog/fes") {
      segments.push({ label: "Articles Fès" });
    } else if (pathname === "/blog/tanger") {
      segments.push({ label: "Articles Tanger" });
    } else if (pathname === "/blog/agadir") {
      segments.push({ label: "Articles Agadir" });
    } else if (pathname === "/blog/meknes") {
      segments.push({ label: "Articles Meknès" });
    } else if (pathname === "/blog/kenitra") {
      segments.push({ label: "Articles Kénitra" });
    } else if (pathname === "/blog/sale") {
      segments.push({ label: "Articles Salé" });
    } else if (pathname === "/blog/oujda") {
      segments.push({ label: "Articles Oujda" });
    }
    
    // Article spécifique
    if (pathname.includes("/blog/") && pathname.split("/").length > 3) {
      const parts = pathname.split("/");
      const citySlug = parts[2];
      const articleSlug = parts[3];
      
      const city = cities.find(c => c.slug === citySlug);
      if (city) {
        segments.push({ label: `Articles ${city.name}`, href: `/blog/${citySlug}` });
        
        // Titre simplifié de l'article basé sur le slug
        const articleTitle = articleSlug
          .replace(/-/g, " ")
          .replace(/ambulance/g, "")
          .replace(/privee/g, "privée")
          .replace(/casablanca|rabat|marrakech|fes|tanger/g, "")
          .trim()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        
        segments.push({ label: articleTitle });
      }
    }
  }
  
  // Pages légales
  else if (pathname === "/mentions-legales") {
    segments.push({ label: "Mentions légales" });
  } else if (pathname === "/politique-confidentialite") {
    segments.push({ label: "Politique de confidentialité" });
  } else if (pathname === "/conditions-generales-utilisation") {
    segments.push({ label: "Conditions générales" });
  }
  
  // Pages de villes
  else if (pathname.startsWith("/ambulance-")) {
    const pathParts = pathname.split("-");
    
    // Quartier spécifique (ex: /ambulance-casablanca-ain-diab)
    if (pathParts.length >= 3) {
      const citySlug = pathParts[1];
      const neighborhoodSlug = pathParts.slice(2).join("-");
      
      const city = cities.find(c => c.slug === citySlug);
      if (city) {
        segments.push({ 
          label: `Ambulance ${city.name}`, 
          href: `/ambulance-${citySlug}` 
        });
        
        // Nom du quartier formaté
        const neighborhoodName = neighborhoodSlug
          .split("-")
          .map(word => {
            // Cas spéciaux
            if (word === "el") return "El";
            if (word === "ibn") return "Ibn";
            if (word === "sidi") return "Sidi";
            if (word === "hay") return "Hay";
            if (word === "ain") return "Aïn";
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
        
        segments.push({ label: `Quartier ${neighborhoodName}` });
      }
    } 
    // Ville principale (ex: /ambulance-casablanca)
    else {
      const citySlug = pathParts[1];
      const city = cities.find(c => c.slug === citySlug);
      if (city) {
        segments.push({ label: `Ambulance ${city.name}` });
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => (
            <BreadcrumbItem key={index}>
              {index === segments.length - 1 ? (
                <BreadcrumbPage>{segment.label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={segment.href || "#"}>{segment.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}