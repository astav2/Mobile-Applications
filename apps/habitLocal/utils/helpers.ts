export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
