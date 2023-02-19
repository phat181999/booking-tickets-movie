const express = require("express");
const ReviewsRouter = express.Router();
import {
  createReview,
  getReviews,
  getReviewId,
  deleteReview,
  updateReview,
  getReviewMovie,
} from "../controller/review.controller";
import { Authentication } from "../middlwares/authentication";
ReviewsRouter.post("/create-review", Authentication, createReview);
ReviewsRouter.get("/get-reviews", getReviews);
ReviewsRouter.get("/get-review/:id", getReviewId);
ReviewsRouter.delete("/delete-review/:id", deleteReview);
ReviewsRouter.put("/update-review/:id", updateReview);
ReviewsRouter.get("/get-review-movie/:id", getReviewMovie);
module.exports = {
  ReviewsRouter,
};
