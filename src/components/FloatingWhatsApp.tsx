import { MessageCircle } from "lucide-react";
import { WhatsAppButton } from "@/components/ContactCTA";

export default function FloatingWhatsApp() {
  return (
    <WhatsAppButton
      phone="+212777722311"
      text="Salut test"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
    </WhatsAppButton>
  );
}