import Image from 'next/image';
import { Product } from '@/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const formatPrice = (price?: number) => {
        if (!price) return 'Price varies';
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(price);
    };

    return (
        <div className={`card ${styles.productCard}`}>
            <div className={styles.imageContainer}>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.productImage}
                />
                {!product.available && (
                    <div className={styles.unavailableBadge}>Currently Unavailable</div>
                )}
            </div>
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productFooter}>
                    <span className={styles.productPrice}>{formatPrice(product.price)}</span>
                    {product.available && (
                        <span className={styles.availableBadge}>✓ Available</span>
                    )}
                </div>
            </div>
        </div>
    );
}
