'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <Link href="/" className={styles.logo} onClick={closeMenu}>
                    <span className={styles.logoIcon}>🍲</span>
                    <span className={styles.logoText}>Cantate Kitchen</span>
                </Link>

                <div
                    className={`${styles.mobileBackdrop} ${isMenuOpen ? styles.backdropOpen : ''}`}
                    onClick={closeMenu}
                />

                <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <Link href="/" className={styles.navLink} onClick={closeMenu}>
                        Home
                    </Link>
                    <Link href="/menu" className={styles.navLink} onClick={closeMenu}>
                        Menu
                    </Link>
                    <Link href="/about" className={styles.navLink} onClick={closeMenu}>
                        About
                    </Link>
                    <Link
                        href="/order"
                        className={`btn btn-accent ${styles.orderBtn}`}
                        onClick={closeMenu}
                    >
                        Order Now
                    </Link>
                </nav>

                <button
                    className={styles.menuToggle}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </header>
    );
}
