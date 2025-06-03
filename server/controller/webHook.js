import { Webhook } from 'svix';
import { userModel } from '../models/user.js';

export const clerkWebHooks = async (req, res) => {
  try {
    // Validate Clerk signature headers
    const svixId = req.headers['svix-id'];
    const svixTimestamp = req.headers['svix-timestamp'];
    const svixSignature = req.headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      return res.status(400).json({ success: false, message: 'Missing Clerk signature headers' });
    }

    // Create webhook instance
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook signature
    whook.verify(JSON.stringify(req.body), {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });

    const { data, type } = req.body;

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await userModel.create(userData);
        return res.status(200).json({ success: true });
      }

      case 'user.updated': {
        const updatedData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await userModel.findByIdAndUpdate(data.id, updatedData);
        return res.status(200).json({ success: true });
      }

      case 'user.deleted': {
        await userModel.findByIdAndDelete(data.id);
        return res.status(200).json({ success: true });
      }

      default:
        return res.status(200).json({ success: true, message: 'Event type ignored.' });
    }
  } catch (error) {
    console.error('Webhook error:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
