CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name varchar (50) NOT NULL,
price decimal (5,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);