CREATE TABLE place (
  id INT NOT NULL AUTO_INCREMENT,
  google_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq1__place__google_id (google_id)
);
