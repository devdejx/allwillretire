
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

// Enhanced mapping for articles with known image issues
// Adding more specific mappings for problematic articles
const ARTICLE_IMAGE_MAPPING: Record<string, string> = {
  "Staying Safe in the AWR Community": "/lovable-uploads/6908fc9a-fe98-4b50-a20b-294fe6c8b560.png",
  "Celebrating the Aspirations of AWR": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
  "Why the Trump Coin Validates All Will Retire": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
  "AWR Day 43: Small Incremental Progress to Believe In": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
  "Why We Need Stress-Scaling Communities: Being Process Oriented": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
  "Statement On Magnetix": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
  "Why Now Is The Perfect Time To Tell Our Story": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png"
};

// Improved function to normalize URLs
function normalizeUrl(url: string): string {
  // Handle medium.com URLs that might have tracking parameters
  if (url.includes('medium.com')) {
    // Remove query parameters
    const baseUrl = url.split('?')[0];
    return baseUrl;
  }
  return url;
}

function extractFirstImageFromContent(content: string, title: string): string {
  // First check if we have a specific mapping for this article
  if (ARTICLE_IMAGE_MAPPING[title]) {
    console.log(`Using mapped image for "${title}": ${ARTICLE_IMAGE_MAPPING[title]}`);
    return ARTICLE_IMAGE_MAPPING[title];
  }
  
  // Try to extract image using regex for img tags
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const matches = [...content.matchAll(imgRegex)];
  
  // Filter out tracking pixels and find valid images
  for (const match of matches) {
    const imgSrc = match[1];
    if (imgSrc && 
        !imgSrc.includes('stat?event=') && 
        !imgSrc.includes('_/stat') && 
        !imgSrc.includes('pixel') &&
        !imgSrc.includes('tracking')) {
      console.log(`Found valid image in "${title}": ${imgSrc}`);
      return imgSrc;
    }
  }
  
  // Check if there's a figure with an image
  const figureRegex = /<figure[^>]*>.*?<img[^>]+src="([^">]+)".*?<\/figure>/sg;
  const figureMatches = [...content.matchAll(figureRegex)];
  
  for (const match of figureMatches) {
    const imgSrc = match[1];
    if (imgSrc && 
        !imgSrc.includes('stat?event=') && 
        !imgSrc.includes('_/stat') && 
        !imgSrc.includes('pixel') && 
        !imgSrc.includes('tracking')) {
      console.log(`Found valid figure image in "${title}": ${imgSrc}`);
      return imgSrc;
    }
  }

  // Check for background-image style in any element
  const bgImgRegex = /background-image:\s*url\(['"]?([^'")]+)['"]?\)/g;
  const bgMatches = [...content.matchAll(bgImgRegex)];
  
  for (const match of bgMatches) {
    const imgSrc = match[1];
    if (imgSrc && 
        !imgSrc.includes('stat?event=') && 
        !imgSrc.includes('_/stat') && 
        !imgSrc.includes('pixel') && 
        !imgSrc.includes('tracking')) {
      console.log(`Found valid background image in "${title}": ${imgSrc}`);
      return imgSrc;
    }
  }
  
  // Use default fallback as last resort
  console.log(`No valid image found for "${title}", using default fallback`);
  return "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png";
}

async function fetchMediumArticles(): Promise<MediumArticle[]> {
  try {
    console.log('Fetching Medium articles from RSS feed:', MEDIUM_RSS_URL);
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`);
    
    if (!response.ok) {
      console.error('RSS feed response not OK:', response.status, response.statusText);
      throw new Error(`RSS feed response not OK: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('RSS feed response:', JSON.stringify(data, null, 2));
    
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      console.error('No items found in Medium RSS feed or invalid format');
      throw new Error('No articles found');
    }

    // Create a map to deduplicate articles by url
    const articlesMap = new Map<string, MediumArticle>();

    const parsedArticles = data.items.map((item: any) => {
      // Log to help debug image extraction
      console.log(`Processing article: ${item.title}`);
      console.log(`Article URL: ${item.link}`);
      
      // Extract image
      const extractedImage = extractFirstImageFromContent(item.content, item.title);
      console.log(`Image found for ${item.title}: ${extractedImage}`);
      
      // Calculate read time (approx 200 words per minute)
      const wordCount = item.content.split(/\s+/).length;
      const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      
      // Clean up excerpt from HTML tags and trim to reasonable length
      let excerpt = item.description.replace(/<[^>]*>/g, '');
      if (excerpt.length > 300) {
        excerpt = excerpt.substring(0, 300) + '...';
      }

      return {
        title: item.title,
        publishDate: new Date(item.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        readTime: `${readTimeMinutes} min read`,
        image: extractedImage,
        excerpt: excerpt,
        url: normalizeUrl(item.link)
      };
    });

    // Add all articles to the map to deduplicate 
    parsedArticles.forEach(article => {
      articlesMap.set(article.url, article);
    });

    // Convert map back to array
    return Array.from(articlesMap.values());
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
