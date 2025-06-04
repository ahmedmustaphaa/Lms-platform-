import { userModel } from '../models/user.js';

export const clerkWebHooks = async (req, res) => {
  try {
    console.log('🔔 Webhook endpoint hit');
    console.log('Headers:', req.headers);

    const payload = req.body; // لازم يكون Buffer من bodyParser.raw
    const bodyString = payload.toString();
    console.log('Raw body:', bodyString);

    // مؤقتاً بنستخدم JSON.parse بدلاً من svix.verify عشان التجربة
    const evt = JSON.parse(bodyString);
    const { data, type } = evt;

    console.log("🟢 Webhook received:", type);
    console.log("📦 Payload data:", data);

    switch (type) {
      case 'user.created':
        try {
          const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address || 'noemail@example.com',
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'No Name',
            imageUrl: data.image_url || '',
          };
          console.log("✅ Creating user with data:", userData);
          await userModel.create(userData);
          console.log('💾 User saved!');
        } catch (err) {
          console.error('❌ Error saving user:', err);
        }
        return res.status(200).json({ success: true });

      case 'user.updated':
        try {
          await userModel.findByIdAndUpdate(data.id, {
            email: data.email_addresses?.[0]?.email_address || '',
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || '',
            imageUrl: data.image_url || '',
          });
          console.log('♻️ User updated');
        } catch (err) {
          console.error('❌ Error updating user:', err);
        }
        return res.status(200).json({ success: true });

      case 'user.deleted':
        try {
          await userModel.findByIdAndDelete(data.id);
          console.log('🗑️ User deleted');
        } catch (err) {
          console.error('❌ Error deleting user:', err);
        }
        return res.status(200).json({ success: true });

      default:
        return res.status(200).json({ success: true, message: 'Ignored event' });
    }

  } catch (error) {
    console.error("❌ Webhook error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
