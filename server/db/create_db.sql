DROP DATABASE IF EXISTS btotm;

CREATE DATABASE btotm;

USE btotm;

CREATE TABLE user (
  id INT  NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq1__user__email (email)
);

CREATE TABLE place (
  id INT NOT NULL AUTO_INCREMENT,
  google_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq1__place__google_id (google_id)
);


CREATE TABLE item (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  place_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq2__item__name__place_id (name, place_id),
  FOREIGN KEY fk__item__place (place_id)
    REFERENCES place (id)
);

CREATE TABLE review (
  id INT NOT NULL AUTO_INCREMENT,
  stars TINYINT NOT NULL,
  comment VARCHAR(510) NULL,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY fk__review__user (user_id)
    REFERENCES user (id),
  FOREIGN KEY fk__review__item (item_id)
    REFERENCES item (id)
);

CREATE TABLE place_photo (
  id INT NOT NULL AUTO_INCREMENT,
  place_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq2__place_photo__place_id__url (place_id, url),
  FOREIGN KEY fk__place_photo__place (place_id)
    REFERENCES place (id)
);

delimiter //
CREATE PROCEDURE getUser (OUT num_users INT, OUT num_items INT, IN user_id INT, place_id INT)
  BEGIN
    SELECT * FROM user WHERE id = user_id;
    SELECT * FROM place WHERE id = place_id;
    SELECT * FROM item WHERE id = 1;
    SELECT COUNT(*) INTO num_users FROM user;
    SELECT COUNT(*) INTO num_items FROM item;
  END//

delimiter //
CREATE PROCEDURE getUserReviews (IN reviewer_id INT)
  BEGIN
    SELECT * FROM review WHERE user_id = user_id;
  END//
