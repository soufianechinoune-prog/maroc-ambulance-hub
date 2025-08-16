import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CallButton, WhatsAppButton } from "@/components/ContactCTA";

const ContactInfo = ({ 
  city = "Casablanca",
  withStructuredData = false 
}: { 
  city?: string;
  withStructuredData?: boolean;
}) => {
  const contactData = {
    telephone: "+212777722311",
    email: "contact@ambulance-maroc.ma",
    whatsapp: "https://wa.me/212777722311",
    address: `Centre médical ${city}`,
    hours: "24h/24 et 7j/7"
  };

  // Structured data for contact information
  const contactStructuredData = withStructuredData ? {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "telephone": contactData.telephone,
    "email": contactData.email,
    "contactType": "emergency services",
    "areaServed": `${city}, Maroc`,
    "availableLanguage": ["French", "Arabic"],
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "opens": "00:00",
      "closes": "23:59",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    }
  } : null;

  return (
    <>
      {withStructuredData && contactStructuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactStructuredData) }}
        />
      )}
      
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            📍 Contact Ambulance {city}
          </h3>
          
          <div className="space-y-4">
            {/* Téléphone d'urgence */}
            <div className="flex items-center space-x-3 p-3 bg-emergency/10 rounded-lg border border-emergency/20">
              <Phone className="h-5 w-5 text-emergency" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">🚨 Urgence 24/7</p>
                <CallButton 
                  phone={contactData.telephone}
                  className="text-lg font-bold text-emergency hover:text-emergency-hover"
                >
                  +212 7777 223 11
                </CallButton>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="h-5 w-5 text-success">💬</div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">WhatsApp direct</p>
                <WhatsAppButton 
                  phone={contactData.telephone}
                  className="text-lg font-bold text-success hover:text-success-hover"
                >
                  Message instantané
                </WhatsAppButton>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
              <Mail className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <a 
                  href={`mailto:${contactData.email}`}
                  className="text-lg font-semibold text-primary hover:text-primary-hover"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            {/* Adresse */}
            <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
              <MapPin className="h-5 w-5 text-secondary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Adresse</p>
                <p className="text-lg font-semibold text-foreground">
                  {contactData.address}, {city}
                </p>
              </div>
            </div>

            {/* Horaires */}
            <div className="flex items-center space-x-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <Clock className="h-5 w-5 text-accent" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Disponibilité</p>
                <p className="text-lg font-bold text-accent">
                  {contactData.hours}
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA rapide */}
          <div className="mt-6 pt-4 border-t">
            <p className="text-center text-sm text-muted-foreground mb-3">
              ⚡ Intervention rapide garantie
            </p>
            <div className="flex gap-2">
              <CallButton 
                phone={contactData.telephone}
                className="flex-1 bg-emergency text-emergency-foreground hover:bg-emergency-hover"
              >
                📞 Appeler maintenant
              </CallButton>
              <WhatsAppButton 
                phone={contactData.telephone}
                className="flex-1 bg-success text-success-foreground hover:bg-success-hover"
              >
                💬 WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactInfo;