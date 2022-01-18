INSERT INTO category(id, cat_name) VALUES ('675a990d-6ed6-425c-8afe-6fd7a507b77a', "Principales");
INSERT INTO category(id, cat_name) VALUES ('5cb7271b-bbdf-4ee2-850b-d7a41211c5ba', "Tablas");
INSERT INTO category(id, cat_name) VALUES ('a9ca36a1-f246-4af4-af52-a5d1f963e7dd', "Woks");
INSERT INTO category(id, cat_name) VALUES ('011c3022-4515-4971-9fc6-778971a28423', "Ensaladas");
INSERT INTO category(id, cat_name) VALUES ('0477037a-ebdb-48d3-a733-f7ac16eba0bf', "Postres");
INSERT INTO category(id, cat_name) VALUES ('97cdc1e3-9e1d-4988-a2d3-9d7d527f35f5', "Entradas");


INSERT INTO product(id, title, category_id, prod_description, picture, price)
VALUES ('bc71bbac-cd0e-4d9e-95f1-3edfeac1df7a', 'ensalada1', '011c3022-4515-4971-9fc6-778971a28423', 'Descripcion de la ensalada 1', 'ensalada-1.jpg', 200);
INSERT INTO product(id, title, category_id, prod_description, picture, price)
VALUES ('af71aa1d-c111-48a9-87da-a747662ebfde', 'principal1', '675a990d-6ed6-425c-8afe-6fd7a507b77a', 'Descripcion del plato principal 1', 'principales-sushi.jpg', 1200);
INSERT INTO product(id, title, category_id, prod_description, picture, price)
VALUES ('48c6f2aa-347a-4f0f-b53b-e6540628c851', 'tabla1', '5cb7271b-bbdf-4ee2-850b-d7a41211c5ba', 'Descripcion de la tabla 1', 'tabla-1.jpg', 1000);
INSERT INTO product(id, title, category_id, prod_description, picture, price)
VALUES ('f0c1c385-62af-4cc9-9ca1-d2efb206b686', 'wok1', 'a9ca36a1-f246-4af4-af52-a5d1f963e7dd', 'Descripcion del wok 1', 'wok-1.jpg', 800);
INSERT INTO product(id, title, category_id, prod_description, picture, price)
VALUES ('64916ea4-1c89-495b-9197-de846e75a183', 'postre1', '0477037a-ebdb-48d3-a733-f7ac16eba0bf', 'Descripcion del postre 1', 'postre-1.jpg', 300);
INSERT INTO product(id, title, category_id, prod_description, picture, price)
VALUES ('7d057932-73dd-4bba-952a-d5b59c01537a', 'Entrada1', '97cdc1e3-9e1d-4988-a2d3-9d7d527f35f5', 'Descripcion de la entrada 1', 'entrada-1.jpg', 500);

INSERT INTO user_role(id, name) VALUES (1, 'Admin');
INSERT INTO user_role(id, name) VALUES (2, 'Customer');

INSERT INTO user (id, role_id, name, last_name, address, email, phone, password, profile_pic)
VALUES ('36b0ed55-0730-4ddb-bb8e-64ee1bfad56e', 2, 'first', 'customer', 'nowhere', 'customer@one.com', '1111111111', '$2a$10$MCSP5XTt5GXAbKJjNqFGaehERaBM44tWd0JtNS3rV2mquALmEXiQa', 'image-1641297023273-611170790.jpg');
INSERT INTO user (id, role_id, name, last_name, address, email, phone, password, profile_pic)
VALUES ('4ba9345d-be87-4964-81eb-671c76ce2e35', 1, 'admin', 'admin', 'nowhere', 'admin@capital.com', '1111111111', '$2a$10$MCSP5XTt5GXAbKJjNqFGaehERaBM44tWd0JtNS3rV2mquALmEXiQa', 'image-1641471006101-814988620.jpg');

INSERT INTO order_list(id, user_id) VALUES ('f8c8a796-c2f8-48b2-9bb8-fc51ae044e49', '36b0ed55-0730-4ddb-bb8e-64ee1bfad56e');

INSERT INTO order_item(id, order_id, product_id, qty)
VALUES('2397ec54-241e-48e5-8797-c8bc2033c5a3', 'f8c8a796-c2f8-48b2-9bb8-fc51ae044e49', 'bc71bbac-cd0e-4d9e-95f1-3edfeac1df7a', 1);

INSERT INTO order_item(id, order_id, product_id, qty)
VALUES('bc45b952-0350-4551-90ee-0f98ed938dc9', 'f8c8a796-c2f8-48b2-9bb8-fc51ae044e49', 'af71aa1d-c111-48a9-87da-a747662ebfde', 1);

