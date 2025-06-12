import Stripe from 'stripe';
import { userModel } from '../models/user.js';
import { Puraches } from '../models/purchase.js';
import bodyParser from 'body-parser';
import { Webhook } from 'svix';

export const clerkWebHooks = async (req, res) => {
  try {
    // 1. التحقق من وجود البيانات الأساسية
    if (!req.body || !req.body.toString()) {
      console.error('🔴 Error: Empty request body');
      return res.status(400).json({ error: 'Empty request body' });
    }

    // 2. تحليل البيانات الواردة
    const payload = JSON.parse(req.body.toString());
    console.log('🔵 Webhook Payload:', JSON.stringify(payload, null, 2));

    // 3. التحقق من صحة البنية الأساسية للبيانات
    if (!payload.type || !payload.data) {
      console.error('🔴 Error: Invalid payload structure');
      return res.status(400).json({ error: 'Invalid payload structure' });
    }

    const { type, data } = payload;

    // 4. معالجة الأحداث المختلفة
    switch (type) {
      case 'user.created':
        console.log('🟢 Processing user.created event');
        
        // البحث عن البريد الأساسي
        const primaryEmail = data.email_addresses?.find(
          email => email.id === data.primary_email_address_id
        )?.email_address || '';

        // إنشاء مستخدم جديد
        const newUser = {
          _id: data.id,
          email: primaryEmail,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url || '',
          provider: data.external_accounts?.[0]?.provider || 'email',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        console.log('🟢 New user data:', newUser);
        
        await userModel.create(newUser);
        console.log('🟢 User created successfully');
        break;

      case 'user.updated':
        console.log('🟠 Processing user.updated event');
        
        const updateData = {
          email: data.email_addresses?.find(
            email => email.id === data.primary_email_address_id
          )?.email_address || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url || '',
          updatedAt: new Date()
        };

        await userModel.findByIdAndUpdate(data.id, updateData);
        console.log('🟠 User updated successfully');
        break;

      case 'user.deleted':
        console.log('🔴 Processing user.deleted event');
        await userModel.findByIdAndDelete(data.id);
        console.log('🔴 User deleted successfully');
        break;

      default:
        console.log('🟡 Unknown event type:', type);
    }

    // 5. الرد بنجاح
    res.status(200).json({ success: true });
    
  } catch (err) {
    // 6. معالجة الأخطاء
    console.error('🔴 Error in webhook processing:');
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    
    res.status(500).json({ 
      success: false,
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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
