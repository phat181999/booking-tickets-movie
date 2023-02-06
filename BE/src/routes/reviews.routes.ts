const express = require("express");
const ReviewsRouter = express.Router();
import {
  createReview,
  getReviews,
  getReviewId,
  deleteReview,
  updateReview,
} from "../controller/review.controller";
ReviewsRouter.post("/create-review", createReview);
ReviewsRouter.get("/get-reviews", getReviews);
ReviewsRouter.get("/get-review/:id", getReviewId);
ReviewsRouter.delete("/delete-review/:id", deleteReview);
ReviewsRouter.put("/update-review/:id", updateReview);
module.exports = {
  ReviewsRouter,
};
