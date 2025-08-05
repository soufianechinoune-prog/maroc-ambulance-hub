import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Service d'urgence 24h/24 - Intervention rapide partout au Maroc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+212600000000" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Urgence: +212 6 00 00 00 00
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" asChild>
              <a href="https://wa.me/212600000000" className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-emergency/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-emergency" />
                </div>
                <CardTitle className="text-emergency">Urgences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900 mb-2">+212 6 00 00 00 00</p>
                <p className="text-gray-600">Disponible 24h/24</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900 mb-2">+212 6 00 00 00 00</p>
                <p className="text-gray-600">Message instantané</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900 mb-2">contact@ambulance-maroc.ma</p>
                <p className="text-gray-600">Réponse sous 2h</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Adresse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900 mb-2">123 Bd Mohammed V</p>
                <p className="text-gray-600">Casablanca, Maroc</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Demande d'Intervention
              </h2>
              <p className="text-xl text-gray-600">
                Remplissez le formulaire ci-dessous pour une demande non urgente
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="bg-emergency text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold">Urgence Médicale ?</h2>
          </div>
          <p className="text-xl mb-6">
            En cas d'urgence médicale, ne remplissez pas le formulaire - appelez directement !
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="tel:+212600000000" className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Appelez immédiatement: +212 6 00 00 00 00
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;