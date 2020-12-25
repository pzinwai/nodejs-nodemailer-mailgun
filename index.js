const express = require('express');
const sendMail = require('./mail');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/email', (req, res) => {
  const { name, subject, email, text } = req.body;

  sendMail(name, email, subject, text, function (err, data) {
    if (err) {
      res.status(500).json({ message: 'Internal Error' });
    } else {
      res.status(200).json({ message: 'Email has been sent!' });
    }
  });
});

app.listen(process.env.APP_PORT, function () {
  console.log('Server is starting on PORT:', process.env.APP_PORT);
});