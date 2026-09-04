import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const dynamics = await getCollection('dynamics');

  return rss({
    title: 'Yirween | Dynamic',
    description: 'yirween的日常！',
    site: context.site,
    items: dynamics
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((entry) => {
        const slug = entry.id
          .replace(/\.md$/, '')
          .split('/')
          .map(encodeURIComponent)
          .join('/');

        return {
          title: entry.data.title,
          description: entry.data.description,
          pubDate: entry.data.pubDate,
          link: `${context.site}dynamic/${slug}/`,
          author: entry.data.author,
        };
      }),
    customData: `<language>cn-zh</language>`,
  });
}