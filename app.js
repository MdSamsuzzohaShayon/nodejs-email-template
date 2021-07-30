require('dotenv').config({ path: "./config/.env" });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const colors = require('colors');
const process = require('process');



const indexRouter = require('./routes/index');
const emailTemplate = require('./routes/template');

const app = express();










app.use(express.json({ limit: '50mb' }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
    next();
});
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(methodOverride('_method'));


colors.setTheme({
    info: 'bgGreen',
    help: 'cyan',
    warn: 'yellow',
    success: 'bgBlue',
    error: 'red'
});


app.use('/', indexRouter);
app.use('/template', emailTemplate);


app.use(function (req, res) {
    res.status(404).render("404");
});




app.listen(process.env.PORT, () => console.log("Server is connected to: " + process.env.PORT));
