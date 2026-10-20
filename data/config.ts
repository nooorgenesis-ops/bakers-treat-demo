export interface BusinessConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  supportingTagline: string;
  phonePrimary: string;
  phoneAlternate: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  addressLine1: string;
  addressLine2: string;
  cityState: string;
  mapPinPlaceholderUrl: string;
  openingHoursDisplay: string;
  demoNotice: string;
}

export const businessConfig: BusinessConfig = {
  brandName: "SR Baker’s Treat Café",
  shortName: "SR Baker’s Treat",
  tagline: "Your cravings, beautifully served.",
  supportingTagline: "Discover your next favourite bite at SR Baker’s Treat.",
  phonePrimary: "9108284677",
  phoneAlternate: "9845018324",
  // WhatsApp destination number (using country code 91 + 10-digit primary customer-facing number)
  whatsappNumber: "919108284677",
  instagramHandle: "@srbakerstreat01",
  instagramUrl: "https://www.instagram.com/srbakerstreat01/",
  addressLine1: "Panemangalore, Bantwal",
  addressLine2: "Dakshina Kannada District",
  cityState: "Karnataka 574231",
  mapPinPlaceholderUrl: "https://www.google.com/maps/search/?api=1&query=SR+Baker%27s+Treat+Panemangalore+Bantwal",
  openingHoursDisplay: "Open Daily • 10:30 AM – 10:30 PM (Demo hours)",
  demoNotice: "Notice: This is a presentation demo website with placeholder pricing and sample menu items. Actual orders and delivery are confirmed via WhatsApp with the café team.",
};
