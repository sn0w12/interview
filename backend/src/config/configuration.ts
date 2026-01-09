export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  visualCrossing: {
    apiKey: process.env.VC_API_KEY || '',
  },
  cache: {
    ttlSeconds: parseInt(process.env.CACHE_TTL_SECONDS || '1800', 10),
  },
});
