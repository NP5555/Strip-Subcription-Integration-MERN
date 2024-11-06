const stripe = require('../config/stripeConfig');

exports.createCheckoutSession = async (req, res) => {
    const { priceId, coupon } = req.body;

    if (!priceId) {
        return res.status(400).json({ success: false, message: 'Price ID is required' });
    }

    try {
        const sessionConfig = {
            mode:  'subscription' ,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription' ,
            success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/cancel`,
        };

        // Add coupon if available and valid
        if (coupon) {
            sessionConfig.discounts = [{ coupon }];
        }

        // Create the checkout session
        const session = await stripe.checkout.sessions.create(sessionConfig);

        // Send the session URL back to the client for redirect
        res.json({ success: true, url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ success: false, message: 'Failed to create checkout session' });
    }
};
