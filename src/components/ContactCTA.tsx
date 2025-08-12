import { track } from "@/lib/track";
import React from "react";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  phone?: string;
  text?: string; // for WhatsApp preset message
};

export function CallButton({
  phone = "+212777722311",
  children,
  className,
  onClick,
  ...rest
}: AnchorProps) {
  const href = `tel:${phone}`;
  return (
    <a
      href={href}
      className={className}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        try {
          track("click_call", { phone });
        } catch {}
      }}
    >
      {children ?? "Appeler maintenant"}
    </a>
  );
}

export function WhatsAppButton({
  phone = "+212777722311",
  text = "Bonjour",
  children,
  className,
  target,
  rel,
  onClick,
  ...rest
}: AnchorProps) {
  const phoneDigits = phone.replace(/\D/g, "");
  const url = `https://wa.me/${phoneDigits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
  const finalTarget = target ?? "_blank";
  const finalRel = rel ?? "noopener noreferrer";

  return (
    <a
      href={url}
      className={className}
      target={finalTarget}
      rel={finalRel}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        try {
          track("click_whatsapp", { phone });
        } catch {}
      }}
    >
      {children ?? "WhatsApp"}
    </a>
  );
}
