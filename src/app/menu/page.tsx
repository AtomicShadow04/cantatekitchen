import ProductCard from '@/components/ProductCard';
import { products, getProductsByCategory, getAvailableProducts } from '@/lib/products';
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Our Menu - Cantate Kitchen',
    description: 'Explore our diverse menu of Nigerian delicacies including Moimoi, Jollof Rice, Fried Rice, and more.',
};

export default function MenuPage() {
    const mainDishes = getProductsByCategory('main');
    const sideDishes = getProductsByCategory('side');
    const specials = getProductsByCategory('special');

    return (
        <div className="container section">
            <div className={styles.header}>
                <h1 className={styles.title}>Our Menu</h1>
                <p className={styles.description}>
                    Authentic flavors, traditional recipes, unforgettable taste.
                </p>
            </div>

            <div className={styles.menuSection}>
                <h2 className={styles.categoryTitle}>Main Dishes</h2>
                <div className={styles.productsGrid}>
                    {mainDishes.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <div className={styles.menuSection}>
                <h2 className={styles.categoryTitle}>Sides & Extras</h2>
                <div className={styles.productsGrid}>
                    {sideDishes.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* <div className={styles.menuSection}>
                <h2 className={styles.categoryTitle}>Family & Party Specials</h2>
                <div className={styles.productsGrid}>
                    {specials.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div> */}
        </div>
    );
}
