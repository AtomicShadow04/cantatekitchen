import { Product } from '@/types';

export const products: Product[] = [
    {
        id: 'moimoi-classic',
        name: 'Classic Moimoi',
        description: 'Traditional Nigerian steamed bean pudding made with fresh beans, peppers, and spices.',
        price: 600,
        image: '/images/moimoi-classic.jpg',
        category: 'main',
        available: true,
    },
    {
        id: 'moimoi-fish',
        name: 'Moimoi with Fish',
        description: 'Our signature moimoi enriched with tender pieces of fresh fish.',
        price: 800,
        image: '/images/moimoi-fish.jpg',
        category: 'main',
        available: true,
    },
    {
        id: 'moimoi-egg',
        name: 'Moimoi with Egg',
        description: 'Classic moimoi with a perfectly cooked egg inside.',
        price: 1000,
        image: '/images/moimoi-egg.jfif',
        category: 'main',
        available: true,
    },
    {
        id: 'moimoi-fish-egg',
        name: 'Moimoi with Fish & Egg',
        description: 'The ultimate experience loaded with both fish and egg.',
        price: 1200,
        image: '/images/moimoi-fish-egg.jfif',
        category: 'main',
        available: true,
    },
    {
        id: 'jollof-rice',
        name: 'Jollof Rice',
        description: 'The legendary Nigerian jollof rice - perfectly seasoned rice cooked in a rich tomato sauce with aromatic spices.',
        price: 2500,
        image: '/images/jollof-rice.jpg',
        category: 'main',
        available: true,
    },
    {
        id: 'jollof-chicken',
        name: 'Jollof Rice with Chicken',
        description: 'Our famous jollof rice served with succulent grilled chicken. A complete meal!',
        price: 3500,
        image: '/images/jollof-chicken.jpg',
        category: 'main',
        available: true,
    },
    {
        id: 'fried-rice',
        name: 'Fried Rice',
        description: 'Colorful Nigerian-style fried rice with mixed vegetables, liver, and aromatic seasonings.',
        price: 2700,
        image: '/images/fried-rice.jfif',
        category: 'main',
        available: true,
    },
    {
        id: 'fried-chicken',
        name: 'Fried Rice with Chicken',
        description: 'Colorful Nigerian-style fried rice with mixed vegetables, liver, and aromatic seasonings.',
        price: 3800,
        image: '/images/fried-rice-chicken.jfif',
        category: 'main',
        available: true,
    },
    {
        id: 'fried-plantain',
        name: 'Fried Plantain',
        description: 'Sweet, caramelized fried plantain. Perfect as a side or snack.',
        price: 1500,
        image: '/images/fried-plantain.jpg',
        category: 'side',
        available: true,
    },
    {
        id: 'chicken',
        name: 'Grilled Chicken',
        description: 'Grilled chicken with fresh vegetables and aromatic seasonings.',
        price: 1500,
        image: '/images/grilled-chicken.jfif',
        category: 'side',
        available: true,
    },
    {
        id: 'fish',
        name: 'Fish',
        description: 'Fresh fish with fresh vegetables and aromatic seasonings.',
        price: 1700,
        image: '/images/grilled-fish.jfif',
        category: 'side',
        available: true,
    },
    {
        id: 'turkey',
        name: 'Signature Grilled Turkey',
        description: 'Signature grilled turkey with fresh vegetables and aromatic seasonings.',
        price: 4000,
        image: '/images/grilled-turkey.jfif',
        category: 'side',
        available: true,
    },
    {
        id: 'small-coleslaw',
        name: 'Small Coleslaw',
        description: 'Fresh, creamy coleslaw made with crisp cabbage and carrots.',
        price: 500,
        image: '/images/coleslaw.jfif',
        category: 'side',
        available: true,
    },
    {
        id: 'large-coleslaw',
        name: 'Large Coleslaw',
        description: 'Fresh, creamy coleslaw made with crisp cabbage and carrots.',
        price: 1000,
        image: '/images/coleslaw.jfif',
        category: 'side',
        available: true,
    }

];

export const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
    return products.filter(product => product.category === category);
};

export const getAvailableProducts = (): Product[] => {
    return products.filter(product => product.available);
};
