const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use middleware
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bannerdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Handle GET request to /api/banner
app.get('/api/banner', (req, res) => {
    db.query('SELECT * FROM banner LIMIT 1', (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// Handle POST request to /api/banner
app.post('/api/banner', (req, res) => {
    const { isVisible, description, timer, link } = req.body;
    const query = `
    UPDATE banner
    SET isVisible=?, description=?, timer=?, link=?
    WHERE id=1
    `;

    db.query(query, [isVisible, description, timer, link], (err) => {
        if (err) throw err;
        res.send('Banner updated');
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});