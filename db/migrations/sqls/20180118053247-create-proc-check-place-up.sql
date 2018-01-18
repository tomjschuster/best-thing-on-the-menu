CREATE PROCEDURE checkPlace (
  OUT id INT,
  OUT new_place BOOLEAN,
  IN google_id VARCHAR(255),
  IN name VARCHAR(255),
  IN address VARCHAR(255)
)
  BEGIN
    SELECT p.id
      FROM place p
      WHERE p.google_id = google_id
      LIMIT 1
    INTO id;

    SET new_place = if(id IS NULL, true, false);

    IF id IS NULL THEN
      CALL createPlace(id, google_id, name, address);
    END IF;

  END
