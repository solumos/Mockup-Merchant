'use client'

import { useState } from 'react'
import { products, categories } from './data/products'
import ProductCard from './components/ProductCard'
import Filters from './components/Filters'
import './Home.css'

function filterProducts(category, searchTerm, sortBy) {
  let filtered = [...products]
  
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category)
  }
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    )
  }
  
  switch(sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      break
  }
  
  return filtered
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')

  const filteredProducts = filterProducts(
    selectedCategory === 'All' ? null : selectedCategory,
    searchTerm,
    sortBy
  )

  return (
    <main className="home">
      <div className="container">
        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          productCount={filteredProducts.length}
        />

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
                setSortBy('default')
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

