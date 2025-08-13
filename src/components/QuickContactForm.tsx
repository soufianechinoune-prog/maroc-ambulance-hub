import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    need: "",
    phone: ""
  });
  const { toast } = useToast();

  const cities = [
    "Casablanca", "Rabat", "Marrakech", "Tanger", "Fès", "Agadir", 
    "Meknès", "Oujda", "Kenitra", "Sale", "Mohammedia", "Tétouan", "Autre"
  ];

  const needs = [
    "Urgence médicale",
    "Transport médicalisé",
    "Transfert inter-hôpitaux",
    "Transport programmé",
    "Autre besoin"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.city || !formData.phone) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Demande envoyée",
      description: "Nous vous rappelons sous 5 minutes",
    });

    // Reset form
    setFormData({ name: "", city: "", need: "", phone: "" });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10" aria-label="Formulaire de contact rapide">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground mb-2">
              Demande d'Intervention Rapide
            </CardTitle>
            <p className="text-muted-foreground">
              Remplissez ce formulaire pour être rappelé immédiatement par notre équipe
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom complet *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Téléphone *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+212 6XX XXX XXX"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                    Ville *
                  </label>
                  <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre ville" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="need" className="block text-sm font-medium text-foreground mb-2">
                    Type de besoin
                  </label>
                  <Select value={formData.need} onValueChange={(value) => setFormData({ ...formData, need: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type d'intervention" />
                    </SelectTrigger>
                    <SelectContent>
                      {needs.map((need) => (
                        <SelectItem key={need} value={need}>
                          {need}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="submit" size="lg" className="flex-1">
                  <Phone className="h-5 w-5 mr-2" />
                  Être rappelé immédiatement
                </Button>
                <Button type="button" size="lg" variant="outline" asChild className="flex-1">
                  <a href="tel:+212600000000" className="flex items-center justify-center">
                    Appeler maintenant
                  </a>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuickContactForm;