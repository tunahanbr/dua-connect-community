/**
 * Utility functions for handling category names consistently across the application
 */

/**
 * Normalizes a category string by removing any "category." prefix and converting to lowercase
 * 
 * @param {string|undefined} category - The category string to normalize
 * @returns {string} - The normalized category
 */
export const normalizeCategory = (category) => {
    if (!category) return 'uncategorized';
    
    // Remove any case variants of "category." prefix
    return category.toLowerCase().replace(/^category\./i, '');
  };
  
  /**
   * Gets a display-ready category name from a raw database category
   * 
   * @param {string|undefined} category - The raw category from the database
   * @returns {string} - Clean category name for UI display
   */
  export const getCategoryDisplayName = (category) => {
    if (!category) return '';
    
    const normalizedCategory = normalizeCategory(category);
    
    // Capitalize first letter for display purposes
    return normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1);
  };
  
  export default {
    normalizeCategory,
    getCategoryDisplayName
  };