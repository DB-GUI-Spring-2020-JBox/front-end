import { hostname } from "./repositoryConfig";
import axios from "axios";

function error(err) {
  console.error(err);
  alert("Error:\n" + err);
}

export class ReviewsRepository {
  getReviewsByUser(userId) {
    return new Promise((resolve, reject) => {
      axios
        .get(hostname + `/api/reviews/${userId}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          error(err);
          reject(err);
        });
    });
  }

  review(reviewAuthor, reviewContent, reviewRanking, reviewArticle) {
    return new Promise((resolve, reject) => {
      axios
        .post(hostname + "/api/reviews", {
          author: reviewAuthor,
          content: reviewContent,
          ranking: reviewRanking,
          article: reviewArticle,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          error(err);
          resolve(undefined);
        });
    });
  }

  editReview(reviewID, reviewContent, reviewRanking, reviewArticle) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${hostname}/api/articles/${reviewID}`, {
          content: reviewContent,
          ranking: reviewRanking,
          article: reviewArticle,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          error(err);
          reject(err);
        });
    });
  }
}

export default ReviewsRepository;
