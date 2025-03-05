// File: pages/store/products/index.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { 
  Grid, 
  List, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Filter, 
  SlidersHorizontal 
} from 'lucide-react';
import { productService } from '../../../services/product.service';
import { categoryService } from '../../../services/category.service';
import { ProductDto, CategoryDto } from '../../../types/haworks.types';
import ProductGrid from '../../../components/catalog/ProductGrid';
import MainLayout from '../../../components/layouts/MainLayout';
import styles from '../../../styles/store/ProductCatalog.module.css';

const ProductCatalogPage = () => {
  const router = useRouter();
  
  // State for products data
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gridView, setGridView] = useState(true);
  
  // Get query parameters from URL
  useEffect(() => {
    const { 
      q, 
      category, 
      sort, 
      page: pageParam, 
      view,
      minPrice,
      maxPrice
    } = router.query;
    
    if (q) setSearchTerm(q as string);
    if (category) setCategoryId(category as string);
    if (sort) setSortOption(sort as string);
    if (pageParam) setPage(parseInt(pageParam as string, 10));
    if (view) setGridView(view === 'grid');
    
    if (minPrice && maxPrice) {
      setPriceRange([
        parseInt(minPrice as string, 10),
        parseInt(maxPrice as string, 10)
      ]);
    }
  }, [router.query]);
  
  // Fetch products when parameters change
  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, categoryId, sortOption, priceRange]);
  
  // Fetch categories for the sidebar filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryService.getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    };
    
    fetchCategories();
  }, []);
  
  // Fetch products with the current filters
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters = {
        page,
        pageSize,
        search: searchTerm,
        category: categoryId,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        sort: sortOption
      };
      
      const result = await productService.getProducts(filters);
      
      setProducts(result.items);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search parameters
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        q: searchTerm,
        page: 1 // Reset to first page when searching
      }
    }, undefined, { shallow: true });
    
    fetchProducts();
  };
  
  // Handle category filter change
  const handleCategoryChange = (categoryId: string) => {
    setCategoryId(categoryId);
    
    // Update URL with category parameter
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        category: categoryId,
        page: 1 // Reset to first page when changing category
      }
    }, undefined, { shallow: true });
  };
  
  // Handle sort option change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    
    // Update URL with sort parameter
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort: option
      }
    }, undefined, { shallow: true });
  };
  
  // Handle price range filter
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    
    // Update URL with price range parameters
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        minPrice: range[0],
        maxPrice: range[1],
        page: 1 // Reset to first page when changing price range
      }
    }, undefined, { shallow: true });
  };
  
  // Handle view toggle (grid/list)
  const handleViewToggle = (grid: boolean) => {
    setGridView(grid);
    
    // Update URL with view parameter
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        view: grid ? 'grid' : 'list'
      }
    }, undefined, { shallow: true });
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    
    // Update URL with page parameter
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: newPage
      }
    }, undefined, { shallow: true });
    
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle add to cart
  const handleAddToCart = (productId: string) => {
    // This would integrate with your cart service
    console.log(`Adding product ${productId} to cart`);
    alert(`Product added to cart!`);
  };
  
  // Handle add to wishlist
  const handleAddToWishlist = (productId: string) => {
    // This would integrate with your wishlist service
    console.log(`Adding product ${productId} to wishlist`);
    alert(`Product added to wishlist!`);
  };
  
  // Get category name for display
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'All Products';
  };
  
  // Calculate page indicators for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page
      pageNumbers.push(1);
      
      // Calculate start and end pages to show
      let startPage = Math.max(2, page - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 3);
      
      // Adjust if at the ends
      if (endPage - startPage < maxPagesToShow - 3) {
        startPage = Math.max(2, totalPages - maxPagesToShow + 2);
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push(-2); // -2 represents ellipsis
      }
      
      // Always show the last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  return (
    <MainLayout>
      <Head>
        <title>
          {categoryId ? getCategoryName(categoryId) : 'All Products'} | Your Store
        </title>
        <meta 
          name="description" 
          content={`Browse our collection of ${categoryId ? getCategoryName(categoryId).toLowerCase() : 'products'} and find the perfect items for your needs.`} 
        />
      </Head>
      
      <div className={styles.catalogContainer}>
        {/* Header Section */}
        <div className={styles.catalogHeader}>
          <h1 className={styles.catalogTitle}>
            {categoryId ? getCategoryName(categoryId) : 'All Products'}
          </h1>
          
          <div className={styles.catalogControls}>
            <button 
              className={styles.filterToggle}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <SlidersHorizontal size={20} />
              <span>{filtersOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
            
            <div className={styles.viewToggle}>
              <button 
                className={`${styles.viewButton} ${gridView ? styles.active : ''}`}
                onClick={() => handleViewToggle(true)}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button 
                className={`${styles.viewButton} ${!gridView ? styles.active : ''}`}
                onClick={() => handleViewToggle(false)}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Catalog Content */}
        <div className={styles.catalogContent}>
          {/* Filters Sidebar */}
          <aside className={`${styles.filterSidebar} ${filtersOpen ? styles.open : ''}`}>
            <div className={styles.filterSection}>
              <h3 className={styles.filterHeading}>Search</h3>
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <div className={styles.searchInput}>
                  <Search size={18} className={styles.searchIcon} />
                  <input 
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button type="submit" className={styles.searchButton}>
                  Search
                </button>
              </form>
            </div>
            
            <div className={styles.filterSection}>
              <h3 className={styles.filterHeading}>Categories</h3>
              <ul className={styles.categoryList}>
                <li 
                  className={`${styles.categoryItem} ${!categoryId ? styles.active : ''}`}
                  onClick={() => handleCategoryChange('')}
                >
                  All Products
                </li>
                {categories.map((category) => (
                  <li 
                    key={category.id}
                    className={`${styles.categoryItem} ${categoryId === category.id ? styles.active : ''}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.filterSection}>
              <h3 className={styles.filterHeading}>Price Range</h3>
              <div className={styles.priceFilter}>
                <div className={styles.priceInputs}>
                  <input 
                    type="number"
                    min="0"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange([parseInt(e.target.value, 10), priceRange[1]])}
                    className={styles.priceInput}
                  />
                  <span className={styles.priceSeparator}>to</span>
                  <input 
                    type="number"
                    min="0"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value, 10)])}
                    className={styles.priceInput}
                  />
                </div>
                <div className={styles.priceSlider}>
                  <input 
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange([parseInt(e.target.value, 10), priceRange[1]])}
                    className={styles.rangeSlider}
                  />
                  <input 
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value, 10)])}
                    className={styles.rangeSlider}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.filterSection}>
              <h3 className={styles.filterHeading}>Sort By</h3>
              <select 
                className={styles.sortSelect}
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </aside>
          
          {/* Product Grid */}
          <main className={styles.productsArea}>
            {/* Active Filters */}
            <div className={styles.activeFilters}>
              {categoryId && (
                <div className={styles.filterBadge}>
                  <span>Category: {getCategoryName(categoryId)}</span>
                  <button onClick={() => handleCategoryChange('')}>×</button>
                </div>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                <div className={styles.filterBadge}>
                  <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
                  <button onClick={() => handlePriceRangeChange([0, 1000])}>×</button>
                </div>
              )}
              
              {searchTerm && (
                <div className={styles.filterBadge}>
                  <span>Search: "{searchTerm}"</span>
                  <button onClick={() => {
                    setSearchTerm('');
                    
                    // Update URL by removing search parameter
                    const query = { ...router.query };
                    delete query.q;
                    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
                    
                    fetchProducts();
                  }}>×</button>
                </div>
              )}
              
              {(categoryId || priceRange[0] > 0 || priceRange[1] < 1000 || searchTerm) && (
                <button 
                  className={styles.clearFiltersButton}
                  onClick={() => {
                    setCategoryId('');
                    setPriceRange([0, 1000]);
                    setSearchTerm('');
                    
                    // Reset URL parameters
                    router.push({ pathname: router.pathname }, undefined, { shallow: true });
                    
                    fetchProducts();
                  }}
                >
                  Clear All Filters
                </button>
              )}
            </div>
            
            {/* Sort and view on mobile */}
            <div className={styles.mobileControls}>
              <div className={styles.mobileSortDropdown}>
                <label htmlFor="mobileSort">Sort by: </label>
                <select 
                  id="mobileSort"
                  className={styles.mobileSort}
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {/* Product grid using the ProductGrid component */}
            <ProductGrid 
              products={products}
              loading={loading}
              variant="default"
              columns={gridView ? 3 : 2}  
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
            
            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>
                <p>{error}</p>
                <button onClick={fetchProducts} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}
            
            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className={styles.emptyState}>
                <h3>No Products Found</h3>
                <p>We couldn't find any products matching your criteria.</p>
                <p>Try adjusting your filters or search terms.</p>
              </div>
            )}
            
            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className={styles.pagination}>
                <button 
                  className={`${styles.pageButton} ${page === 1 ? styles.disabled : ''}`}
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                
                <div className={styles.pageNumbers}>
                  {getPageNumbers().map((pageNum, index) => (
                    pageNum < 0 ? (
                      // Render ellipsis
                      <span key={`ellipsis-${index}`} className={styles.ellipsis}>...</span>
                    ) : (
                      // Render page number
                      <button
                        key={pageNum}
                        className={`${styles.pageNumber} ${page === pageNum ? styles.currentPage : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}
                </div>
                
                <button 
                  className={`${styles.pageButton} ${page === totalPages ? styles.disabled : ''}`}
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductCatalogPage;