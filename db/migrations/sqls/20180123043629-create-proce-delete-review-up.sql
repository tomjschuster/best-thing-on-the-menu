CREATE PROCEDURE deleteReview(review_id INT)
BEGIN
  DELETE FROM review WHERE id = review_id;
END
