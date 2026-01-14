import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.heroContainer}`}>
                <div className={styles.heroContent}>
                    <h1 className={`${styles.heroTitle} animate-fade-in`}>
                        Authentic Nigerian Cuisine
                        <span className={styles.highlight}> Made with Love</span>
                    </h1>
                    <p className={`${styles.heroDescription} animate-fade-in`}>
                        Experience the rich flavors of Nigeria with our signature moimoi, legendary jollof rice,
                        and traditional delicacies. Fresh ingredients, authentic recipes, delivered to your door.
                    </p>
                    <div className={`${styles.heroButtons} animate-fade-in`}>
                        <Link href="/order" className="btn btn-accent btn-lg">
                            Order Now
                        </Link>
                        <Link href="/menu" className="btn btn-outline btn-lg">
                            View Menu
                        </Link>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.floatingCard}>
                            <span className={styles.emoji}>🍲</span>
                            <span>Fresh Daily</span>
                        </div>
                        <div className={`${styles.floatingCard} ${styles.card2}`}>
                            <span className={styles.emoji}>⭐</span>
                            <span>Authentic</span>
                        </div>
                        <div className={`${styles.floatingCard} ${styles.card3}`}>
                            <span className={styles.emoji}>🚚</span>
                            <span>Fast Delivery</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
