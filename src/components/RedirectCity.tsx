
import { Navigate, useParams } from "react-router-dom";
import { cities } from "@/data/cities";

/**
 * Composant de redirection pour les anciennes URLs /:slug
 * Redirige vers /ambulance-:slug avec un code 301 permanent
 */
function RedirectCity() {
  const { slug } = useParams<{ slug: string }>();
  
  // Vérifier si le slug correspond à une ville existante
  const cityExists = cities.some(city => city.slug === slug);
  
  if (!cityExists || !slug) {
    // Si la ville n'existe pas, rediriger vers 404
    return <Navigate to="/404" replace />;
  }
  
  // Redirection 301 vers le format canonique
  return <Navigate to={`/ambulance-${slug}`} replace />;
}

export default RedirectCity;
