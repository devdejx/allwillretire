
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

// Fixed fallback articles for consistent display
const FALLBACK_ARTICLES: MediumArticle[] = [
  {
    title: "Why Now Is The Perfect Time To Tell Our Story",
    publishDate: "March 15, 2025",
    readTime: "5 min read",
    image: "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png",
    excerpt: "The current macroeconomic environment has changed the way we think about personal finance, security, and wealth...",
    url: "https://medium.com/@allwillretire/why-now-is-the-perfect-time-to-tell-our-story-c8a2ab6b8943"
  },
  {
    title: "Staying Safe in the AWR Community",
    publishDate: "March 22, 2025",
    readTime: "4 min read",
    image: "/lovable-uploads/6908fc9a-fe98-4b50-a20b-294fe6c8b560.png",
    excerpt: "As our community grows, ensuring a safe environment for all members becomes increasingly important...",
    url: "https://medium.com/@allwillretire/"
  },
  {
    title: "Statement On Magnetix",
    publishDate: "April 3, 2025",
    readTime: "6 min read",
    image: "https://cdn-images-1.medium.com/max/1022/0*QiOr76yVUxtqYv4M",
    excerpt: "All Will Retire is in no way involved with Magnetix and has no desire to be. Recently events around a coin/community named Magnetix — led by Andrej Bohinc — have unfolded...",
    url: "https://medium.com/@allwillretire/statement-on-magnetix-d61e24e4355f"
  }
];

// The critical Trump/Magnetix article that must always be included
const TRUMP_ARTICLE: MediumArticle = {
  title: "Statement On Magnetix",
  publishDate: "April 3, 2025",
  readTime: "6 min read",
  image: "https://cdn-images-1.medium.com/max/1022/0*QiOr76yVUxtqYv4M",
  excerpt: "All Will Retire is in no way involved with Magnetix and has no desire to be. Recently events around a coin/community named Magnetix — led by Andrej Bohinc — have unfolded...",
  url: "https://medium.com/@allwillretire/statement-on-magnetix-d61e24e4355f"
};

function extractFirstImageFromContent(content: string, title: string): string {
  // Try to extract image using regex for img tags
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  
  // If we found an image, return it
  if (match?.[1]) {
    return match[1];
  }
  
  // Check if there's a figure with an image
  const figureRegex = /<figure[^>]*>.*?<img[^>]+src="([^">]+)".*?<\/figure>/s;
  const figureMatch = content.match(figureRegex);
  if (figureMatch?.[1]) {
    return figureMatch[1];
  }

  // Check for background-image style in any element
  const bgImgRegex = /background-image:\s*url\(['"]?([^'")]+)['"]?\)/;
  const bgMatch = content.match(bgImgRegex);
  if (bgMatch?.[1]) {
    return bgMatch[1];
  }
  
  // Special fixed image for specific articles by title
  if (title.includes("Staying Safe")) {
    return "/lovable-uploads/6908fc9a-fe98-4b50-a20b-294fe6c8b560.png";
  }
  
  if (title.includes("Statement On")) {
    return "https://cdn-images-1.medium.com/max/1022/0*QiOr76yVUxtqYv4M";
  }
  
  // Default fallback
  return "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png";
}

async function fetchMediumArticles(): Promise<MediumArticle[]> {
  try {
    console.log('Fetching Medium articles from:', MEDIUM_RSS_URL);
    
    // Start with an empty articles array
    let articles: MediumArticle[] = [];
    
    try {
      // Use the RSS2JSON API without requiring API key
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`);
      
      if (!response.ok) {
        console.error('RSS2JSON API response was not OK:', response.status);
        return [...FALLBACK_ARTICLES, TRUMP_ARTICLE]; // Return our fallback articles with Trump
      }
      
      const data = await response.json();
      console.log('Medium API response:', data);
      
      // If the API call succeeds, map the response to our MediumArticle interface
      if (data.items && data.status !== 'error' && data.items.length > 0) {
        articles = data.items.map((item: any) => {
          console.log(`Processing article: ${item.title}`);
          const extractedImage = extractFirstImageFromContent(item.content, item.title);
          console.log(`Image found for "${item.title}": ${extractedImage}`);
          
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
      } else {
        console.error('Invalid or empty data from RSS2JSON API:', data);
        articles = [...FALLBACK_ARTICLES];
      }
    } catch (error) {
      console.error('Error fetching from RSS2JSON API:', error);
      articles = [...FALLBACK_ARTICLES];
    }
    
    // Check if Trump article already exists in the fetched articles
    const hasTrumpArticle = articles.some(article => 
      article.title.includes("Statement On Magnetix") || 
      article.title.includes("Magnetix")
    );
    
    // Always include Trump article if not already present
    if (!hasTrumpArticle) {
      console.log('Adding missing Trump/Magnetix article to the list');
      articles.push(TRUMP_ARTICLE);
    }
    
    // Make sure we have at least the fallback articles
    if (articles.length === 0) {
      articles = [...FALLBACK_ARTICLES];
    }
    
    // Double-check Trump article is included before returning
    const finalHasTrump = articles.some(article => 
      article.title.includes("Statement On Magnetix") || 
      article.title.includes("Magnetix")
    );
    
    if (!finalHasTrump) {
      console.error('Trump article missing after all checks. Forcing inclusion.');
      articles.push(TRUMP_ARTICLE);
    }
    
    console.log('Final articles to display:', articles);
    console.log('Trump article check:', articles.some(a => a.title.includes("Statement On")));
    
    return articles;
  } catch (error) {
    console.error('Error in fetchMediumArticles:', error);
    // In case of any error, return fallbacks plus Trump article
    return [...FALLBACK_ARTICLES, TRUMP_ARTICLE];
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
