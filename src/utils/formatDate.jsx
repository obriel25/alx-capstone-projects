/**
 * Format date to readable string
 */
export function formatDate(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return d.toLocaleDateString('en-US', options);
}

/**
 * Format date for storage (ISO string)
 */
export function getCurrentDateISO() {
  return new Date().toISOString();
}