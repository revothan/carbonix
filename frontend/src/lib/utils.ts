import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date)
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function truncateString(str: string, maxLength: number = 25): string {
  if (str.length <= maxLength) return str
  return `${str.substring(0, maxLength)}...`
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export function getInitials(name: string): string {
  if (!name) return ""
  
  const parts = name.trim().split(" ")
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}
