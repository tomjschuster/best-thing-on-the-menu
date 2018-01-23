CREATE PROCEDURE deleteItem(item_id INT)
BEGIN
  DELETE FROM review WHERE item_id = item_id;
  DELETE FROM item WHERE id = item_id;
END
