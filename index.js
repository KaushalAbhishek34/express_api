const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.MYSQLPORT;

console.log("Connecting to MySQL database...");
const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: process.env.MYSQLHOST,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE
        });
        
        connection.connect((err) => {
            if (err) {
                console.error("Error connecting to MySQL database:", err.message);
                reject(err);
            } else {
                console.log("Connected to MySQL database successfully!");
                resolve(connection);
            }
        });
    });
};

app.get('/', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    connectToDatabase()
        .then((connection) => {
            connection.execute(`SELECT * FROM products LIMIT ?, ?`, [skip, limit])
                .then(([results]) => {
                    const response = {
                        products: results,
                        total: 100,
                        skip: skip,
                        limit: limit
                    };
                    res.json(response);
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                    res.status(500).json({ error: 'Internal server error' });
                })
                .finally(() => {
                    connection.end(); // Close the connection
                });
        })
        .catch((error) => {
            console.error('Error connecting to MySQL database:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.listen(port, '::', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
