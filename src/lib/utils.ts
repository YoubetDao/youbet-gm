import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDateTimeString(dateTimeString: string) {
  const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
  const match = dateTimeString.match(dateTimeRegex);
  if (!match) {
    return null
  }
  const [, yearStr, monthStr, dateStr, hourStr, minuteStr] = match;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const date = parseInt(dateStr, 10);
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const parsedDate = new Date(year, month - 1, date); // month - 1 because month in Date object is 0-indexed
  const dayOfWeek = parsedDate.toLocaleDateString('en-US', { weekday: 'long' });

  return {
    hour,
    minute,
    dayOfWeek
  };
}


