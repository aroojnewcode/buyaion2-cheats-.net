import type { Locale } from '../locales';

export type ForumUiStrings = {
  sortPopular: string;
  sortLatest: string;
  sortDiscussed: string;
  searchPlaceholder: string;
  searchAria: string;
  sidebarCategories: string;
  relatedTitle: string;
  sourceGuide: string;
  readGuide: string;
  backToForum: string;
  votes: string;
  comments: string;
  fromGuide: string;
  posts?: Record<
    string,
    { title?: string; excerpt?: string; sourceTitle?: string; body?: string[] }
  >;
};

const UI: Record<Exclude<Locale, 'en' | 'th' | 'es'>, ForumUiStrings> = {
  ko: {
    sortPopular: '인기',
    sortLatest: '최신',
    sortDiscussed: '댓글 많음',
    searchPlaceholder: '게시글 검색…',
    searchAria: '포럼 검색',
    sidebarCategories: '카테고리',
    relatedTitle: '관련 글',
    sourceGuide: '가이드',
    readGuide: '가이드 읽기',
    backToForum: '포럼으로',
    votes: '추천',
    comments: '댓글',
    fromGuide: '가이드 요약',
  },
  'zh-tw': {
    sortPopular: '熱門',
    sortLatest: '最新',
    sortDiscussed: '討論最多',
    searchPlaceholder: '搜尋貼文…',
    searchAria: '論壇搜尋',
    sidebarCategories: '分類',
    relatedTitle: '相關貼文',
    sourceGuide: '指南',
    readGuide: '閱讀指南',
    backToForum: '返回論壇',
    votes: '票數',
    comments: '留言',
    fromGuide: '指南摘要',
  },
  de: {
    sortPopular: 'Beliebt',
    sortLatest: 'Neueste',
    sortDiscussed: 'Meist diskutiert',
    searchPlaceholder: 'Beiträge suchen…',
    searchAria: 'Forum durchsuchen',
    sidebarCategories: 'Kategorien',
    relatedTitle: 'Ähnliche Beiträge',
    sourceGuide: 'Guide',
    readGuide: 'Guide lesen',
    backToForum: 'Zurück zum Forum',
    votes: 'Stimmen',
    comments: 'Kommentare',
    fromGuide: 'Aus dem Guide',
  },
  'pt-br': {
    sortPopular: 'Popular',
    sortLatest: 'Recentes',
    sortDiscussed: 'Mais comentados',
    searchPlaceholder: 'Buscar posts…',
    searchAria: 'Busca no fórum',
    sidebarCategories: 'Categorias',
    relatedTitle: 'Posts relacionados',
    sourceGuide: 'Guia',
    readGuide: 'Ler guia',
    backToForum: 'Voltar ao fórum',
    votes: 'Votos',
    comments: 'Comentários',
    fromGuide: 'Do guia',
  },
  fr: {
    sortPopular: 'Populaire',
    sortLatest: 'Récent',
    sortDiscussed: 'Plus commentés',
    searchPlaceholder: 'Rechercher des posts…',
    searchAria: 'Recherche forum',
    sidebarCategories: 'Catégories',
    relatedTitle: 'Posts associés',
    sourceGuide: 'Guide',
    readGuide: 'Lire le guide',
    backToForum: 'Retour au forum',
    votes: 'Votes',
    comments: 'Commentaires',
    fromGuide: 'Extrait du guide',
  },
  ja: {
    sortPopular: '人気',
    sortLatest: '新着',
    sortDiscussed: 'コメント多い',
    searchPlaceholder: '投稿を検索…',
    searchAria: 'フォーラム検索',
    sidebarCategories: 'カテゴリ',
    relatedTitle: '関連投稿',
    sourceGuide: 'ガイド',
    readGuide: 'ガイドを読む',
    backToForum: 'フォーラムへ戻る',
    votes: '投票',
    comments: 'コメント',
    fromGuide: 'ガイドから',
  },
};

export const FORUM_UI: Partial<Record<Locale, ForumUiStrings>> = UI;

export const FORUM_CATEGORY: Partial<Record<Locale, Record<string, string>>> = {
  ko: {
    General: '일반',
    'Guides & Builds': '가이드·빌드',
    'Patch Talk': '패치',
    Community: '커뮤니티',
  },
  'zh-tw': {
    General: '綜合',
    'Guides & Builds': '攻略與配置',
    'Patch Talk': '版本更新',
    Community: '社群',
  },
  de: {
    General: 'Allgemein',
    'Guides & Builds': 'Guides & Builds',
    'Patch Talk': 'Patch-Talk',
    Community: 'Community',
  },
  'pt-br': {
    General: 'Geral',
    'Guides & Builds': 'Guias e builds',
    'Patch Talk': 'Patches',
    Community: 'Comunidade',
  },
  fr: {
    General: 'Général',
    'Guides & Builds': 'Guides & builds',
    'Patch Talk': 'Patches',
    Community: 'Communauté',
  },
  ja: {
    General: '一般',
    'Guides & Builds': 'ガイド・ビルド',
    'Patch Talk': 'パッチ',
    Community: 'コミュニティ',
  },
};

export const FORUM_FLAIR: Partial<Record<Locale, string>> = {
  ko: '가이드 Q&A',
  'zh-tw': '指南 Q&A',
  de: 'Guide Q&A',
  'pt-br': 'Guia Q&A',
  fr: 'Guide Q&A',
  ja: 'ガイド Q&A',
};

export const FORUM_COMMENT_HINTS: Partial<
  Record<Locale, Record<string, string[]>>
> = {};
