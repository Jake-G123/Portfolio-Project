import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

const contacts = [];

const PORT = 3003;


app.get('/', (req, res) => {
     res.render('home');
});

app.get('/contact', (req, res) => {
     res.render('contact');
});

app.get('/db-test', async (req, res) => {
    try {
        const [contacts] = await pool.query('SELECT * FROM contacts');
        res.send(contacts);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

app.get('/admin', async (req, res) => {
    try {
        const [contacts] = await pool.query('SELECT * FROM contacts ORDER BY timestamp DESC');
        res.render('admin', {contacts});

    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

app.post('/submit-form', async(req, res) => {
    try {
        const contact = req.body;
        console.log('New contact submission: ', contact);

        const sql = 
            `INSERT INTO contacts(fname, lname, jobtitle, company, linkedin, emailformat, email, meet, other, message, mailinglist)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const params = [
            contact.fname,
            contact.lname,
            contact.jobTitle,
            contact.company,
            contact.linkedIn,
            contact.emailFormat,
            contact.email,
            contact.meet,
            contact.other,
            contact.message,
            contact.mailingList
        ].map(param => param === undefined ? null : param);

        const [result] = await pool.execute(sql, params);
        console.log('Contact saved with ID: ', result.insertId);
        res.render('confirmation', {contact});
    } catch (err) {
        console.error('Error saving contact:', err);
            res.status(500).send('Sorry, there was an error processing your submission. Please try again.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});