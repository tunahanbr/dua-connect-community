/**
 * Utility functions for handling category names consistently across the application
 */

/**
 * Normalizes a category string by removing any "category." or "Category." prefix and converting to lowercase
 * 
 * @param {string|undefined} category - The category string to normalize
 * @returns {string} - The normalized category
 */
export const normalizeCategory = (category) => {
  if (!category) return 'uncategorized';
  
  // Remove any case variants of "category." or "Category." prefix and convert to lowercase
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

/**
 * Gets a translated category name using the translation function
 * 
 * @param {string|undefined} category - The raw category from the database
 * @param {Function} t - The translation function from LanguageContext
 * @returns {string} - Translated category name
 */
export const getTranslatedCategory = (category, t) => {
  console.log('getTranslatedCategory called with:', { category, t });
  
  if (!category) return '';
  
  // Normalize the category name first
  const normalizedCategory = normalizeCategory(category);
  console.log('Normalized category:', normalizedCategory);
  
  // Special case for 'all'
  if (normalizedCategory === 'all') {
    const translation = t('category.all');
    console.log('Translation for all:', translation);
    return translation;
  }
  
  // Create the translation key
  const translationKey = `category.${normalizedCategory}`;
  console.log('Translation key:', translationKey);
  
  // Get the translation
  const translation = t(translationKey);
  console.log('Translation result:', {
    originalCategory: category,
    normalizedCategory,
    translationKey,
    translation
  });
  
  // If no translation is found, fallback to display name
  if (translation === translationKey) {
    return getCategoryDisplayName(normalizedCategory);
  }
  
  return translation;
};

export default {
  normalizeCategory,
  getCategoryDisplayName,
  getTranslatedCategory
};