import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/data/products';
import { SITE_CONFIG } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const products = getAllProducts();
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                          lastModified: now, changeFrequency: 'daily',   priority: 1.0  },
    { url: `${base}/shop`,                lastModified: now, changeFrequency: 'daily',   priority: 0.9  },
    { url: `${base}/family-portraits`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${base}/custom-design`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.8  },
    { url: `${base}/installation`,        lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/inspiration`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${base}/visualiser`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7  },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
