'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import './globals.css'

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  const addToCart = (product, size, color, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.id === product.id && item.size === size && item.color === color
      )

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prevCart, { ...product, size, color, quantity }]
    })
  }

  const updateCartItemQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    )
  }

  const removeFromCart = (productId, size, color) => {
    setCart(prevCart =>
      prevCart.filter(
        item => !(item.id === productId && item.size === size && item.color === color)
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Premium Men's Sweaters | Cozy Knits Co.</title>
      </head>
      <body>
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
      </body>
    </html>
  )
}

