DROP DATABASE IF EXISTS capital_sushi;

CREATE DATABASE capital_sushi;

USE capital_sushi;

CREATE TABLE category(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  cat_name VARCHAR(20) NOT NULL
);

CREATE TABLE product(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(80) NOT NULL,
  category_id VARCHAR(36) NOT NULL, 
  FOREIGN KEY (category_id) REFERENCES category(id),
  prod_description TEXT(400),
  picture TEXT(200),
  price DOUBLE NOT NULL
);

CREATE TABLE user_role(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE user(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  role_id VARCHAR(36) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES user_role(id),
  name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  address VARCHAR(50) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phone VARCHAR(25) NOT NULL,
  password VARCHAR(80) NOT NULL,
  profile_pic TEXT(200)
);

CREATE TABLE order_list(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE order_item(
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  order_id VARCHAR(36) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES order_list(id),
  product_id VARCHAR(36) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id),
  qty INTEGER NOT NULL
);