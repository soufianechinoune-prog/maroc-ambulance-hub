import { track } from "@/lib/track";
import React from "react";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  phone?: string;
  text?: string; // for WhatsApp preset message
  utm?: string; // optional UTM query (e.g., "utm_source=site&utm_medium=whatsapp&utm_campaign=cta_principal")
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
  utm,
  children,
  className,
  target,
  rel,
  onClick,
  ...rest
}: AnchorProps) {
  const phoneDigits = phone.replace(/\D/g, "");
  const params: string[] = [];
  if (text) params.push(`text=${encodeURIComponent(text)}`);
  if (utm) params.push(utm.replace(/^\?/, ""));
  const query = params.length ? `?${params.join("&")}` : "";
  const url = `https://wa.me/${phoneDigits}${query}`;
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
