import { Link } from "react-router-dom";
import { CallButton } from "@/components/ContactCTA";

export default function NationalSeoBlock() {
  return (
    <section
      id="intro-seo"
      className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-12 prose prose-slate prose-headings:scroll-mt-24"
      aria-labelledby="seo-heading"
    >
      <h2 id="seo-heading" className="!mb-4 text-2xl md:text-3xl font-bold">
        Ambulance au Maroc : un service d’urgence et de transport médicalisé 24h/24
      </h2>

      <p className="!mt-0">
        Avec <strong>Ambulance Maroc</strong>, vous accédez à un réseau national d’ambulances
        disponibles en <strong>urgence 24h/24</strong> et pour le <strong>transport médicalisé</strong> planifié.
        Présentes dans les grandes agglomérations et leurs périphéries, nos équipes assurent une
        prise en charge rapide, coordonnée et sécurisée. Notre <strong>temps de réponse</strong> moyen en zone
        urbaine est en moyenne de <strong>8 à 15 minutes</strong>, avec une disponibilité continue, y compris la nuit,
        les week‑ends et jours fériés.
      </p>

      <h3 className="mt-8">Des interventions rapides dans toutes les grandes villes</h3>
      <p>
        En milieu urbain, nos équipes atteignent généralement le lieu d’intervention en 8 à 15 minutes,
        selon la distance et le trafic. Notre dispositif fonctionne <strong>24h/24 et 7j/7</strong> et couvre les
        principales métropoles du pays — <Link to="/ambulance-casablanca">Casablanca</Link>,
        {" "}<Link to="/ambulance-rabat">Rabat</Link>,{" "}
        <Link to="/ambulance-marrakech">Marrakech</Link>,{" "}
        <Link to="/ambulance-tanger">Tanger</Link>,{" "}
        <Link to="/ambulance-agadir">Agadir</Link>,{" "}
        <Link to="/ambulance-fes">Fès</Link>,{" "}
        <Link to="/ambulance-meknes">Meknès</Link>,{" "}
        <Link to="/ambulance-oujda">Oujda</Link> — ainsi que leurs périphéries (zones industrielles,
        communes limitrophes, axes autoroutiers). Chaque appel est priorisé et orienté vers l’ambulance
        la plus proche pour réduire les délais.
      </p>

      <h3 className="mt-8">Un réseau national d’ambulances équipées</h3>
      <ul>
        <li>Brancards, matelas coquille et immobilisation</li>
        <li>Oxygénothérapie et aspirations</li>
        <li>Monitoring et défibrillation si besoin</li>
        <li>Hygiène et désinfection selon protocole</li>
      </ul>

      <p className="mt-4">
        Découvrez nos pages locales dédiées :
        {" "}<Link to="/ambulance-casablanca">Ambulance à Casablanca</Link>,
        {" "}<Link to="/ambulance-rabat">Ambulance à Rabat</Link>,
        {" "}<Link to="/ambulance-marrakech">Ambulance à Marrakech</Link>,
        {" "}<Link to="/ambulance-tanger">Ambulance à Tanger</Link>,
        {" "}<Link to="/ambulance-fes">Ambulance à Fès</Link>,
        {" "}<Link to="/ambulance-agadir">Ambulance à Agadir</Link>,
        {" "}<Link to="/ambulance-meknes">Ambulance à Meknès</Link>,
        {" "}<Link to="/ambulance-oujda">Ambulance à Oujda</Link>.
      </p>

      <h3 className="mt-8">Un personnel médical formé et certifié</h3>
      <p>
        Les interventions sont réalisées par des <strong>auxiliaires ambulanciers</strong>, <strong>infirmiers</strong> et,
        lorsque nécessaire, par un <strong>médecin urgentiste</strong>. Les équipes appliquent des protocoles validés,
        conformes aux recommandations des autorités sanitaires.
      </p>

      <h3 className="mt-8">Coordination avec les hôpitaux et cliniques</h3>
      <p>
        Du premier appel à l’admission, nous assurons une <strong>coordination hôpital</strong> et cliniques fluide :
        choix de la structure la plus adaptée, transmission des informations utiles, préparation à l’accueil du patient.
        Nous opérons également au sein d’<strong>entreprises</strong>, d’<strong>hôtels</strong>, d’<strong>établissements scolaires</strong>,
        mais aussi en <strong>événementiel</strong> et <strong>zones industrielles</strong>.
      </p>

      <h3 className="mt-8">Comment demander une ambulance au Maroc ?</h3>
      <p>
        Pour une prise en charge immédiate, appelez le{" "}
        <CallButton phone="+212777722311" className="text-primary underline">+212 7777 223 11</CallButton>,
        écrivez sur WhatsApp (bouton en haut de page) ou utilisez le{" "}
        <a className="text-primary underline" href="#demande-ambulance">formulaire d’intervention</a>.
        Nos équipes confirment la destination, l’état du patient et orientent vers l’<strong>ambulance au Maroc</strong>
        la plus proche disponible, en maintenant un transfert sécurisé.
      </p>
    </section>
  );
}
