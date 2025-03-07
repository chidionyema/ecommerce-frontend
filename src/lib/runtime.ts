export const isEdgeRuntime = () => 
    typeof EdgeRuntime === 'string' || 
    typeof caches !== 'undefined' || 
    process.env.NEXT_RUNTIME === 'edge';
  
  export const getRuntimeEnvironment = () => {
    if (typeof window !== 'undefined') return 'browser';
    if (isEdgeRuntime()) return 'edge';
    if (process.env.VERCEL) return 'vercel';
    if (process.env.NETLIFY) return 'netlify';
    return 'node';
  };