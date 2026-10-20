"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppDirectUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  className?: string;
  label?: string;
  message?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  className = "",
  label = "Order on WhatsApp",
  message,
  variant = "primary",
  size = "md",
}) => {
  const href = buildWhatsAppDirectUrl(message);

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2 focus:ring-offset-brand-black active:scale-[0.98]";

  const variantStyles = {
    primary:
      "bg-brand-yellow text-brand-black hover:bg-[#ebd300] shadow-[0_4px_16px_rgba(255,229,0,0.25)] font-semibold",
    secondary:
      "bg-brand-charcoal text-white hover:bg-neutral-800 border border-white/10",
    outline:
      "bg-transparent text-brand-yellow border border-brand-yellow/60 hover:bg-brand-yellow/10",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} via WhatsApp`}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      <MessageCircle className={size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      <span>{label}</span>
    </a>
  );
};
