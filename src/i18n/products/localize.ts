import type { ProductPage } from '../../data/products';
import type { Locale } from '../locales';
import { getTranslations } from '../index';
import { PRODUCT_DETAIL } from './detail-locales';

function cardForSlug(locale: Locale, slug: string) {
  const t = getTranslations(locale);
  const elite = t.cheats.items.find((item) => item.href.includes(`/${slug}/`));
  if (elite) return elite;
  return t.products.items.find((item) => item.href.includes(`/${slug}/`));
}

/** Merge locale card copy + long-form product detail overlays. */
export function localizeProductPage(page: ProductPage, locale: Locale): ProductPage {
  if (locale === 'en') return page;

  const card = cardForSlug(locale, page.slug);
  const detail = PRODUCT_DETAIL[locale]?.[page.slug];

  return {
    ...page,
    badge: card?.badge ?? detail?.badge ?? page.badge,
    category: card && 'category' in card ? card.category : page.category,
    name: (card && 'name' in card ? card.name : undefined) ?? card?.title ?? page.name,
    title: card?.title ?? detail?.title ?? page.title,
    subtitle: card?.subtitle ?? detail?.subtitle ?? page.subtitle,
    desc: card?.desc ?? detail?.desc ?? page.desc,
    features: card?.features ?? detail?.features ?? page.features,
    overview: detail?.overview ?? page.overview,
    acquisition: detail?.acquisition ?? page.acquisition,
    goodToKnow: detail?.goodToKnow ?? page.goodToKnow,
    limitations: detail?.limitations ?? page.limitations,
    fullFeatures: detail?.fullFeatures ?? page.fullFeatures,
    systemRequirements: detail?.systemRequirements ?? page.systemRequirements,
    about: detail?.about ?? page.about,
    body: detail?.body ?? page.body,
    images:
      detail?.images ??
      page.images.map((img, i) => ({
        ...img,
        alt: detail?.imageAlts?.[i] ?? img.alt,
        caption: detail?.imageCaptions?.[i] ?? img.caption,
        captionDesc: detail?.imageCaptionDescs?.[i] ?? img.captionDesc,
      })),
  };
}
