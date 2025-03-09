// File: pages/admin/catalog/products/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Search, Filter, PlusCircle, Edit, Trash2, MoreVertical, 
  ChevronDown, CheckCircle, XCircle, Download, Upload 
} from 'lucide-react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import Modal from '../../../../components/admin/Modal';
import { productService } from '../../../../services/product.service';
import { categoryService } from '../../../../services/category.service';
import { ProductDto, CategoryDto } from '../../../../types/haworks.types';
import styles from '../../../../styles/admin/ProductsPage.module.css';

// Define column definition for the table
interface Column {
  id: string;
  label: string;
  sortable: boolean;
  width?: string;
}

const ProductsPage: React.FC = () => {
  const router = useRouter();
  
  // State for products data
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  
  // State for selection and bulk actions
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  
  // State for deletion confirmation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductDto | null>(null);
  
  // Define table columns
  const columns: Column[] = [
    { id: 'name', label: 'Product Name', sortable: true },
    { id: 'categoryId', label: 'Category', sortable: true },
    { id: 'unitPrice', label: 'Price', sortable: true, width: '120px' },
    { id: 'stock', label: 'Stock', sortable: true, width: '100px' },
    { id: 'isInStock', label: 'Status', sortable: true, width: '120px' },
    { id: 'actions', label: 'Actions', sortable: false, width: '120px' },
  ];
  
  // Load products on initial render and when filters/sort/pagination changes
  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, categoryFilter, sortField, sortDirection]);
  
  // Load categories for filter
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
  
  // Fetch products with current filters/sort/pagination
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters = {
        page,
        pageSize,
        search: searchTerm,
        category: categoryFilter,
        sort: `${sortField}-${sortDirection}`
      };
      
      const result = await productService.getProducts(filters);
      
      setProducts(result.items);
      setTotalProducts(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, searchTerm, categoryFilter, sortField, sortDirection]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    fetchProducts();
  };
  
  // Handle sorting
  const handleSort = (columnId: string) => {
    if (columnId === sortField) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending
      setSortField(columnId);
      setSortDirection('asc');
    }
  };
  
  // Handle bulk selection
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(products.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };
  
  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };
  
  // Handle bulk actions
  const handleBulkAction = async (action: string) => {
    if (selectedProducts.length === 0) return;
    
    try {
      switch (action) {
        case 'delete':
          await productService.bulkDeleteProducts(selectedProducts);
          // Refresh products
          fetchProducts();
          break;
          
        case 'activate':
          await productService.bulkUpdateProducts(selectedProducts, { isInStock: true });
          fetchProducts();
          break;
          
        case 'deactivate':
          await productService.bulkUpdateProducts(selectedProducts, { isInStock: false });
          fetchProducts();
          break;
          
        default:
          console.warn(`Unknown bulk action: ${action}`);
      }
      
      // Clear selection after action
      setSelectedProducts([]);
      setBulkActionOpen(false);
    } catch (err) {
      console.error(`Error performing bulk action ${action}:`, err);
      setError(`Failed to perform bulk action: ${action}`);
    }
  };
  
  // Handle single product deletion
  const confirmDelete = (product: ProductDto) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };
  
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      await productService.deleteProduct(productToDelete.id);
      
      // Refresh products
      fetchProducts();
      
      // Close modal and reset product to delete
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };
  
  return (
    <AdminLayout title="Products">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Products</h1>
        <Link href="/admin/catalog/products/new">
          <button className={styles.addButton}>
            <PlusCircle size={16} className={styles.buttonIcon} />
            Add Product
          </button>
        </Link>
      </div>
      
      <div className={styles.pageContent}>
        {/* Search and Filters */}
        <div className={styles.filtersContainer}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
          
          <div className={styles.filtersWrapper}>
            <div className={styles.filterItem}>
              <label htmlFor="categoryFilter" className={styles.filterLabel}>Category:</label>
              <select
                id="categoryFilter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.filterItem}>
              <label htmlFor="pageSizeFilter" className={styles.filterLabel}>Show:</label>
              <select
                id="pageSizeFilter"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className={styles.filterSelect}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className={styles.bulkActionsContainer}>
            <div className={styles.selectedCount}>
              {selectedProducts.length} products selected
            </div>
            
            <div className={styles.bulkActions}>
              <div className={styles.bulkActionDropdown}>
                <button
                  className={styles.bulkActionButton}
                  onClick={() => setBulkActionOpen(!bulkActionOpen)}
                >
                  Actions <ChevronDown size={16} />
                </button>
                
                {bulkActionOpen && (
                  <div className={styles.bulkActionMenu}>
                    <button
                      className={styles.bulkActionMenuItem}
                      onClick={() => handleBulkAction('activate')}
                    >
                      <CheckCircle size={16} className={styles.bulkActionIcon} />
                      Mark as In Stock
                    </button>
                    <button
                      className={styles.bulkActionMenuItem}
                      onClick={() => handleBulkAction('deactivate')}
                    >
                      <XCircle size={16} className={styles.bulkActionIcon} />
                      Mark as Out of Stock
                    </button>
                    <button
                      className={`${styles.bulkActionMenuItem} ${styles.dangerAction}`}
                      onClick={() => handleBulkAction('delete')}
                    >
                      <Trash2 size={16} className={styles.bulkActionIcon} />
                      Delete Selected
                    </button>
                  </div>
                )}
              </div>
              
              <button
                className={styles.clearSelectionButton}
                onClick={() => setSelectedProducts([])}
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
        
        {/* Products Table */}
        <div className={styles.tableContainer}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <p>{error}</p>
              <button className={styles.retryButton} onClick={fetchProducts}>
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No products found.</p>
              <Link href="/admin/catalog/products/new">
                <button className={styles.emptyStateButton}>
                  Add Your First Product
                </button>
              </Link>
            </div>
          ) : (
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length && products.length > 0}
                      onChange={handleSelectAll}
                      className={styles.checkbox}
                    />
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.id}
                      className={`${styles.headerCell} ${column.sortable ? styles.sortable : ''}`}
                      style={column.width ? { width: column.width } : undefined}
                      onClick={() => column.sortable && handleSort(column.id)}
                    >
                      <div className={styles.headerContent}>
                        {column.label}
                        {column.sortable && column.id === sortField && (
                          <span className={styles.sortIcon}>
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={styles.tableRow}>
                    <td className={styles.checkboxCell}>
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td className={styles.nameCell}>
                      <div className={styles.productInfo}>
                        {product.contents && product.contents.length > 0 ? (
                          <div className={styles.productImage} style={{ backgroundImage: `url('${product.contents[0].url}')` }}></div>
                        ) : (
                          <div className={styles.productImagePlaceholder}>No Image</div>
                        )}
                        <div className={styles.productName}>
                          <Link href={`/admin/catalog/products/${product.id}`}>
                            <a className={styles.productLink}>{product.name}</a>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.categoryBadge}>
                        {getCategoryName(product.categoryId)}
                      </span>
                    </td>
                    <td>${product.unitPrice.toFixed(2)}</td>
                    <td>{product.stock !== undefined ? product.stock : 'N/A'}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${product.isInStock ? styles.inStock : styles.outOfStock}`}>
                        {product.isInStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <div className={styles.actionButtons}>
                        <Link href={`/admin/catalog/products/${product.id}`}>
                          <button className={`${styles.actionButton} ${styles.editButton}`} title="Edit Product">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          onClick={() => confirmDelete(product)}
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalProducts)} of {totalProducts} products
            </div>
            
            <div className={styles.paginationControls}>
              <button
                className={`${styles.paginationButton} ${page === 1 ? styles.disabled : ''}`}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(pageNum => {
                  // Show first and last page, plus pages around current page
                  return (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  );
                })
                .map((pageNum, i, array) => {
                  // Add ellipsis where there are gaps in the sequence
                  const prevPage = array[i - 1];
                  const showEllipsis = prevPage && pageNum - prevPage > 1;
                  
                  return (
                    <React.Fragment key={pageNum}>
                      {showEllipsis && (
                        <span className={styles.paginationEllipsis}>...</span>
                      )}
                      <button
                        className={`${styles.paginationPageButton} ${page === pageNum ? styles.currentPage : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}
              
              <button
                className={`${styles.paginationButton} ${page === totalPages ? styles.disabled : ''}`}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Product"
      >
        <div className={styles.deleteConfirmation}>
          <p>
            Are you sure you want to delete <strong>{productToDelete?.name}</strong>? 
            This action cannot be undone.
          </p>
          
          <div className={styles.modalActions}>
            <button
              className={styles.cancelButton}
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className={styles.deleteButton}
              onClick={handleDeleteProduct}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default ProductsPage;