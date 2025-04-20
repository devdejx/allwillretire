
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

// Mapping for specific articles with known image issues
const ARTICLE_IMAGE_MAPPING: Record<string, string> = {
  "Staying Safe in the AWR Community": "/lovable-uploads/6908fc9a-fe98-4b50-a20b-294fe6c8b560.png",
  "Celebrating the Aspirations of AWR": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
  "Why the Trump Coin Validates All Will Retire": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
  "AWR Day 43: Small Incremental Progress to Believe In": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
  "Why We Need Stress-Scaling Communities: Being Process Oriented": "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png"
};

function extractFirstImageFromContent(content: string, title: string): string {
  // First check if we have a specific mapping for this article
  if (ARTICLE_IMAGE_MAPPING[title]) {
    console.log(`Using mapped image for "${title}": ${ARTICLE_IMAGE_MAPPING[title]}`);
    return ARTICLE_IMAGE_MAPPING[title];
  }
  
  // Try to extract image using regex for img tags
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  
  // If we found an image, validate it's not a tracking pixel or stat URL
  if (match?.[1] && !match[1].includes('stat?event=') && !match[1].includes('_/stat')) {
    return match[1];
  }
  
  // Check if there's a figure with an image
  const figureRegex = /<figure[^>]*>.*?<img[^>]+src="([^">]+)".*?<\/figure>/s;
  const figureMatch = content.match(figureRegex);
  if (figureMatch?.[1] && !figureMatch[1].includes('stat?event=') && !figureMatch[1].includes('_/stat')) {
    return figureMatch[1];
  }

  // Check for background-image style in any element
  const bgImgRegex = /background-image:\s*url\(['"]?([^'")]+)['"]?\)/;
  const bgMatch = content.match(bgImgRegex);
  if (bgMatch?.[1] && !bgMatch[1].includes('stat?event=') && !bgMatch[1].includes('_/stat')) {
    return bgMatch[1];
  }
  
  // If no valid image found, use a specific fallback based on the title
  if (title.includes("Staying Safe")) {
    return "/lovable-uploads/6908fc9a-fe98-4b50-a20b-294fe6c8b560.png";
  }
  
  // Use default fallback as last resort
  return "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png";
}

async function fetchMediumArticles(): Promise<MediumArticle[]> {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`);
    const data = await response.json();
    
    if (!data.items) {
      console.error('No items found in Medium RSS feed');
      throw new Error('No articles found');
    }

    return data.items.map((item: any) => {
      // Log to help debug image extraction
      console.log(`Extracting image for: ${item.title}`);
      const extractedImage = extractFirstImageFromContent(item.content, item.title);
      console.log(`Image found: ${extractedImage}`);
      
      return {
        title: item.title,
        publishDate: new Date(item.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        readTime: `${Math.ceil(item.content.split(' ').length / 200)} min read`,
        image: extractedImage,
        excerpt: item.description.replace(/<[^>]*>/g, '').substring(0, 300) + '...',
        url: item.link
      };
    });
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
