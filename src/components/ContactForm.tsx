import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { track } from "@/lib/track";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    track('lead_form_submit');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons dans les plus brefs délais.",
    });
    
    setIsSubmitting(false);
  };

  return (
    <section id="demande-ambulance" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Demander une Ambulance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Remplissez ce formulaire pour une demande non urgente ou contactez-nous 
            directement pour une urgence immédiate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Contact Cards */}
          <div className="space-y-6">
            <Card className="border-emergency/30 bg-emergency/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-emergency">
                  <Phone className="h-5 w-5 mr-2" />
                  Urgence Immédiate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pour toute urgence médicale, appelez immédiatement notre numéro d'urgence.
                </p>
                <Button variant="emergency" className="w-full" asChild>
                  <a href="tel:+212777722311" className="flex items-center justify-center" onClick={() => track('click_call')}>
                    <Phone className="h-4 w-4 mr-2" />
                    +212 7777 223 11
                  </a>
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Disponible 24h/24 - 7j/7
                </p>
              </CardContent>
            </Card>

            <Card className="border-success/30 bg-success/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-success">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Direct
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Contactez-nous via WhatsApp pour une réponse rapide.
                </p>
                <Button variant="success" className="w-full" asChild>
                  <a href="https://wa.me/212777722311" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center" onClick={() => track('click_whatsapp')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ouvrir WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Disponibilité</p>
                    <p className="text-muted-foreground">24 heures sur 24, 7 jours sur 7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Zone de couverture</p>
                    <p className="text-muted-foreground">Tout le Maroc</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Formulaire de Demande</CardTitle>
                <p className="text-muted-foreground">
                  Pour les demandes de transport programmé ou non urgent
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom complet *</label>
                      <Input placeholder="Votre nom complet" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Téléphone *</label>
                      <Input placeholder="+212 6XX XXX XXX" type="tel" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="votre.email@exemple.com" type="email" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type de service *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgence">Urgence médicale</SelectItem>
                          <SelectItem value="inter-hopitaux">Transport inter-hôpitaux</SelectItem>
                          <SelectItem value="longue-distance">Transport longue distance</SelectItem>
                          <SelectItem value="evenement">Événement/Rassemblement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ville *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une ville" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casablanca">Casablanca</SelectItem>
                          <SelectItem value="rabat">Rabat</SelectItem>
                          <SelectItem value="marrakech">Marrakech</SelectItem>
                          <SelectItem value="tanger">Tanger</SelectItem>
                          <SelectItem value="fes">Fès</SelectItem>
                          <SelectItem value="agadir">Agadir</SelectItem>
                          <SelectItem value="autres">Autre ville</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date et heure souhaitées</label>
                    <Input type="datetime-local" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Détails de la demande *</label>
                    <Textarea 
                      placeholder="Décrivez votre demande : destination, état du patient, équipements nécessaires..."
                      className="min-h-24"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="cta" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Envoyer la demande
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Champs obligatoires. Nous vous contacterons dans les plus brefs délais pour confirmer votre demande.
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    En envoyant ce formulaire, vous acceptez notre {" "}
                    <Link to="/politique-confidentialite" className="underline">politique de confidentialité</Link>.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;