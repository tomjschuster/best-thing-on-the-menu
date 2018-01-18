CREATE PROCEDURE checkItemAndCreateReview (
  OUT new_item BOOLEAN,
  OUT id INT,
  IN place_id INT,
  IN item_name VARCHAR(255),
  IN stars TINYINT,
  IN comment VARCHAR(255),
  IN user_id INT
)
  BEGIN
    DECLARE item_id INT;

    CALL checkItem(new_item, item_id, place_id, item_name);

    INSERT INTO review (stars, comment, item_id, user_id)
      VALUES (stars, comment, item_id, user_id);

    SET id = LAST_INSERT_ID();
  END
