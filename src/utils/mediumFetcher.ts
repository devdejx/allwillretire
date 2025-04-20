
import { useQuery } from '@tanstack/react-query';

export interface MediumArticle {
  title: string;
  publishDate: string;
  readTime: string;
  image: string;
  excerpt: string;
  url: string;
}

const MEDIUM_RSS_URL = 'https://medium.com/feed/@allwillretire';

async function fetchMediumArticles(): Promise<MediumArticle[]> {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`);
    const data = await response.json();
    
    if (!data.items) {
      console.error('No items found in Medium RSS feed');
      throw new Error('No articles found');
    }

    return data.items.map((item: any) => ({
      title: item.title,
      publishDate: new Date(item.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: `${Math.ceil(item.content.split(' ').length / 200)} min read`,
      image: item.thumbnail || item.enclosure?.link || "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
      excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 300) + '...',
      url: item.link
    }));
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    throw error;
  }
}

export function useMediumArticles() {
  return useQuery({
    queryKey: ['mediumArticles'],
    queryFn: fetchMediumArticles,
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
