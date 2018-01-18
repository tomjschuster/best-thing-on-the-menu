CREATE TABLE item (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  place_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq2__item__name__place_id (name, place_id),
  FOREIGN KEY fk__item__place (place_id)
    REFERENCES place (id)
);
