import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import medicalTeam from "@/assets/medical-team.jpg";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ahmed Benali",
      location: "Casablanca",
      rating: 5,
      text: "Intervention très rapide lors de l'urgence de ma mère. L'équipe était professionnelle et rassurante. Merci beaucoup !",
      date: "Il y a 2 semaines"
    },
    {
      name: "Fatima Zahra",
      location: "Rabat",
      rating: 5,
      text: "Service exceptionnel ! Ils sont arrivés en moins de 10 minutes. Personnel très compétent et équipement moderne.",
      date: "Il y a 1 mois"
    },
    {
      name: "Mohamed Tazi",
      location: "Marrakech",
      rating: 5,
      text: "Transport inter-hôpitaux parfaitement organisé. Communication claire et personnel très professionnel.",
      date: "Il y a 3 semaines"
    },
    {
      name: "Aicha Alami",
      location: "Tanger",
      rating: 5,
      text: "Disponibles 24h/24 comme promis. Intervention nocturne excellente, équipe très rassurante.",
      date: "Il y a 1 semaine"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ce que disent nos patients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La confiance de nos patients est notre plus belle récompense. 
            Découvrez leurs témoignages sur notre service d'ambulance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-1" />
                    <p className="text-muted-foreground italic pl-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-2xl p-8 border border-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Une équipe médicale d'excellence
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Notre équipe de professionnels de la santé est formée aux dernières 
                techniques de secours et d'urgence médicale. Nous maintenons les plus 
                hauts standards de qualité pour garantir votre sécurité.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction client</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-success">15 ans</div>
                  <div className="text-sm text-muted-foreground">D'expérience</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={medicalTeam} 
                alt="Équipe médicale professionnelle" 
                className="rounded-xl shadow-lg w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Bottom Reviews Summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-full">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold">4.9/5</span>
            <span className="text-amber-600">• +500 avis clients</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;