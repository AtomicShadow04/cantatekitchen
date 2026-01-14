import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    {/* Brand Section */}
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerLogo}>
                            <span className={styles.logoIcon}>🍲</span>
                            Cantate Kitchen
                        </h3>
                        <p className={styles.footerDescription}>
                            Authentic Nigerian cuisine made with love. From our kitchen to your table.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="https://www.instagram.com/cantatekitchen/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.me/2347069598079" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerHeading}>Quick Links</h4>
                        <ul className={styles.footerLinks}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/menu">Menu</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/order">Order Now</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerHeading}>Contact Us</h4>
                        <ul className={styles.contactInfo}>
                            <li>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaPhone />
                                    <a href="tel:07069598079">0706 959 8079</a>

                                </div>
                            </li>
                            <li>
                                <FaEnvelope />
                                <a href="mailto:cantatekitchen@gmail.com">cantatekitchen@gmail.com</a>
                            </li>
                            <li>
                                <FaMapMarkerAlt />
                                <span>Lagos, Nigeria</span>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div className={styles.footerSection}>
                        <h4 className={styles.footerHeading}>Business Hours</h4>
                        <ul className={styles.businessHours}>
                            <li>
                                <span>Order Window</span>
                                <span>Monday - Thursday</span>
                            </li>
                            <li>
                                <span>Delivery Day</span>
                                <span>Friday</span>
                            </li>

                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className={styles.footerBottom}>
                    <p>&copy; {currentYear} Cantate Kitchen. All rights reserved.</p>
                    <p className={styles.madeWith}>
                        Made with <span className={styles.heart}>❤️</span> in Nigeria
                    </p>
                </div>
            </div>
        </footer>
    );
}
