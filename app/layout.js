'use client'

import { CartProvider, useCart } from './context/CartContext'
import Header from './components/Header'
import Cart from './components/Cart'
import './globals.css'

function LayoutContent({ children }) {
  const {
    cart,
    showCart,
    setShowCart,
    updateCartItemQuantity,
    removeFromCart,
    cartItemCount,
    cartTotal,
  } = useCart()

  return (
    <div className="app">
      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setShowCart(!showCart)}
      />
      
      {showCart && (
        <Cart
          cart={cart}
          updateQuantity={updateCartItemQuantity}
          removeItem={removeFromCart}
          onClose={() => setShowCart(false)}
          cartTotal={cartTotal}
        />
      )}

      {children}
    </div>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Premium Men's Sweaters | Cozy Knits Co.</title>
      </head>
      <body>
        <CartProvider>
          <LayoutContent>{children}</LayoutContent>
        </CartProvider>
      </body>
    </html>
  )
}

