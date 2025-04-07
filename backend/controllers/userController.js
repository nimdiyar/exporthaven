// backend\controllers\userController.js
import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = req.body.name || user.name;
    user.companyName = req.body.companyName || user.companyName;
    user.phone = req.body.phone || user.phone;
    user.website = req.body.website || user.website;
    user.location = req.body.location || user.location;

    if (req.body.businessAddress) {
      user.businessAddress = req.body.businessAddress;
    } else if (req.body.address) {
      user.address = req.body.address;
    }

    user.bio = req.body.bio || user.bio;
    user.socialMedia = req.body.socialMedia || user.socialMedia;

    if (req.file) {
      user.profilePhoto = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
