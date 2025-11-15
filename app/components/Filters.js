import { categories } from '../data/products'
import './Filters.css'

export default function Filters({ 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm, 
  setSearchTerm,
  sortBy,
  setSortBy,
  productCount
}) {
  return (
    <div className="filters">
      <div className="filters-header">
        <h2>Shop Men's Sweaters</h2>
        <p className="product-count">{productCount} Products</p>
      </div>

      <div className="filters-controls">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search sweaters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="search-clear"
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-group">
          <label htmlFor="category-select" className="filter-label">Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-select" className="filter-label">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      <div className="category-pills">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`category-pill ${selectedCategory === 'All' ? 'active' : ''}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

