import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Yirween | Blog',
    description: 'yirween的小站！',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./posts/**/*.md')),
    customData: `<language>cn-zh</language>`,
  });
}