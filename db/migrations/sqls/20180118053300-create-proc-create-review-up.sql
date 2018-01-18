CREATE PROCEDURE createReview (
  OUT id INT,
  IN stars TINYINT,
  IN comment VARCHAR(255),
  IN item_id INT,
  IN user_id INT
)
  BEGIN
    INSERT INTO review (stars, comment, item_id, user_id)
      VALUES (stars, comment, item_id, user_id);
    SET id = LAST_INSERT_ID();
  END
