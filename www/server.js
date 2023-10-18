const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chatbot_data.sql',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(bodyParser.json());

app.post('/getAnswer', (req, res) => {
    const userText = req.body.userText.toLowerCase();

    const query = 'SELECT answer FROM chatbot WHERE question = ?';
    db.query(query, [userText], (err, results) => {
        if (err) {
            console.error('Error querying MySQL:', err);
            res.status(500).json({ error: 'An error occurred.' });
            return;
        }

        if (results.length === 1) {
            res.json({ answer: results[0].answer });
        } else {
            res.json({
                answer:
                    "I'm sorry, but I couldn't find an answer to your question. Please make sure your question is properly punctuated and try again. If the question is not recognized or you have further inquiries, feel free to contact or email the developer, Patrick Ogalesco.",
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
