import express from 'express';

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const orders = []; // change orders name

const PORT = 3003;

app.get('/', (req, res) => {
     res.render('home');
});

app.get('/admin', (req, res) => {
    res.render('admin', { orders }); // change orders name
});

app.post('/submit-form', (req, res) => {
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        jobTitle: req.body['job-title'], // hyphen causes ReferenceError otherwise
        company: req.body.company,
        linkedin: req.body['linkedin-url'],
        email: req.body.email,
        meet: req.body.meet,
        other: req.body.other,
        message: req.body.message,
        mailingList: req.body['mailing-list'],
        emailFormat: req.body['email-format'],
        timestamp: new Date()
    };

    orders.push(order);
    console.log(orders);

    res.render('confirmation', {order});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});