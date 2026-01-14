import { NextRequest, NextResponse } from 'next/server';
import { orderFormSchema } from '@/lib/validations';
import { sendOrderNotification, sendCustomerConfirmation } from '@/lib/email';
import { getProductById } from '@/lib/products';
import { Order, OrderItem } from '@/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate request data
        const validationResult = orderFormSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid form data',
                    errors: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const formData = validationResult.data;

        // Convert items object to OrderItem array
        const orderItems: OrderItem[] = [];
        let totalAmount = 0;

        for (const [productId, quantity] of Object.entries(formData.items)) {
            const qty = Number(quantity);
            if (qty > 0) {
                const product = getProductById(productId);
                if (product) {
                    orderItems.push({
                        productId,
                        productName: product.name,
                        quantity: qty,
                        unitPrice: product.price || 0,
                    });
                    if (product.price) {
                        totalAmount += product.price * qty;
                    }
                }
            }
        }

        // Create order object
        const order: Order = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.deliveryMethod === 'delivery' ? (formData.address || '') : 'Pickup',
            deliveryMethod: formData.deliveryMethod,
            items: orderItems,
            specialInstructions: formData.specialInstructions,
            totalAmount,
            orderDate: new Date(),
        };

        // Send emails
        const [notificationResult, confirmationResult] = await Promise.all([
            sendOrderNotification(order),
            sendCustomerConfirmation(order),
        ]);

        if (!notificationResult.success) {
            console.error('Failed to send order notification:', notificationResult.error);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Failed to process order. Please try again or contact us directly.',
                    error: notificationResult.error,
                },
                { status: 500 }
            );
        }

        // Even if customer confirmation fails, we still consider the order successful
        // since the company received the notification
        if (!confirmationResult.success) {
            console.error('Failed to send customer confirmation:', confirmationResult.error);
        }

        return NextResponse.json({
            success: true,
            message: 'Order received successfully! We\'ll contact you shortly to confirm.',
            data: {
                orderId: `ORD-${Date.now()}`,
                totalAmount,
            },
        });

    } catch (error) {
        console.error('Error processing order:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An unexpected error occurred. Please try again later.',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
