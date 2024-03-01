const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 28031;

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
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
