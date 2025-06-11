import Stripe from 'stripe';
import { userModel } from '../models/user.js';
import { Puraches } from '../models/purchase.js';
import bodyParser from 'body-parser';
export const clerkWebHooks = async (req, res) => {
  try {
    const { data, type } = req.body;

    console.log("🔔 Webhook Event:", type);
    console.log("📦 Data:", data);

    switch (type) {
      case 'user.created':
        await userModel.create({
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url || '',
        });

        
        break;

      case 'user.updated':
        await userModel.findByIdAndUpdate(data.id, {
          email: data.email_addresses?.[0]?.email_address || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url || '',
        });
        break;

      case 'user.deleted':
        await userModel.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware to read raw body for Stripe webhook
export const rawBodyMiddleware = bodyParser.raw({ type: 'application/json' });

// ✅ Stripe Webhook Handler
export const stripeWebHooks = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const purchaseId = session.metadata?.purchaseId;

    if (!purchaseId) {
      console.error('❌ purchaseId is missing in session metadata');
      return res.status(400).send('Missing purchaseId');
    }

    try {
      await Purchases.findByIdAndUpdate(purchaseId, {
        paymentStatus: 'paid',
      });

      console.log(`✅ Payment confirmed for purchase ${purchaseId}`);
    } catch (err) {
      console.error('❌ Database update error:', err.message);
      return res.status(500).send('Database update failed');
    }
  }

  res.status(200).json({ received: true });
};
