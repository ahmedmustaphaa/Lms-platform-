export const protectedEducator = async (req, res, next) => {
  try {
    if (!req.auth) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const auth = req.auth();  // استدعاء الدالة
    const userId = auth.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const response = await clerkClient.users.getUser(userId);

    if (response.publicMetadata.role !== "educator") {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
