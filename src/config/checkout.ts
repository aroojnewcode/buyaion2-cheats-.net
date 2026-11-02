import { CHECKOUT_URLS, ZADEYO_AION2_CHECKOUT } from './checkout-redirects.mjs';

/** Primary Zadeyo checkout link for buy / access buttons. */
export const CHECKOUT = CHECKOUT_URLS;

export { ZADEYO_AION2_CHECKOUT };

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  aion2: 'aion-2',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Zadeyo checkout URL used on buy / access buttons site-wide. */
export function checkoutPath(_product: CheckoutProduct = 'aion2'): string {
  return ZADEYO_AION2_CHECKOUT;
}

/** Default product checkout (header, support, hero-adjacent CTAs). */
export const PRIMARY_CHECKOUT_PATH = ZADEYO_AION2_CHECKOUT;

/** Map internal product slugs to checkout URL. */
export function checkoutForSlug(_slug: string): string {
  return ZADEYO_AION2_CHECKOUT;
}

/** Resolve blog CTA or legacy href values to the Zadeyo checkout URL. */
export function resolveCheckoutHref(href: string): string {
  if (href.startsWith('/go/')) {
    return ZADEYO_AION2_CHECKOUT;
  }

  if (!href.startsWith('http')) {
    if (href.startsWith('/products/') || href.startsWith('/cheats')) {
      return ZADEYO_AION2_CHECKOUT;
    }
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const url of Object.values(CHECKOUT)) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return ZADEYO_AION2_CHECKOUT;
    }
  }

  if (
    href.includes('zadeyo.com') ||
    href.includes('levocheats.com') ||
    href.includes('%2Fproducts%2F') ||
    href.includes('/products/')
  ) {
    return ZADEYO_AION2_CHECKOUT;
  }

  return href;
}
