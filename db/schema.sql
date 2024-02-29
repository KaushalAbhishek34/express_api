CREATE DATABASE product_app;
USE product_app;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    descriptions TEXT,
    price DECIMAL(10, 2),
    discountPercentage DECIMAL(5, 2),
    rating DECIMAL(3, 2),
    stock INT,
    brand VARCHAR(255),
    category VARCHAR(255),
    thumbnail VARCHAR(255),
    images TEXT
);

INSERT INTO products (title, descriptions, price, discountPercentage, rating, stock, brand, category, thumbnail, images)
VALUES
('iPhone 9', 'An apple mobile which is nothing like apple', '549', '12.96', '4.69', '94', 'Apple', 'smartphones', 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg', '[
"https://cdn.dummyjson.com/product-images/1/1.jpg",
"https://cdn.dummyjson.com/product-images/1/2.jpg",
"https://cdn.dummyjson.com/product-images/1/3.jpg",
"https://cdn.dummyjson.com/product-images/1/4.jpg",
"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
]'),
('iPhone X', 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', '899', '17.94', '4.44', '34', 'Apple', 'smartphones', 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg', '[
"https://cdn.dummyjson.com/product-images/2/1.jpg",
"https://cdn.dummyjson.com/product-images/2/2.jpg",
"https://cdn.dummyjson.com/product-images/2/3.jpg",
"https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
]'),
('Samsung Universe 9', "Samsung's new variant which goes beyond Galaxy to the Universe", '1249', '15.46', '4.09', '36', 'Samsung', 'Smartphones', 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg', '[
"https://cdn.dummyjson.com/product-images/3/1.jpg"
]');