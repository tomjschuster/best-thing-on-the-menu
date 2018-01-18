CREATE PROCEDURE createPlace (
  OUT id INT,
  IN google_id VARCHAR(255),
  IN name VARCHAR(255),
  IN address VARCHAR(255)
)
  BEGIN
    INSERT INTO place (google_id, name, address)
      VALUES (google_id, name, address);
    SET id = LAST_INSERT_ID();
  END
