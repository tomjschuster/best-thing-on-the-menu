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


CREATE PROCEDURE getPlaceById (OUT place_found BOOLEAN, IN place_id INT)
  BEGIN
    SELECT if(COUNT(*) > 0, true, false) FROM place WHERE id = place_id LIMIT 1 INTO place_found;

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


CREATE PROCEDURE getPlaceItemsReviews (OUT place_found BOOLEAN, IN place_id INT)
  BEGIN

    CALL getPlaceById(place_found, place_id);

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
  google_id VARCHAR(255),
  name VARCHAR(255),
  address VARCHAR(255)
)
  BEGIN
    INSERT INTO place (google_id, name, address)
      VALUES (google_id, name, address);
  END//

CREATE PROCEDURE createItem (IN name VARCHAR(255), IN place_id INT)
  BEGIN
    INSERT INTO item (name, place_id) VALUES (name, place_id);
  END//

CREATE PROCEDURE createReview (
  IN stars TINYINT,
  IN comment VARCHAR(255),
  IN item_id INT,
  IN user_id INT
)
  BEGIN
    INSERT INTO review (stars, comment, item_id, user_id)
      VALUES (stars, comment, item_id, user_id);
  END//


delimiter ;
