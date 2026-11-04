/** Zadeyo affiliate checkout — all buy / access CTAs. */
export const ZADEYO_AION2_CHECKOUT =
  'https://zadeyo.com/go/UROOJ?to=%2Fproducts%2Faion-2';

/** Checkout destinations keyed by internal product id (all route to Aion 2 store). */
export const CHECKOUT_URLS = {
  aion2: ZADEYO_AION2_CHECKOUT,
  skinChanger: ZADEYO_AION2_CHECKOUT,
  hwidSpoofer: ZADEYO_AION2_CHECKOUT,
  ugc: ZADEYO_AION2_CHECKOUT,
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/aion-2', CHECKOUT_URLS.aion2],
  ['/go/aion-2/', CHECKOUT_URLS.aion2],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
