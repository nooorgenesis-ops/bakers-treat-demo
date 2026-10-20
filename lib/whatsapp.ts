import { businessConfig } from "@/data/config";
import { CartItem } from "./cart-context";

/**
 * Builds the URL-encoded WhatsApp order enquiry message according to specifications,
 * taking into account any selected product variant (e.g., Piri Piri, chicken, size).
 */
export function buildWhatsAppOrderUrl(items: CartItem[], subtotal: number): string {
  if (!items || items.length === 0) return "";

  const lines: string[] = [
    `Hello ${businessConfig.shortName}! I would like to enquire about this order:`,
    "",
  ];

  for (const item of items) {
    const itemPrice = item.selectedVariant?.price ?? item.product.price ?? 0;
    const lineTotal = itemPrice * item.quantity;
    const variantLabel = item.selectedVariant ? ` (${item.selectedVariant.name})` : "";
    lines.push(`• ${item.product.name}${variantLabel} × ${item.quantity} — ₹${lineTotal}`);
  }

  lines.push("");
  lines.push(`Estimated subtotal: ₹${subtotal}`);
  lines.push("");
  lines.push("Please confirm availability and the final order total.");

  const messageText = lines.join("\n");
  const encodedMessage = encodeURIComponent(messageText);

  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Builds a direct enquiry WhatsApp link with an optional custom message
 */
export function buildWhatsAppDirectUrl(customText?: string): string {
  const text =
    customText ||
    `Hello ${businessConfig.shortName}! I would like to enquire about today's menu and specials at Panemangalore.`;
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
