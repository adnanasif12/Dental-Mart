'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const adminUser = localStorage.getItem('adminUser');
      const adminToken = localStorage.getItem('adminToken');

      if (!adminUser || !adminToken) {
        router.push('/admin');
        return;
      }

      setUser(JSON.parse(adminUser));
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
        setStats({
          totalProducts: data.data.length,
          totalValue: data.data.reduce((sum, p) => sum + (p.price || 0), 0)
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;

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

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Search anything..." 
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.greeting}>
              Good Evening, {user.name}! 👋
            </div>
            
            <div className={styles.headerIcons}>
              <button className={styles.iconBtn}>🔔</button>
              <button className={styles.iconBtn}>💬</button>
              <button className={styles.iconBtn}>⚙️</button>
              <button className={styles.userBtn}>
                {user.name.charAt(0)}
              </button>
            </div>
            
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.content}>
        <Dashboard />

        <div className={styles.section}>
          <h2>Recent Products</h2>
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products yet. <Link href="/admin/products/create">Create one</Link></p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td>{product.name}</td>
                    <td>৳{product.price}</td>
                    <td>{product.category}</td>
                    <td>⭐ {product.rating}</td>
                    <td>
                      <Link href={`/admin/products/edit/${product.id}`} className={styles.editBtn}>
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
