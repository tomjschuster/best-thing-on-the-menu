CREATE TABLE user (
  id INT  NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hash VARCHAR(72),
  photo_url VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq1__user__email (email)
);
