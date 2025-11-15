'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../../context/CartContext'

export default function ProductDetailClient({ product }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!product) {
    return (
      <div className="container">
        <div className="error">Product not found</div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color')
      return
    }

    console.log('Adding to cart:', { product, selectedSize, selectedColor, quantity })
    addToCart(product, selectedSize, selectedColor, quantity)
    console.log('Added to cart successfully')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <main className="product-detail">
      <div className="container">
        <button onClick={() => router.push('/')} className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Shop
        </button>

        {showSuccess && (
          <div className="success-notification">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Added to cart!
          </div>
        )}

        <div className="product-detail-grid">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="main-product-image" />
          </div>

          <div className="product-info-section">
            <div className="product-header">
              <p className="product-category-tag">{product.category}</p>
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating-detail">
                <div className="stars-large">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-detail-text">
                  {product.rating} out of 5 ({product.reviews} reviews)
                </span>
              </div>

              <p className="product-price-large">${product.price.toFixed(2)}</p>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Premium Quality</span>
              </div>
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                <span>Free Shipping Over $150</span>
              </div>
              <div className="feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                </svg>
                <span>30-Day Returns</span>
              </div>
            </div>

            <div className="selection-section">
              <div className="size-selector">
                <label className="selector-label">
                  Size: {selectedSize && <span className="selected-value">{selectedSize}</span>}
                </label>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="color-selector">
                <label className="selector-label">
                  Color: {selectedColor && <span className="selected-value">{selectedColor}</span>}
                </label>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                      title={color}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-selector">
                <label className="selector-label">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-button"
                  >
                    −
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-large"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

