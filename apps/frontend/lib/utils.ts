import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const processUrlVariables = (
  url: string,
  variables: Record<string, string | number | boolean | null | undefined>
) => {
  let processedUrl = url;
  const values = { ...variables };
  const query =
    values.query &&
      typeof values.query === "object" &&
      !Array.isArray(values.query)
      ? {
        ...(values.query as Record<
          string,
          string | number | boolean | null | undefined
        >),
      }
      : {};
  delete values.query;

  Object.keys(values).forEach((key) => {
    processedUrl = processedUrl.replace(`:${key}`, String(variables[key]));
  });

  if (query) {
    // Remove undefined and null values, and convert all to strings
    Object.keys(query).forEach((key) => {
      if (query[key] === undefined || query[key] === null) {
        delete query[key];
      } else {
        query[key] = String(query[key]);
      }
    });

    const queryString = new URLSearchParams(
      query as Record<string, string>
    ).toString();
    if (queryString) {
      processedUrl = `${processedUrl}?${queryString}`;
    }
  }

  return processedUrl;
};