import Link from 'next/link'
import './Header.css'

export default function Header({ cartItemCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-content">
          <Link href="/" className="logo">
            <h1>Cozy Knits Co.</h1>
            <p className="tagline">Premium Men's Sweaters</p>
          </Link>
          
          <nav className="header-nav">
            <Link href="/" className="nav-link">Shop</Link>
            <button onClick={onCartClick} className="cart-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className="cart-text">Cart</span>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>
          </nav>
        </div>
      </div>
      
      <div className="header-banner">
        <div className="container">
          <p>🎉 Free Shipping on Orders Over $150 • 30-Day Returns • Premium Quality Guaranteed</p>
        </div>
      </div>
    </header>
  )
}

