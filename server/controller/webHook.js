import { Webhook } from 'svix';
import { userModel } from '../models/user.js';

export const clerkWebHooks = async (req, res) => {
  try {
    const svixId = req.headers['svix-id'];
    const svixTimestamp = req.headers['svix-timestamp'];
    const svixSignature = req.headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({ success: false, message: 'Missing Clerk signature headers' });
    }

    // ✅ لازم raw body هنا
    const payload = req.body; // Buffer
    const bodyString = payload.toString();

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = wh.verify(bodyString, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });

    const { data, type } = evt;

    console.log("🟢 Webhook received:", type);

    switch (type) {
      case 'user.created':
        await userModel.create({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        });
        return res.status(200).json({ success: true });

      case 'user.updated':
        await userModel.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        });
        return res.status(200).json({ success: true });

      case 'user.deleted':
        await userModel.findByIdAndDelete(data.id);
        return res.status(200).json({ success: true });

      default:
        return res.status(200).json({ success: true, message: 'Ignored event' });
    }

  } catch (error) {
    console.error("❌ Webhook error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
