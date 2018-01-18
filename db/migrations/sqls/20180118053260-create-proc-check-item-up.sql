CREATE PROCEDURE checkItem (
  OUT new_item BOOLEAN,
  OUT id INT,
  IN place_id INT,
  IN name VARCHAR(255)
)
BEGIN
  SELECT i.id
    FROM item i
    WHERE i.place_id = place_id AND i.name = name
    LIMIT 1
  INTO id;

  SET new_item = if(id IS NULL, true, false);

  IF new_item THEN
    CALL createItem (id, name, place_id);
  END IF;
END
