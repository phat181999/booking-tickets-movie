"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ReviewsRouter = express.Router();
const review_controller_1 = require("../controller/review.controller");
const authentication_1 = require("../middlwares/authentication");
ReviewsRouter.post("/create-review", authentication_1.Authentication, review_controller_1.createReview);
ReviewsRouter.get("/get-reviews", review_controller_1.getReviews);
ReviewsRouter.get("/get-review/:id", review_controller_1.getReviewId);
ReviewsRouter.delete("/delete-review/:id", review_controller_1.deleteReview);
ReviewsRouter.put("/update-review/:id", review_controller_1.updateReview);
ReviewsRouter.get("/get-review-movie/:id", review_controller_1.getReviewMovie);
module.exports = {
    ReviewsRouter,
};
