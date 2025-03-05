// File: utils/errorHandling.ts
/**
 * Common error handling utility functions
 */

/**
 * Logs an error to the console and optionally to an error tracking service
 */
export function logError(error: unknown, context?: Record<string, unknown>) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error(`Error: ${errorMessage}`, {
      stack: errorStack,
      ...context,
    });
    
    // In production, you would send this to a service like Sentry
    if (process.env.NODE_ENV === 'production') {
      // Example integration with error tracking service
      // Sentry.captureException(error, { extra: context });
    }
  }
  
  /**
   * Extracts a user-friendly error message from various error types
   */
  export function getUserFriendlyErrorMessage(error: unknown): string {
    // If it's already a string, return it
    if (typeof error === 'string') return error;
    
    // If it's an Error object, use its message
    if (error instanceof Error) return error.message;
    
    // For network errors (fetch API)
    if (error instanceof Response) {
      return `Network error: ${error.status} ${error.statusText}`;
    }
    
    // For unknown error types
    return 'An unexpected error occurred. Please try again.';
  }
  
  /**
   * Handles form submission errors
   */
  export function handleFormError(
    error: unknown,
    setErrorState: (error: Record<string, string>) => void,
    fieldName = 'general'
  ): void {
    const message = getUserFriendlyErrorMessage(error);
    setErrorState({ [fieldName]: message });
    logError(error, { formField: fieldName });
  }