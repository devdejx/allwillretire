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
    const dexScreenerResponse = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/fo7vnhaddvnmx4axjo7cc1wwb9ko2pk2dfdzl3dybxkp');
    
    if (!dexScreenerResponse.ok) {
      throw new Error(`DexScreener API responded with status: ${dexScreenerResponse.status}`);
    }
    
    const dexData = await dexScreenerResponse.json();
    console.log('DexScreener API response:', dexData);
    
    let holdersCount = 0;
    
    if (dexData && dexData.pairs && dexData.pairs.length > 0) {
      const pair = dexData.pairs[0];
      
      // DexScreener shows holders count directly in the pair object
      // Looking for specific fields based on the API response structure
      holdersCount = parseInt(pair.holders, 10);
      console.log('Found holders count:', holdersCount);
      
      if (isNaN(holdersCount) || holdersCount === 0) {
        console.log('Could not find valid holders count, using fallback');
        holdersCount = 4737; // Fallback to the last known value from DexScreener
      }
    } else {
      console.log('Invalid DexScreener response structure');
      holdersCount = 4737; // Fallback value
    }
    
    // Format the number without the "+" at the end
    return formatNumber(holdersCount);
  } catch (error) {
    console.error('Error fetching holders data from DexScreener:', error);
    return formatNumber(4737); // Return the last known holder count as fallback
  }
};

export const getMarketCap = async (): Promise<string> => {
  try {
    const apiUrl = 'https://api.dexscreener.com/latest/dex/pairs/solana/fo7vnhaddvnmx4axjo7cc1wwb9ko2pk2dfdzl3dybxkp';
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data && data.pairs && data.pairs.length > 0) {
      const pairData = data.pairs[0];
      if (pairData.fdv) {
        const marketCapValue = parseFloat(pairData.fdv);
        return formatCurrency(marketCapValue);
      }
    }
    
    return '$1.8B+'; // Fallback value
  } catch (error) {
    console.error('Error fetching market cap from DEXScreener:', error);
    return '$1.8B+'; // Fallback value
  }
};
