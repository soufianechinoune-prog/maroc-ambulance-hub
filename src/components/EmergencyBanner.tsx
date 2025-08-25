import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

const EmergencyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [language, setLanguage] = useState<'fr' | 'ar'>('fr');

  useEffect(() => {
    // Check if banner was closed in this session
    const wasClosed = sessionStorage.getItem('emergencyBannerClosed') === '1';
    if (wasClosed) {
      setIsVisible(false);
    }

    // Detect document language
    const lang = (document.documentElement.lang || '').toLowerCase();
    setLanguage(lang.startsWith('ar') ? 'ar' : 'fr');
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('emergencyBannerClosed', '1');
  };

  if (!isVisible) return null;

  const messages = {
    fr: (
      <>
        En cas d'urgence vitale, appelez immédiatement le <strong>150</strong> (Protection Civile / Ambulance). 
        Nous ne sommes pas un service d'urgence.
      </>
    ),
    ar: (
      <>
        في حالة طارئة مهدِّدة للحياة، اتصل فورًا بالرقم <strong>150</strong> (الوقاية المدنية / الإسعاف). 
        لسنا خدمة طوارئ.
      </>
    )
  };

  return (
    <div 
      className={`emergency-banner ${language === 'ar' ? 'rtl' : ''}`}
      role="alert" 
      aria-live="polite"
      dir={language === 'ar' ? 'rtl' : 'auto'}
    >
      <AlertTriangle className="emergency-icon" size={18} />
      <span className="emergency-text">
        {messages[language]}
      </span>
      <button 
        className="emergency-close" 
        onClick={handleClose}
        aria-label={language === 'ar' ? 'إغلاق' : 'Fermer'}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default EmergencyBanner;