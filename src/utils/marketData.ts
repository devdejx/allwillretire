
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
    // Fetch holders data from holderscan.com
    const response = await fetch('https://holderscan.com/token/Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump');
    const text = await response.text();
    
    // Extract holders count from the HTML response using regex
    const holdersMatch = text.match(/(?:"holders":|Holders:)\s*"?(\d[\d,]*)"?/i);
    const holdersCount = holdersMatch ? parseInt(holdersMatch[1].replace(/,/g, '')) : 4721;
    
    console.log('Holders count from holderscan:', holdersCount);
    
    // Remove the "+" from the end
    return formatNumber(holdersCount);
  } catch (error) {
    console.error('Error fetching holders from holderscan:', error);
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
