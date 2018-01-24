CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(
						id INTEGER (11) AUTO_INCREMENT NOT NULL,
                        productName VARCHAR (40) NOT NULL,
                        departmentName VARCHAR(40),
                        price DECIMAL (10,2) NULL, 
                        stockQuantity INTEGER (10) NULL,
                        PRIMARY KEY(id)
);

SELECT * FROM products;

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Blender", "Kitchen", 39.99, 14);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Toaster", "Kitchen", 25.99, 23);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Mug", "Kitchen", 7.79, 34);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Bowl", "Kitchen", 14.59, 6);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Towel", "Bathroom", 12.99, 51);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Rug", "Bathroom", 17.59, 30);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Toothbrush", "Bathroom", 7.79, 243);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Comforter set", "Bedding", 105.89, 21);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Pillow", "Bedding", 32.49, 21);

INSERT INTO products (productName, departmentName, price, stockQuantity)
VALUES ("Sheet", "Bedding", 17.99, 45);