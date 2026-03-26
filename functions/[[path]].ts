/**
 * Cloudflare Pages Function - Catch-all route handler
 * Enables SPA routing for React Router by serving index.html
 * 
 * This function intercepts all non-asset requests and serves index.html,
 * allowing React Router to handle client-side navigation.
 */

interface CloudflareContext {
  request: Request;
  env?: Record<string, unknown>;
  functionPath?: string;
}

export const onRequest = async (context: CloudflareContext): Promise<Response> => {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // List of static asset paths to serve directly
  const staticPatterns = [
    /^\/assets\//,
    /^\/public\//,
    /\.css$/,
    /\.js$/,
    /\.json$/,
    /\.webp$/,
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.gif$/,
    /\.svg$/,
    /\.ico$/,
    /\.txt$/,
    /^\/robots\.txt$/,
    /^\/sitemap\.xml$/,
  ];

  // Check if the request is for a static asset
  const isStaticAsset = staticPatterns.some((pattern) => pattern.test(pathname));

  if (isStaticAsset) {
    // Serve static assets with caching headers
    const response = await fetch(request);
    if (response.status === 200) {
      const newHeaders = new Headers(response.headers);
      // Cache static assets for 1 year
      newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    }
  }

  // For all other paths (SPA routes), serve index.html
  try {
    const indexResponse = await fetch(new Request(new URL('/index.html', url)));
    
    if (indexResponse.status === 200) {
      const newHeaders = new Headers(indexResponse.headers);
      // Don't cache index.html
      newHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate');
      // Enable CORS if needed
      newHeaders.set('Access-Control-Allow-Origin', '*');
      
      return new Response(indexResponse.body, {
        status: indexResponse.status,
        statusText: indexResponse.statusText,
        headers: newHeaders,
      });
    }
  } catch (error) {
    console.error('Error serving index.html:', error);
  }

  return new Response('Not Found', { 
    status: 404,
    statusText: 'Not Found',
  });
};
