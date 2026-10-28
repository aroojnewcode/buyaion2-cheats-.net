/** Checkout destinations keyed by internal product id (Levo affiliate). */
const LEVO_AION2 = 'https://levocheats.com/go/8b9cad82?to=%2Faion-2-cheats';

export const CHECKOUT_URLS = {
  aion2: LEVO_AION2,
  skinChanger: LEVO_AION2,
  hwidSpoofer: LEVO_AION2,
  ugc: LEVO_AION2,
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
