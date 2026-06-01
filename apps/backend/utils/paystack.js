import axios from 'axios';
import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

/**
 * Initialize a Paystack transaction
 * @param {string} email - Customer email
 * @param {number} amount - Amount in Kobo (NGN * 100)
 * @param {Object} metadata - Custom data (e.g., order ID)
 * @returns {Promise<Object>} - Paystack response
 */
export const initializeTransaction = async (email, amount, metadata) => {
    try {
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                email,
                amount: Math.round(amount * 100), // Paystack expects amount in kobo
                metadata,
                callback_url: `${process.env.FRONTEND_URL}/checkout/success`,
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Paystack Initialization Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to initialize Paystack transaction');
    }
};

/**
 * Verify a Paystack transaction signature
 * @param {string} signature - The signature from Paystack header
 * @param {Buffer} rawBody - The raw request body buffer
 * @returns {boolean} - Whether the signature is valid
 */
export const verifySignature = (signature, rawBody) => {
    const hash = crypto
        .createHmac('sha512', PAYSTACK_SECRET_KEY)
        .update(rawBody)
        .digest('hex');
    return hash === signature;
};

/**
 * Verify a Paystack transaction by reference
 * @param {string} reference - The transaction reference
 * @returns {Promise<Object>} - Paystack response
 */
export const verifyTransaction = async (reference) => {
    try {
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Paystack Verification Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to verify Paystack transaction');
    }
};
