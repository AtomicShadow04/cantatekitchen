import OrderForm from '@/components/OrderForm';
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Order Now - Cantate Kitchen',
    description: 'Place your order for authentic Nigerian food directly from Cantate Kitchen. Freshly prepared moimoi, jollof rice, and more.',
};

export default function OrderPage() {
    return (
        <div className="container section">
            <div className={styles.header}>
                <h1 className={styles.title}>Place Your Order</h1>
                <p className={styles.description}>
                    Select your favorite dishes and we'll deliver them fresh to your door.
                    Process is simple: fill the form, submit, and we'll contact you to confirm!
                </p>
            </div>

            <OrderForm />
        </div>
    );
}
