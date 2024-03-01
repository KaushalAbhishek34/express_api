const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.MYSQLPORT;

console.log("Connecting to MySQL database...");
const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQLHOST,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE
        });
        console.log("Connected to MySQL database successfully!");
        return connection;
    } catch (err) {
        console.error("Error connecting to MySQL database:", err.message);
        throw err;
    }
};

app.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;

    try {
        const connection = await connectToDatabase();
        const [results] = await connection.execute(`SELECT * FROM products LIMIT ?, ?`, [skip, limit]);
        const response = {
            products: results,
            total: 100,
            skip: skip,
            limit: limit
        };
        res.json(response);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, '::', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
