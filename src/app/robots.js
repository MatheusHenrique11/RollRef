export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rollref.com.br';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/vendedores/dashboard', '/vendedores/nova-publicacao'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
