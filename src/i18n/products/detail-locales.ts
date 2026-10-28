import type { ProductPage } from '../../data/products';
import type { Locale } from '../locales';

export type ProductDetailOverlay = Partial<
  Pick<
    ProductPage,
    | 'title'
    | 'subtitle'
    | 'desc'
    | 'features'
    | 'overview'
    | 'acquisition'
    | 'goodToKnow'
    | 'limitations'
    | 'fullFeatures'
    | 'systemRequirements'
    | 'about'
    | 'body'
  >
> & {
  badge?: string;
  imageAlts?: string[];
  imageCaptions?: string[];
  imageCaptionDescs?: string[];
};

/** Long-form product copy overlays (card fields come from locale cheats/products). */
export const PRODUCT_DETAIL: Partial<Record<Locale, Record<string, ProductDetailOverlay>>> = {};
