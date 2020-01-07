DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(5,2) NULL,
    stock_quantity INTEGER(10),
    PRIMARY KEY (id)
    );
    
INSERT INTO products ( product_name, department_name, price, stock_quantity)
VALUES 
	("Kitten Socks", "Clothing", 3.00, 10),
    ("NBA basketball", "Sporting", 15.00, 10),
    ("Playstation 5", "Electronics", 500.00, 2),
    ("XBox 2", "Electronics", 499.99, 4),
    ("Jordan 11", "Shoes", 220.00, 20),
    ("Kanye West Vinyl", "Music", 20.00, 10),
    ("Cornhole Set", "Outdoors", 180.00, 10),
    ("Air Fryer", "Kitchen", 99.99, 20),
    ("Lenovo laptop", "Computer", 600.00, 10),
    ("Plush Blanket", "Home", 21.99, 15);