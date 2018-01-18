CREATE TABLE place_photo (
  id INT NOT NULL AUTO_INCREMENT,
  place_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq2__place_photo__place_id__url (place_id, url),
  FOREIGN KEY fk__place_photo__place (place_id)
    REFERENCES place (id)
);
