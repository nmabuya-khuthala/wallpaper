import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts, getRelatedProducts } from '@/lib/data/products';
import { getReviewsForProduct } from '@/lib/data/reviews';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { ProductSchema, BreadcrumbSchema } from '@/components/seo/StructuredData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: product.images[0]
        ? [{ url: product.images[0].url, alt: product.images[0].alt }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product);
  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Shop', url: '/shop' },
          { name: product.name, url: `/shop/${product.slug}` },
        ]}
      />
      <ProductDetailClient
        product={product}
        reviews={reviews}
        relatedProducts={related}
      />
    </>
  );
}
