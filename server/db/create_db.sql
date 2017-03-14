DROP DATABASE IF EXISTS btotm;

CREATE DATABASE btotm;

USE btotm;


# SCHEMA

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
  item_id INT NOT NULL,
  user_id INT NOT NULL,
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


# STORED PROCEDURES

delimiter //


CREATE PROCEDURE getPlaces ()
  BEGIN
    SELECT
      p.id,
      p.google_id,
      p.name,
      p.address,
      COUNT(DISTINCT(i.id)) num_items,
      COUNT(*) num_reviews,
      AVG(r.stars) avg_stars
    FROM place p
      LEFT JOIN item i ON i.place_id = p.id
      LEFT JOIN review r ON r.item_id = i.id
    GROUP BY p.id;
  END//


CREATE PROCEDURE getPlaceById (OUT found BOOLEAN, IN place_id INT)
  BEGIN
    SELECT if(COUNT(*) > 0, true, false) FROM place WHERE id = place_id LIMIT 1 INTO found;

    SELECT
      p.id,
      p.google_id,
      p.name,
      p.address,
      COUNT(DISTINCT(i.id)) num_items,
      COUNT(*) num_reviews,
      AVG(r.stars) avg_stars
    FROM place p
      LEFT JOIN item i ON i.place_id = p.id
      LEFT JOIN review r ON r.item_id = i.id
    WHERE p.id = place_id
    GROUP BY p.id
    LIMIT 1;
  END//


CREATE PROCEDURE getPlaceItemsReviews (OUT found BOOLEAN, IN place_id INT)
  BEGIN

    CALL getPlaceById(found, place_id);

    SELECT i.id, i.name
    FROM item i
    WHERE i.place_id = place_id;

    SELECT
      r.id,
      r.item_id,
      u.id user_id,
      u.first_name,
      u.last_name,
      u.photo_url,
      r.stars,
      r.comment
    FROM review r
      INNER JOIN item i ON i.id = r.item_id
      INNER JOIN user u ON u.id = r.user_id
      INNER JOIN place p ON p.id = i.place_id
    WHERE p.id = place_id;
  END//

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
  END//

CREATE PROCEDURE createItem (OUT id INT, IN name VARCHAR(255), IN place_id INT)
  BEGIN
    INSERT INTO item (name, place_id) VALUES (name, place_id);
    SET id = LAST_INSERT_ID();
  END//

CREATE PROCEDURE createReview (
  OUT id INT,
  IN stars TINYINT,
  IN comment VARCHAR(255),
  IN item_id INT,
  IN user_id INT
)
  BEGIN
    INSERT INTO review (stars, comment, item_id, user_id)
      VALUES (stars, comment, item_id, user_id);
    SET id = LAST_INSERT_ID();
  END//


CREATE PROCEDURE checkItem (
  OUT new_item BOOLEAN,
  OUT item_id INT,
  IN place_id INT,
  IN name VARCHAR(255)
)
BEGIN
  SELECT if(COUNT(*) > 0, false, true)
    FROM item i
    WHERE i.place_id = place_id AND i.name = name
    LIMIT 1
  INTO new_item;

  IF new_item THEN
    INSERT INTO item (place_id, name) VALUES (place_id, name);
    SET item_id = LAST_INSERT_ID();
  ELSE
    SELECT id
      FROM item i
      WHERE i.place_id = place_id AND i.name = name
      LIMIT 1
    INTO item_id;
  END IF;
END//


CREATE PROCEDURE checkItemAndCreateReview (
  OUT new_item BOOLEAN,
  IN place_id INT,
  IN item_name VARCHAR(255),
  IN stars TINYINT,
  IN comment VARCHAR(255),
  IN user_id INT
)
  BEGIN
    DECLARE item_id INT;

    CALL checkItem(new_item, item_id, place_id, item_name);

    INSERT INTO review (stars, comment, item_id, user_id)
      VALUES (stars, comment, item_id, user_id);

  END//
delimiter ;
