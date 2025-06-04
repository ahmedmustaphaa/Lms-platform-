import { userModel } from '../models/user.js';

export const clerkWebHooks = async (req, res) => {
  try {
    // ✅ مؤقتًا بنعدي التحقق عشان نختبر التخزين
    const payload = req.body;
    const bodyString = payload.toString();

    // ✅ بدل verify من svix، هنستخدم parse مؤقتًا
    const evt = JSON.parse(bodyString);
    const { data, type } = evt;

    console.log("🟢 Webhook received:", type);
    console.log("📦 Payload data:", data);

    switch (type) {
      case 'user.created':
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url,
        };

        console.log("✅ Creating user with data:", userData);
        await userModel.create(userData);
        return res.status(200).json({ success: true });

      case 'user.updated':
        await userModel.findByIdAndUpdate(data.id, {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
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
