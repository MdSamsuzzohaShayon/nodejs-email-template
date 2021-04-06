require('dotenv').config({ path: "./config/.env" });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');


const conn = require('./config/mysql-config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const emailTemplate = require('./routes/template');

const app = express();



// DATABASE CONNECTION 
conn.connect((err, res) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + conn.threadId);
});


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/template', emailTemplate);



app.listen(process.env.PORT, () => console.log("Server is connected to: " + process.env.PORT))
