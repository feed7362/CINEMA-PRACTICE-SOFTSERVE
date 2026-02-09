import React from 'react';
import {Navigate} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/payment/CheckoutForm';
import PromoCodeInput from '@/components/payment/PromoCodeInput';
import {useCheckout} from '@/hooks/useCheckout';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

const Checkout: React.FC = () => {
    const {
        lockData,
        priceData,
        stripeOptions,
        isValidSession
    } = useCheckout();

    if (!isValidSession || !lockData || !stripeOptions) {
        return <Navigate to="/" replace/>;
    }

    const {
        subtotal,
        discountAmount,
        total,
        appliedPromo,
        error: promoError,
        applyPromoCode,
        removePromoCode
    } = priceData;

    return (
        <div className="min-h-screen bg-[#020617] text-white font-['Inter'] flex flex-col relative overflow-hidden">

            <div
                className="absolute top-0 left-0 w-150 h-150 bg-[#0753E0] rounded-full blur-[150px] opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2"/>
            <div
                className="absolute bottom-0 right-0 w-125 h-125 bg-[#0753E0] rounded-full blur-[180px] opacity-10 pointer-events-none translate-x-1/3 translate-y-1/3"/>

            <main
                className="grow container mx-auto px-6 py-10 relative z-10 flex items-center justify-center pt-32 pb-20">
                <div className="w-full max-w-lg">

                    <div
                        className="bg-[#051329]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0753E0] to-transparent opacity-70"></div>

                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Оплата замовлення</h2>
                        <p className="text-gray-400 text-center text-sm mb-6">Введіть дані картки для завершення</p>

                        <div className="bg-white/5 rounded-xl p-4 mb-6 space-y-2 border border-white/5">
                            <div className="flex justify-between text-zinc-400 text-sm">
                                <span>Сума за квитки:</span>
                                <span>{subtotal} ₴</span>
                            </div>

                            {discountAmount > 0 && (
                                <div className="flex justify-between text-green-400 text-sm font-medium animate-pulse">
                                    <span>Знижка ({appliedPromo?.code}):</span>
                                    <span>- {discountAmount} ₴</span>
                                </div>
                            )}

                            <div
                                className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10 mt-2">
                                <span>До сплати:</span>
                                <span>{total} ₴</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <PromoCodeInput
                                onApply={applyPromoCode}
                                onRemove={removePromoCode}
                                appliedCode={appliedPromo?.code || null}
                                error={promoError}
                                isLoading={priceData.isApplying}
                            />
                        </div>

                        <Elements stripe={stripePromise} options={stripeOptions}>
                            <CheckoutForm
                                bookingId={lockData.id}
                                expirationTime={lockData.expirationTime}
                            />
                        </Elements>

                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <p className="text-amber-500/90 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                Місця зарезервовано на 15 хвилин
                            </p>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    );
};

export default Checkout;