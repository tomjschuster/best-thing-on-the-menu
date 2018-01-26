CREATE PROCEDURE deletePlace(place_id INT)
BEGIN
  DELETE FROM review WHERE item_id IN (
    SELECT id FROM item WHERE place_id = place_id
  );
  DELETE FROM item where place_id = place_id;
  DELETE from place where id = place_id;
END
