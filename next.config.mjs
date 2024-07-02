import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  swcMinify: true,
  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, 
  // Disable font optimization
};

export default withBundleAnalyzerConfig(nextConfig);
