import { userModel } from '../models/user.js';

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
