import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface AuthorityLinksProps {
  variant?: 'medical' | 'transport' | 'emergency';
  context?: string;
}

const AuthorityLinks = ({ variant = 'medical', context }: AuthorityLinksProps) => {
  
  const getMedicalLinks = () => [
    {
      title: "Ministère de la Santé du Maroc",
      url: "https://www.sante.gov.ma",
      description: "Autorité nationale de santé publique et réglementation sanitaire"
    },
    {
      title: "CHU Ibn Sina Rabat", 
      url: "https://churabat.ma",
      description: "Centre hospitalier universitaire de référence nationale"
    },
    {
      title: "CHU Ibn Rochd Casablanca",
      url: "https://chuibnrochd.ma", 
      description: "Premier centre hospitalier du Grand Casablanca"
    },
    {
      title: "Ordre National des Médecins",
      url: "https://cnom.ma",
      description: "Instance ordinale des professions médicales au Maroc"
    }
  ];

  const getTransportLinks = () => [
    {
      title: "Code de la Route Marocain",
      url: "https://www.mtpnet.gov.ma",
      description: "Réglementation transport sanitaire et véhicules prioritaires"
    },
    {
      title: "Agence Nationale de la Sécurité Routière",
      url: "https://www.narsa.gov.ma",
      description: "Sécurité et réglementation des transports sanitaires"
    },
    {
      title: "Ministère de l'Équipement et du Transport",
      url: "https://www.equipement.gov.ma",
      description: "Autorisation et homologation véhicules sanitaires"
    }
  ];

  const getEmergencyLinks = () => [
    {
      title: "Protection Civile du Maroc",
      url: "https://www.protectioncivile.gov.ma", 
      description: "Coordination nationale des secours et interventions d'urgence"
    },
    {
      title: "Croissant Rouge Marocain",
      url: "https://www.croissantrouge.ma",
      description: "Organisation humanitaire et secours d'urgence"
    },
    {
      title: "SAMU Maroc",
      url: "https://www.sante.gov.ma/samu",
      description: "Service d'Aide Médicale Urgente national"
    }
  ];

  const getLinks = () => {
    switch(variant) {
      case 'transport': return getTransportLinks();
      case 'emergency': return getEmergencyLinks(); 
      default: return getMedicalLinks();
    }
  };

  const links = getLinks();

  const getTitle = () => {
    switch(variant) {
      case 'transport': return "Réglementation Transport Sanitaire";
      case 'emergency': return "Autorités des Secours d'Urgence"; 
      default: return "Références Médicales Officielles";
    }
  };

  return (
    <section className="py-8 bg-muted/20 border rounded-lg" aria-label="Liens officiels">
      <div className="px-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <ExternalLink className="h-5 w-5 mr-2 text-primary" />
          {getTitle()}
        </h3>
        
        {context && (
          <p className="text-muted-foreground text-sm mb-6">
            {context}
          </p>
        )}
        
        <ul className="space-y-4">
          {links.map((link, index) => (
            <li key={index} className="border-l-3 border-primary/30 pl-4">
              <a 
                href={link.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline flex items-start group"
              >
                {link.title}
                <ExternalLink className="h-4 w-4 ml-1 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                {link.description}
              </p>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 p-4 bg-background/50 rounded border-l-4 border-primary/50">
          <p className="text-xs text-muted-foreground">
            ℹ️ Ces liens externes pointent vers des autorités officielles marocaines. 
            Ils s'ouvrent dans une nouvelle fenêtre pour votre commodité.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthorityLinks;