CREATE PROCEDURE createUser (
  OUT already_exists BOOLEAN,
  OUT id INT,
  IN first_name VARCHAR(255),
  IN last_name VARCHAR(255),
  IN email VARCHAR(255),
  IN hash VARCHAR(72),
  IN photo_url VARCHAR(255),
  IN is_admin BOOLEAN
  )
BEGIN
  DECLARE existing_id INT;

  SELECT u.id
    FROM user u
    WHERE u.email = email
    LIMIT 1
  INTO existing_id;

  SET already_exists = if(existing_id IS NULL, false, true);

  IF NOT already_exists THEN
    INSERT INTO user (first_name, last_name, email, hash, photo_url, is_admin)
      VALUES (first_name, last_name, email, hash, photo_url, is_admin);

    SELECT u.id
      FROM user u
      WHERE u.email = email
      LIMIT 1
    INTO id;
  END IF;
END
