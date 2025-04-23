
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

export const extractHolders = async (data: any): Promise<string> => {
  try {
    // Fetch holders data from holderscan.com
    const response = await fetch('https://holderscan.com/_next/data/M8MiYZSGAA_sPQNxrf3Xp/token/Ai4CL1SAxVRigxQFwBH8S2JkuL7EqrdiGwTC7JpCpump.json');
    const holdersData = await response.json();
    
    // Extract holders count from the response
    const holdersCount = holdersData?.pageProps?.holders?.length || 1800;
    console.log('Holders data from holderscan:', holdersCount);
    
    return formatNumber(holdersCount) + '+';
  } catch (error) {
    console.error('Error fetching holders from holderscan:', error);
    return '1,800+'; // Fallback in case of errors
  }
};

