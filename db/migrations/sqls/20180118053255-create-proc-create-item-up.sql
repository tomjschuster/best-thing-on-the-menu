CREATE PROCEDURE createItem (OUT id INT, IN name VARCHAR(255), IN place_id INT)
  BEGIN
    INSERT INTO item (name, place_id) VALUES (name, place_id);
    SET id = LAST_INSERT_ID();
  END
