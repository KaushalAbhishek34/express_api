const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT ;

console.log("Connecting to MySQL database...");
const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    connectTimeout: 60000 
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err.message);
    } else {
        console.log("Connected to MySQL database successfully!");
    }
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.get('/products', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    connection.query(`SELECT 
       Product.*,
       (
          SELECT 
            GROUP_CONCAT(Image.url) 
          FROM 
            Image 
          WHERE 
            Image.productId = Product.id
         ) AS images
        FROM 
        Product
        LIMIT ${skip}, ${limit}`, (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const response = {
                products: results,
                total: 100, 
                skip: skip,
                limit: limit
            };
            res.json(response);
        }
    });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;

    connection.query(`SELECT * FROM Product WHERE id = ?`, [productId], (error, results) => {
        if (error) {
            console.error(`Error fetching product with ID ${productId}:`, error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
                res.json(results[0]);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});