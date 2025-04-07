//controllers\reviewController.js
import Ad from "../models/Ad.js";

export const submitReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { adId } = req.params;
    const ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    if (ad.reviews.some((rev) => rev.user.toString() === req.user.id))
      return res
        .status(400)
        .json({ message: "You have already reviewed this ad" });
    ad.reviews.push({
      user: req.user.id,
      rating,
      comment,
      createdAt: new Date(),
    });
    await ad.save();
    res.json({ message: "Review submitted successfully", reviews: ad.reviews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting review", error: error.message });
  }
};
