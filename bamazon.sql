CREATE DATABASE bamazon_db;
 
USE bamazon_db;


 
CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL (9,2) UNSIGNED NOT NULL ,
stock_quantity INTEGER(10),
 primary key(item_id)
 );
 
 
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rolex", "watches", 6000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("macbook pro", "computers", 700, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("samsung tv", "electronics", 1500, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple watch", "watches", 400, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fortnite", "games", 49.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("nike airmax", "shoes", 199.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("love seat", "furniture", 499.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("polo shirt", "apparel", 49.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("black jeans", "apparel", 39.99, 20);