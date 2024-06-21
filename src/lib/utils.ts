import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { parseISO, format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateFormat(dateStr: Date | string) {
  const date = typeof dateStr === "string" ? parseISO(dateStr) : dateStr

  return format(date, "do MMMM yyyy, h:mm a")
}
