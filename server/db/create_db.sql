CREATE DATABASE btotm;

USE btotm;

CREATE TABLE user (
  id INT AUTOINCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_admin BOOLEAN DEFAULT 0 NOT NULL
);

CREATE TABLE restaurant (
  id INT AUTOINCREMENT PRIMARY KEY,
  google_restaurant_id VARCHAR UNIQUE,
  name VARCHAR(255) NOT NULL,
  address_id INT NULL,
  CONSTRAINT FOREIGN KEY restaurant__address (address_id)
    REFERENCES address (id)
);


# need GIS INDEX
CREATE TABLE address (
  id INT AUTOINCREMENT PRIMARY KEY,
  street1 VARCHAR(255) NOT NULL,
  street2 VARCHAR(255) NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip VARCHAR(10) NULL,
  lat DECIMAL(9,6) NULL,
  long DECIMAL(9,6) NULL
);

CREATE TABLE item (
  id INT AUTOINCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  restaurant_id INT NOT NULL,
  CONSTRAINT UNIQUE (name, restaurant_id),
  CONSTRAINT FOREIGN KEY item__restaurant (restaurant_id)
    REFERENCES restaurant (id)
);

CREATE TABLE review (
  id INT AUTOINCREMENT PRIMARY KEY,
  stars TINYINT NOT NULL,
  comment VARCHAR(510) NULL,
  user_id INT NOT NULL,
  item_id INT NOT NULL
);
