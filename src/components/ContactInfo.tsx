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
      
      <Card className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/10 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Accent decoratif */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emergency via-primary to-success"></div>
        
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-lg">
              <MapPin className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Contact Ambulance {city}
            </h3>
            <p className="text-muted-foreground mt-2">Service d'urgence médicale professionnel</p>
          </div>
          
          <div className="space-y-5">
            {/* Téléphone d'urgence */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emergency/15 via-emergency/10 to-emergency/5 border border-emergency/30 p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emergency/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-emergency" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">🚨</span>
                    <p className="text-sm font-medium text-emergency">Urgence 24/7</p>
                  </div>
                  <CallButton 
                    phone={contactData.telephone}
                    className="text-xl font-bold text-emergency hover:text-emergency-hover transition-colors duration-200 hover:underline"
                  >
                    +212 7777 223 11
                  </CallButton>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-success/15 via-success/10 to-success/5 border border-success/30 p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">💬</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-success mb-1">WhatsApp direct</p>
                  <WhatsAppButton 
                    phone={contactData.telephone}
                    className="text-lg font-bold text-success hover:text-success-hover transition-colors duration-200 hover:underline"
                  >
                    Message instantané
                  </WhatsAppButton>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-primary/20 p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary mb-1">Email</p>
                  <a 
                    href={`mailto:${contactData.email}`}
                    className="text-lg font-semibold text-primary hover:text-primary-hover transition-colors duration-200 hover:underline break-all"
                  >
                    {contactData.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Adresse */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-secondary/10 via-secondary/5 to-background border border-secondary/20 p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary mb-1">Adresse</p>
                  <p className="text-lg font-semibold text-foreground">
                    {contactData.address}, {city}
                  </p>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border border-primary/30 p-5 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">🕒</span>
                    <p className="text-sm font-medium text-primary">Disponibilité</p>
                  </div>
                  <p className="text-lg font-bold text-foreground">
                    {contactData.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA rapide */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-medium text-foreground">Intervention rapide garantie</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CallButton 
                phone={contactData.telephone}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emergency to-emergency-hover text-emergency-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl">📞</span>
                <span>Appeler maintenant</span>
              </CallButton>
              <WhatsAppButton 
                phone={contactData.telephone}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-success to-success-hover text-success-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl">💬</span>
                <span>WhatsApp</span>
              </WhatsAppButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactInfo;