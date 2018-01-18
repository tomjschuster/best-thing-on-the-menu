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
