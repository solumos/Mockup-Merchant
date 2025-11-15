'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
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
    console.log('CartContext addToCart called with:', { product, size, color, quantity })
    setCart(prevCart => {
      console.log('Previous cart:', prevCart)
      const existingItem = prevCart.find(
        item => item.id === product.id && item.size === size && item.color === color
      )

      if (existingItem) {
        console.log('Item exists, updating quantity')
        const updated = prevCart.map(item =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        console.log('Updated cart:', updated)
        return updated
      }

      console.log('Item doesn\'t exist, adding new item')
      const newCart = [...prevCart, { ...product, size, color, quantity }]
      console.log('New cart:', newCart)
      return newCart
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
    <CartContext.Provider
      value={{
        cart,
        showCart,
        setShowCart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

