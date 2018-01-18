CREATE PROCEDURE getUserByEmail (IN email VARCHAR(255))
  BEGIN
    SELECT u.id, u.first_name, u.last_name, u.is_admin
    FROM user u
    WHERE u.email = email;
  END
