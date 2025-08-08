import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useHashScroll(offset: number = 80) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [pathname, hash, offset]);
}
