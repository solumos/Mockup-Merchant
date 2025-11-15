import { products } from '../../data/products'
import ProductDetailClient from './ProductDetailClient'
import './ProductDetail.css'

export default function ProductDetail({ params }) {
  const product = products.find(p => p.id === parseInt(params.id))
  return <ProductDetailClient product={product} />
}

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

// Generate metadata for SEO
export function generateMetadata({ params }) {
  const product = products.find(p => p.id === parseInt(params.id))
  
  if (!product) {
    return {
      title: 'Product Not Found | Cozy Knits Co.'
    }
  }

  return {
    title: `${product.name} - $${product.price.toFixed(2)} | Cozy Knits Co.`,
    description: `${product.description} Available in ${product.colors.length} colors and all sizes. Rated ${product.rating}/5 stars.`,
    openGraph: {
      title: `${product.name} - $${product.price.toFixed(2)}`,
      description: product.description,
      images: [product.image],
    },
  }
}

