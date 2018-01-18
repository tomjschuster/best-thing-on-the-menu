CREATE TABLE valid_domain (
  id INT NOT NULL AUTO_INCREMENT,
  domain VARCHAR(255) NOT NULL ,
  PRIMARY KEY (id),
  UNIQUE KEY uq1__valid_domain__domain (domain)
);
