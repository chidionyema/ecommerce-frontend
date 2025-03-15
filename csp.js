// csp.ts

/**
 * Content Security Policy configuration
 */

/**
 * Returns the Content Security Policy for normal operation
 */
// csp.ts
export function getCSP() {
  return `
    default-src 'self';
    script-src 
      'self'
      'wasm-unsafe-eval'   # Explicitly allow WebAssembly
      'unsafe-eval'        # Fallback for broader compatibility
      'unsafe-inline'      # Required for Next.js development
      https://cdnjs.cloudflare.com 
      https://cdn.jsdelivr.net 
      https://js.stripe.com 
      https://www.google.com 
      https://www.gstatic.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https://*.cloudfront.net;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 
      'self' 
      https://*.glustack.com 
      https://api.glustack.com 
      https://api.stripe.com 
      https://ritualworks.com 
      https://api.local.ritualworks.com 
      http://localhost:*
      https://localhost:*;
    frame-src 
      'self' 
      https://js.stripe.com 
      https://hooks.stripe.com 
      https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    worker-src 'self' blob:;
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim();
}

/**
 * Returns the Content Security Policy for report-only mode
 * Uses same policies as main CSP but adds reporting endpoint
 */
export function getReportOnlyCSP() {
  // In development, don't use report-only CSP to prevent warnings
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // Use the same policies as main CSP but add reporting
  return `
    ${getCSP()}
    report-uri https://csp-reports.glustack.com/report;
  `.replace(/\s+/g, ' ').trim();
}