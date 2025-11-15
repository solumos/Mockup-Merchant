import Link from 'next/link'
import './ProductCard.css'

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        {product.rating >= 4.8 && (
          <span className="badge-bestseller">Bestseller</span>
        )}
      </div>
      
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}>
                ★
              </span>
            ))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        <div className="product-footer">
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="product-colors">
            {product.colors.slice(0, 4).map((color, index) => (
              <span 
                key={index} 
                className="color-dot"
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="color-more">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

