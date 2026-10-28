import type { ForumComment, ForumPost } from '../../data/forum';
import type { Locale } from '../locales';
import { localizeBlogPost } from '../blog/localize';
import { blogPosts } from '../../data/blog';
import { FORUM_UI, FORUM_CATEGORY, FORUM_FLAIR, FORUM_COMMENT_HINTS } from './ui';

function blogSlugFromPath(path?: string): string | undefined {
  if (!path) return undefined;
  const m = path.match(/\/blog\/([^/]+)\//);
  return m?.[1];
}

function blogOverlayForSlug(slug: string, locale: Locale) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return undefined;
  return localizeBlogPost(post, locale);
}

function localizeComments(post: ForumPost, locale: Locale): ForumComment[] {
  if (locale === 'en') return post.comments;
  const hints = FORUM_COMMENT_HINTS[locale];
  return post.comments.map((c, i) => ({
    ...c,
    body: hints?.[post.slug]?.[i] ?? c.body,
  }));
}

/** Localize forum thread copy for SEO locales (slugs stay English). */
export function localizeForumPost(post: ForumPost, locale: Locale): ForumPost {
  if (locale === 'en') return post;

  const ui = FORUM_UI[locale];
  const blogSlug = blogSlugFromPath(post.sourcePath);
  const blog = blogSlug ? blogOverlayForSlug(blogSlug, locale) : undefined;

  const title = ui?.posts?.[post.slug]?.title ?? blog?.title ?? post.title;
  const excerpt = ui?.posts?.[post.slug]?.excerpt ?? blog?.desc ?? post.excerpt;
  const sourceTitle = ui?.posts?.[post.slug]?.sourceTitle ?? blog?.title ?? post.sourceTitle;

  const bodyFromUi = ui?.posts?.[post.slug]?.body;
  const bodyFromBlog =
    blog?.body
      ?.filter((b) => b.type === 'p')
      .slice(0, 3)
      .map((b) => (b.type === 'p' ? b.text : ''))
      .filter(Boolean) ?? [];

  const body =
    bodyFromUi && bodyFromUi.length > 0
      ? bodyFromUi
      : bodyFromBlog.length > 0
        ? bodyFromBlog
        : post.body;

  return {
    ...post,
    category: FORUM_CATEGORY[locale]?.[post.category] ?? post.category,
    title,
    excerpt,
    sourceTitle,
    flair: post.flair ? (FORUM_FLAIR[locale] ?? post.flair) : post.flair,
    body,
    comments: localizeComments(post, locale),
  };
}

export function localizeForumPosts(posts: ForumPost[], locale: Locale): ForumPost[] {
  return posts.map((p) => localizeForumPost(p, locale));
}
