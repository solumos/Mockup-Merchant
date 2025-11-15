import Link from 'next/link'
import '../Cart.css'

export default function Cart({ cart, updateQuantity, removeItem, onClose, cartTotal }) {
  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-panel">
        <div className="cart-header">
          <h2>Shopping Cart ({cart.length})</h2>
          <button onClick={onClose} className="close-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>Your cart is empty</p>
            <button onClick={onClose} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-options">
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="cart-qty-button"
                      >
                        −
                      </button>
                      <span className="cart-qty-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="cart-qty-button"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.id, item.size, item.color)}
                      className="remove-button"
                      title="Remove item"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>{cartTotal >= 150 ? 'FREE' : '$9.99'}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${(cartTotal >= 150 ? cartTotal : cartTotal + 9.99).toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" onClick={onClose} className="btn btn-accent checkout-button">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}

