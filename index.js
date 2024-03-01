const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 28031 ;

console.log("Connecting to MySQL database...");
const connection = mysql.createConnection({
    host: 'roundhouse.proxy.rlwy.net', 
    user: 'root', 
    password: 'CFE5F3Dc6Gg45CFgCF5CgBEd-4FD23G5', 
    database: 'railway'
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err.message);
    } else {
        console.log("Connected to MySQL database successfully!");
    }
});

app.get('/', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    connection.query(`SELECT * FROM products LIMIT ${skip}, ${limit}`, (error, results) => {
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});