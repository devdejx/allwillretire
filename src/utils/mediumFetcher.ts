
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
  
  // If the title contains "Staying Safe", use a specific fallback image
  if (title.includes("Staying Safe")) {
    return "/lovable-uploads/6908fc9a-fe98-4b50-a20b-294fe6c8b560.png";
  }
  
  // Special case for Trump article
  if (title.includes("Statement On")) {
    return "https://cdn-images-1.medium.com/max/1022/0*QiOr76yVUxtqYv4M";
  }
  
  // Use default fallback as last resort
  return "/lovable-uploads/3475309c-c47f-4e12-8794-7fe32d10d580.png";
}

async function fetchMediumArticles(): Promise<MediumArticle[]> {
  try {
    // Use the RSS2JSON API without requiring API key - it should work for basic fetching
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`);
    const data = await response.json();
    
    // Log the raw data to see what we're getting
    console.log('Medium API response:', data);
    
    // If the API call fails or returns no items, use fallback data
    if (!data.items || data.status === 'error') {
      console.log('Using fallback Medium articles due to API error:', data.message || 'No items found');
      
      // Return hardcoded fallback articles
      return [
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
    
    // Return fallback articles in case of any error
    return [
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
