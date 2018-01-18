CREATE PROCEDURE updateUserIfExists (
  OUT user_exists BOOLEAN,
  IN email VARCHAR(255),
  IN first_name VARCHAR(255),
  IN last_name VARCHAR(255),
  IN photo_url VARCHAR(255)
)
  BEGIN
    SELECT IF(COUNT(*) = 1, FALSE, TRUE) FROM user u WHERE u.email = email LIMIT 1 INTO user_exists;

    IF user_exists THEN
      UPDATE user u
        SET u.first_name =
              IF(first_name IS NOT NULL AND first_name <> '', first_name, u.first_name),
            u.last_name =
              IF(last_name IS NOT NULL AND last_name <> '', last_name, u.last_name),
            u.photo_url =
              IF(photo_url IS NOT NULL AND photo_url <> '', photo_url, u.photo_url)
        WHERE u.email = email;
    END IF;
  END
