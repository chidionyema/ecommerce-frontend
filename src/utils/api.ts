import { getSession } from 'next-auth/react';

/**
 * Base API URL
 */
export const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.local.ritualworks.com';

/**
 * Helper function for making authenticated API requests
 */
export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const session = await getSession();
  
  // Create a proper headers object
  const headersObj = new Headers(options.headers);
  headersObj.set('Content-Type', 'application/json');
  
  // Add auth header if we have a session
  if (session?.accessToken) {
    headersObj.set('Authorization', `Bearer ${session.accessToken}`);
  }
  
  const config = {
    ...options,
    headers: headersObj,
    credentials: 'include' as RequestCredentials,
  };
  
  return fetch(`${API_URL}${endpoint}`, config);
}

/**
 * Handles API errors in a standardized way
 */
export async function handleApiResponse(response: Response) {
  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(
        errorData.message || 
        errorData.error || 
        `API Error: ${response.statusText} (${response.status})`
      );
    } catch (parseError) {
      // If parsing fails, throw a generic error with status
      throw new Error(`API Error: ${response.statusText} (${response.status})`);
    }
  }
  
  // For successful responses, return the parsed JSON
  return response.json();
}