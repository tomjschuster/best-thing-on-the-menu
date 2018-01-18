CREATE PROCEDURE getHash (IN email VARCHAR(255))
  BEGIN
    SELECT u.hash FROM user u WHERE u.email = email LIMIT 1;
  END
