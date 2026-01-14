import { z } from 'zod';

// Phone number validation (Nigerian format)
const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;

// Order form validation schema
export const orderFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),

    email: z.string()
        .email('Please enter a valid email address'),

    phone: z.string()
        .regex(phoneRegex, 'Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)')
        .or(z.string().min(10, 'Please enter a valid phone number')),

    deliveryMethod: z.enum(['pickup', 'delivery']),

    address: z.string().optional(),

    items: z.record(z.string(), z.number().min(0))
        .refine(
            (items) => Object.values(items).some(qty => qty > 0),
            'Please select at least one item'
        ),

    specialInstructions: z.string()
        .max(1000, 'Special instructions must be less than 1000 characters')
        .optional(),
}).refine((data) => {
    if (data.deliveryMethod === 'delivery') {
        return !!data.address && data.address.length >= 10;
    }
    return true;
}, {
    message: 'Please provide a complete delivery address for delivery orders',
    path: ['address'],
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

// Contact form validation schema (if needed later)
export const contactFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),

    email: z.string()
        .email('Please enter a valid email address'),

    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
