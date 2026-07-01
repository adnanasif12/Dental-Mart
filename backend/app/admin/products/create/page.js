'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'tools',
    rating: '4.5',
    image: 'https://via.placeholder.com/200?text=Product',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result || prev.image
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          rating: parseFloat(formData.rating)
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        setError(data.message || 'Error creating product');
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Create New Product</h1>
        <Link href="/admin/products" className={styles.backBtn}>
          ← Back to Products
        </Link>
      </div>

      <div className={styles.formCard}>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Dental Drill"
              required
            />
          </div>

          <div className={styles.twoColumns}>
            <div className={styles.formGroup}>
              <label>Price (৳) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 25000"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Disposables">Disposables</option>
                <option value="cleaning & Sterilization">Cleaning & Sterilization</option>
                <option value="protective & Hygiene">Protective & Hygiene</option>
                <option value="Basic clinic instruments">Basic Clinic Instruments</option>
                <option value="Mixing Items">Mixing Items</option>
                <option value="Bur Instruments">Bur Instruments</option>
                <option value="Patient Care">Patient Care</option>
                <option value="Accessories">Accessories</option>
                <option value="Rotary">Rotary</option>
                <option value="Clinic Utility">Clinic Utility</option>
                <option value="Consumables Materials">Consumables Materials</option>
                <option value="Packaging">Packaging</option>
                <option value="Storage">Storage</option>
                <option value="Major Equipment">Major Equipment</option>

              </select>
            </div>
          </div>

          <div className={styles.twoColumns}>
            <div className={styles.formGroup}>
              <label>Rating (0-5) *</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                placeholder="4.5"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <small className={styles.hint}>Select an image from your device</small>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows="5"
            ></textarea>
          </div>

          <div className={styles.preview}>
            <h3>Preview</h3>
            <div className={styles.previewCard}>
              <img src={formData.image} alt="Preview" className={styles.previewImage} />
              <div className={styles.previewInfo}>
                <h4>{formData.name || 'Product Name'}</h4>
                <p className={styles.previewCategory}>{formData.category}</p>
                <p className={styles.previewPrice}>৳{formData.price || '0'}</p>
                <p className={styles.previewRating}>⭐ {formData.rating || '0'}</p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <Link href="/admin/products" className={styles.cancelBtn}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
