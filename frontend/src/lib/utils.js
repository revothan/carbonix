import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine multiple class names with Tailwind CSS
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount, currency = 'IDR', locale = 'id-ID') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date
 */
export function formatDate(date, options = {}) {
  if (!date) return '';
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString(
    undefined, 
    { ...defaultOptions, ...options }
  );
}

/**
 * Truncate a string to a specified length
 */
export function truncateString(str, maxLength = 30) {
  if (!str || str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Truncate a wallet address
 */
export function truncateAddress(address, startChars = 6, endChars = 4) {
  if (!address) return '';
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Convert a project type from snake_case to Title Case
 */
export function formatProjectType(type) {
  if (!type) return '';
  return type
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate a relative time string
 */
export function timeAgo(date) {
  if (!date) return '';
  
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  
  return 'just now';
}
