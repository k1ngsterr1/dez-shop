export function formatPrice(
  price: number,
  options?: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const {
    currency = "KZT", // Default to Tenge
    locale = "kk-KZ", // Kazakh locale, often uses space as separator. We'll override.
    minimumFractionDigits = 0, // No decimals for whole numbers like 1.000
    maximumFractionDigits = 2, // Allow up to 2 decimals if price has them
  } = options || {};

  if (price < 0) {
    return "Цена по запросу";
  }

  // Use a locale that uses dot as a thousands separator, like 'de-DE'
  // Then, we can manually append the correct currency symbol if needed,
  // or rely on the fact that we only want the number formatting.
  const numberFormatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  });

  const formattedNumber = numberFormatter.format(price);

  // Append the Tenge symbol
  if (currency === "KZT") {
    return `${formattedNumber} ₸`;
  }

  // Fallback for other currencies if ever needed, though not requested
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  });
  return currencyFormatter.format(price);
}
