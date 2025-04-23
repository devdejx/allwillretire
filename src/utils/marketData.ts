
/**
 * Utility functions for formatting and retrieving market data
 */

export const formatCurrency = (value: number): string => {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B+`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M+`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(1)}K+`;
  } else {
    return `$${Math.round(value).toLocaleString()}+`;
  }
};

export const formatNumber = (value: number | string): string => {
  if (typeof value === 'string') {
    value = parseInt(value, 10);
  }
  return isNaN(value) ? '0' : Math.round(value).toLocaleString();
};

export const extractHolders = async (): Promise<string> => {
  try {
    // Attempt to fetch data from holderscan.com
    const response = await fetch('https://holderscan.com/token/Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache'
      },
      mode: 'cors',
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    
    // Extract holders count using improved regex pattern
    const holdersMatch = text.match(/(?:"holders":|Holders:)\s*"?(\d[\d,]*)"?/i) || 
                         text.match(/(\d[\d,]*)\s+holders/i) ||
                         text.match(/holders:\s*(\d[\d,]*)/i);
    
    console.log('Holders text match:', holdersMatch);
    
    let holdersCount = 0;
    if (holdersMatch && holdersMatch[1]) {
      // Remove commas and convert to number
      holdersCount = parseInt(holdersMatch[1].replace(/,/g, ''), 10);
      console.log('Parsed holders count:', holdersCount);
    } else {
      // If we can't find the holders in the expected format, search more broadly
      const allNumbers = text.match(/\d[\d,]+/g) || [];
      console.log('Found numbers in page:', allNumbers);
      
      // Look for numbers that might represent holders count (typically between 1,000 and 20,000)
      const potentialHolders = allNumbers
        .map(num => parseInt(num.replace(/,/g, ''), 10))
        .filter(num => num >= 1000 && num < 20000);
      
      if (potentialHolders.length > 0) {
        // Take the most likely candidate
        holdersCount = potentialHolders[0];
        console.log('Using potential holders count:', holdersCount);
      } else {
        // Fallback to a default value
        holdersCount = 4721;
        console.log('Using fallback holders count:', holdersCount);
      }
    }
    
    // Alternative data source if holderscan.com doesn't work
    if (holdersCount === 0) {
      try {
        // Try to get data from DexScreener API which might have holder information
        const dexScreenerResponse = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/fo7vnhaddvnmx4axjo7cc1wwb9ko2pk2dfdzl3dybxkp');
        const dexData = await dexScreenerResponse.json();
        
        // Some DEX APIs include holder information
        if (dexData.pair && dexData.pair.holderStats && dexData.pair.holderStats.count) {
          holdersCount = parseInt(dexData.pair.holderStats.count, 10);
          console.log('Got holders count from DexScreener:', holdersCount);
        }
      } catch (dexError) {
        console.error('Failed to get data from DexScreener:', dexError);
      }
    }
    
    // If we still don't have a valid count, use the default
    if (holdersCount === 0) {
      holdersCount = 4721;
    }
    
    // Format the number without the "+" at the end
    return formatNumber(holdersCount);
  } catch (error) {
    console.error('Error fetching holders data:', error);
    // Return the default value as fallback without the "+"
    return formatNumber(4721);
  }
};

export const getMarketCap = async (): Promise<string> => {
  try {
    const apiUrl = 'https://api.dexscreener.com/latest/dex/pairs/solana/fo7vnhaddvnmx4axjo7cc1wwb9ko2pk2dfdzl3dybxkp';
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const pairData = data.pair || (data.pairs && data.pairs.length > 0 ? data.pairs[0] : null);
    
    if (pairData?.fdv) {
      const marketCapValue = parseFloat(pairData.fdv);
      return formatCurrency(marketCapValue);
    }
    
    return '$1.8B+'; // Fallback value
  } catch (error) {
    console.error('Error fetching market cap from DEXScreener:', error);
    return '$1.8B+'; // Fallback value
  }
};
