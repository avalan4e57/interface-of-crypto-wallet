export function hasProp<T>(
  obj: T,
  key: string
): obj is T & Record<string, unknown> {
  return typeof obj === "object" && obj !== null && key in obj;
}
