'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaPlus, FaMinus, FaTrash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { orderFormSchema, OrderFormData } from '@/lib/validations';
import { products } from '@/lib/products';
import styles from './OrderForm.module.css';

export default function OrderForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            items: {},
            deliveryMethod: 'pickup',
        },
    });

    const watchItems = watch('items');

    // Calculate total price
    const calculateTotal = () => {
        let total = 0;
        const items = watchItems as Record<string, number>;
        Object.entries(items || {}).forEach(([productId, quantity]) => {
            const product = products.find((p) => p.id === productId);
            if (product && product.price) {
                total += product.price * quantity;
            }
        });
        return total;
    };

    const handleQuantityChange = (productId: string, delta: number) => {
        const items = watchItems as Record<string, number>;
        const currentQty = items?.[productId] || 0;
        const newQty = Math.max(0, currentQty + delta);

        // Use setValue with correct path type
        setValue(`items.${productId}` as any, newQty, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const handleManualQuantityChange = (productId: string, value: string) => {
        const newQty = parseInt(value, 10);
        if (!isNaN(newQty) && newQty >= 0) {
            setValue(`items.${productId}` as any, newQty, {
                shouldValidate: true,
                shouldDirty: true
            });
        } else if (value === '') {
            setValue(`items.${productId}` as any, 0, {
                shouldValidate: true,
                shouldDirty: true
            });
        }
    };

    const onSubmit = async (data: OrderFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            // Filter out items with 0 quantity
            const validItems: Record<string, number> = {};
            Object.entries(data.items).forEach(([key, value]) => {
                const qty = Number(value);
                if (qty > 0) validItems[key] = qty;
            });

            if (Object.keys(validItems).length === 0) {
                throw new Error('Please select at least one item');
            }

            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    items: validItems,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit order');
            }

            setSubmitStatus('success');
            // Scroll to top to see success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Order submission error:', error);
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === 'success') {
        return (
            <div className={styles.successContainer}>
                <div className={styles.iconWrapper}>
                    <FaCheckCircle className={styles.successIcon} />
                </div>
                <h2>Order Received!</h2>
                <p>
                    Thank you for your order. We will contact you shortly to confirm details and arrange delivery.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn btn-primary"
                >
                    Place Another Order
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {submitStatus === 'error' && (
                <div className={styles.errorBanner}>
                    <FaExclamationCircle />
                    <span>{errorMessage}</span>
                </div>
            )}

            <div className={styles.grid}>
                {/* Contact Information */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Contact Information</h3>

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="form-input"
                            placeholder="John Doe"
                        />
                        {errors.name && <p className="form-error">{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Delivery Method</label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value="pickup"
                                    {...register('deliveryMethod')}
                                    className={styles.radioInput}
                                />
                                <span>Pick Up</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value="delivery"
                                    {...register('deliveryMethod')}
                                    className={styles.radioInput}
                                />
                                <span>Delivery</span>
                            </label>
                        </div>
                        {errors.deliveryMethod && <p className="form-error">{errors.deliveryMethod.message}</p>}
                    </div>

                    {watch('deliveryMethod') === 'delivery' && (
                        <div className="form-group">
                            <label className="form-label">Delivery Address</label>
                            <textarea
                                {...register('address')}
                                className="form-textarea"
                                placeholder="Please enter your full delivery address including landmarks..."
                            />
                            {errors.address && <p className="form-error">{errors.address.message}</p>}
                            <p className={styles.infoText}>
                                <FaExclamationCircle className={styles.inlineIcon} />
                                Note: The delivery cost will be communicated to you when we confirm your order.
                            </p>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="form-input"
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            {...register('phone')}
                            className="form-input"
                            placeholder="08012345678"
                        />
                        {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                    </div>


                </div>

                {/* Menu Selection */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Select Items</h3>
                    {errors.items && <p className={styles.sectionError}>{(errors.items as any).message}</p>}

                    <div className={styles.menuList}>
                        {products.map((product) => (
                            <div key={product.id} className={styles.menuItem}>
                                <div className={styles.itemInfo}>
                                    <span className={styles.itemName}>{product.name}</span>
                                    <span className={styles.itemPrice}>₦{product.price?.toLocaleString()}</span>
                                </div>

                                {product.available ? (
                                    <div className={styles.quantityControls}>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(product.id, -1)}
                                            className={styles.qtyBtn}
                                            disabled={((watchItems as Record<string, number>)?.[product.id] || 0) <= 0}
                                        >
                                            <FaMinus />
                                        </button>
                                        <input
                                            type="number"
                                            min="0"
                                            value={(watchItems as Record<string, number>)?.[product.id] || 0}
                                            onChange={(e) => handleManualQuantityChange(product.id, e.target.value)}
                                            className={styles.qtyInput}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(product.id, 1)}
                                            className={styles.qtyBtn}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                ) : (
                                    <span className={styles.unavailableText}>Unavailable</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className={styles.orderTotal}>
                        <span>Total Amount:</span>
                        <span className={styles.totalValue}>
                            ₦{calculateTotal().toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Special Instructions</h3>
                <div className="form-group">
                    <textarea
                        {...register('specialInstructions')}
                        className="form-textarea"
                        placeholder="Any allergies, spice level preferences, or delivery instructions?"
                        rows={3}
                    />
                    {errors.specialInstructions && (
                        <p className="form-error">{errors.specialInstructions.message}</p>
                    )}
                </div>
            </div>

            <div className={styles.submitContainer}>
                <button
                    type="submit"
                    disabled={isSubmitting || calculateTotal() === 0}
                    className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                >
                    {isSubmitting ? (
                        <>
                            <span className="spinner"></span>
                            Submitting Order...
                        </>
                    ) : (
                        'Place Order'
                    )}
                </button>
                <p className={styles.securityNote}>
                    <FaCheckCircle className={styles.smallIcon} />
                    Secure order processing.
                </p>
            </div>
        </form>
    );
}
