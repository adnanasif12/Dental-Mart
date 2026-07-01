'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function ProductsList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      if (!localStorage.getItem('adminToken')) {
        router.push('/admin');
      }
    };

    checkAuth();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (data.success) {
        setProducts(products.filter(p => p.id !== id));
        alert('Product deleted successfully');
      }
    } catch (error) {
      alert('Error deleting product');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Products</h1>
        <Link href="/admin/products/create" className={styles.addBtn}>
          ➕ Add New Product
        </Link>
      </header>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className={styles.noData}>No products found</p>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => {
            const getSafeImage = (img) => {
              if (!img) return '/fallback.svg';
              try {
                const u = new URL(img);
                if (u.searchParams && u.searchParams.has('text')) {
                  const t = u.searchParams.get('text');
                  u.searchParams.set('text', encodeURIComponent(t));
                  return u.toString();
                }
                return img;
              } catch (e) {
                return img || '/fallback.svg';
              }
            };

            const imgSrc = getSafeImage(product.image);

            return (
              <div key={product.id} className={styles.productCard}>
                <img
                  src={imgSrc}
                  alt={product.name}
                  className={styles.productImage}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/fallback.svg'; }}
                />
              <div className={styles.productContent}>
                <h3>{product.name}</h3>
                <p className={styles.category}>{product.category}</p>
                <p className={styles.price}>৳{product.price.toLocaleString()}</p>
                <p className={styles.rating}>⭐ {product.rating}</p>
                
                <div className={styles.actions}>
                  <Link 
                    href={`/admin/products/edit/${product.id}`}
                    className={styles.editBtn}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
