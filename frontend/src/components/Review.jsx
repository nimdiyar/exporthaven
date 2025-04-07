import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { toast } from "react-toastify";

const Review = ({ adId, reviews: initialReviews }) => {
  const [reviews, setReviews] = useState(initialReviews || []);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error("Please provide a rating and comment");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/api/reviews/${adId}`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews(res.data.reviews);
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Error submitting review");
    }
  };

  return (
    <div className="bg-white rounded-lg">
      {/* Reviews List */}
      <div className="space-y-3 mb-5">
        <div className="flex flex-wrap gap-3 mb-4">
          {reviews.length === 0 ? (
            <p className="text-[#353535] text-center italic py-2 w-full">
              No reviews yet.
            </p>
          ) : (
            reviews.map((review, index) => (
              <div
                key={index}
                className="bg-[#f9f9f9] p-3 rounded-md border border-[#d9d9d9] flex-1 min-w-[250px] max-w-[300px]"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating ? "text-yellow-400" : "text-[#d9d9d9]"
                      }
                      size={16}
                    />
                  ))}
                  <span className="text-[#353535] text-sm ml-1">
                    ({review.rating})
                  </span>
                </div>
                <div className="text-[#353535] text-sm">{review.comment}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="border-t border-[#d9d9d9] pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[#353535] text-sm font-medium mb-2">
              Rating
            </label>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={index}
                    className={`cursor-pointer transition-colors duration-200 ${
                      ratingValue <= rating
                        ? "text-yellow-400"
                        : "text-[#d9d9d9]"
                    }`}
                    size={24}
                    onClick={() => setRating(ratingValue)}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-[#353535] text-sm font-medium mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-3 py-2 bg-white border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-1 focus:ring-[#284b63] text-sm h-24 resize-none"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#284b63] text-white py-2 px-4 rounded-md hover:bg-[#3c6e71] transition-colors duration-200 text-sm"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;
