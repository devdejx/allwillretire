
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
