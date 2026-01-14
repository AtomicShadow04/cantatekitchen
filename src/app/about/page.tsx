import { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'About Us - Cantate Kitchen',
    description: 'Learn about the story behind Cantate Kitchen and our passion for authentic Nigerian cuisine.',
};

export default function AboutPage() {
    return (
        <div className="container section">
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>Our Story</h1>
                    <p className={styles.subtitle}>
                        Bringing the authentic taste of Nigeria to your table, one plate at a time.
                    </p>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.grid}>
                    <div className={styles.textContent}>
                        <h2>Passion for Tradition</h2>
                        <p>
                            At Cantate Kitchen, we believe that food is more than just sustenance—it's a celebration
                            of culture, tradition, and community. Founded with a passion for authentic Nigerian
                            flavors, we strive to preserve the culinary heritage of our homeland while delivering
                            exceptional quality in every dish.
                        </p>
                        <p>
                            Our signature Moimoi is made using time-honored techniques, ensuring that specific
                            taste and texture that brings back memories of home. Whether it's our smoky Jollof
                            Rice or our rich soups, every meal is prepared with fresh, locally sourced ingredients
                            and a lot of love.
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/moimoi-classic.jpg"
                                alt="Cantate Kitchen Cooking"
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>

                <div className={`${styles.grid} ${styles.reverseGrid}`}>
                    <div className={styles.textContent}>
                        <h2>Our Promise</h2>
                        <p>
                            Quality and hygiene are our top priorities. We prepare our meals in a clean,
                            modern kitchen, adhering to strict food safety standards. When you order from
                            Cantate Kitchen, you're not just getting food—you're getting a promise of
                            excellence, freshness, and authentic taste.
                        </p>
                        <ul className={styles.valuesList}>
                            <li>Fresh Ingredients Daily</li>
                            <li>Authentic Traditional Recipes</li>
                            <li>Hygienic Preparation</li>
                            <li>Prompt Delivery</li>
                        </ul>
                    </div>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/images/jollof-rice.jpg"
                                alt="Fresh Ingredients"
                                fill
                                className={styles.image}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
