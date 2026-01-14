import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { products } from '@/lib/products';
import { FaUtensils, FaTruck, FaHeart, FaStar } from 'react-icons/fa';
import styles from './page.module.css';

export default function Home() {
  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="section" style={{ background: 'var(--color-background)' }}>
        <div className="container">
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FaUtensils />
              </div>
              <h3>Authentic Recipes</h3>
              <p>Traditional Nigerian recipes passed down through generations</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FaHeart />
              </div>
              <h3>Fresh Ingredients</h3>
              <p>Only the finest, freshest ingredients in every dish</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FaTruck />
              </div>
              <h3>Fast Delivery</h3>
              <p>Hot, delicious food delivered right to your doorstep</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <FaStar />
              </div>
              <h3>Quality Guaranteed</h3>
              <p>Every meal prepared with care and attention to detail</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Signature Dishes</h2>
            <p className={styles.sectionDescription}>
              Discover the flavors that make Cantate Kitchen special
            </p>
          </div>
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.viewAllContainer}>
            <Link href="/menu" className="btn btn-primary btn-lg">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Experience Authentic Nigerian Cuisine?</h2>
            <p>Place your order now and taste the difference!</p>
            <Link href="/order" className="btn btn-accent btn-lg">
              Order Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
