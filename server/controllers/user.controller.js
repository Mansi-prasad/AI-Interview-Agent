import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  console.log("get current user called");
  try {
    const userId = req.userId;
    console.log("Fetching current user ID:", userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    res.error(500).json({ message: "Failed to get current user" });
  }
};
