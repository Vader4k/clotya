
interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  next?: NextFetchRequestConfig;
}

const BASE_URL = typeof window === "undefined" ? (process.env.NEXT_PUBLIC_API_URL || "") : "/api";

/**
 * A simplified native fetch wrapper for Next.js server-side data fetching.
 * Optimized for GET requests as per current project requirements.
 */
export const baseFetch = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const { params, headers, ...rest } = options;

  let fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      fullUrl += (fullUrl.includes("?") ? "&" : "?") + queryString;
    }
  }

  const response = await fetch(fullUrl, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    const error = new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`);
    // Attach error data for the error handler without using 'any'
    Object.assign(error, { response: { data: errorData, status: response.status } });
    throw error;
  }

  return response.json();
};

export const fetcher = {
  get: <T>(url: string, options?: FetchOptions) => 
    baseFetch<T>(url, { ...options, method: "GET" }),
};
