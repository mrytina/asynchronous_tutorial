const express = require('express'); // web application framework for node
const http = require('http'); // to create an http server
const bodyParser = require('body-parser'); // middleware (manipulates req, and res objects) used for body parsing like in posts
const cookieParser = require('cookie-parser');// middleware for cookies
const session = require('express-session'); // middleware for sessions
const controllers = require('./src/controllers'); // controllers
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'pug'); // template engine to use by default
app.set('views', './src/views'); // views folder path
app.use('/node_modules', express.static('node_modules')); // serve static content from node_modules folder and url /node_modules
app.use('/dist', express.static('target/dist')); // serve static content from dist folder and url /dist
app.use('/js', express.static('js'));
app.use(cookieParser()); // parses cookies
app.use(bodyParser.json()); // parses application/json
app.use(bodyParser.urlencoded({extended: true})); // parses application/x-www-form-urlencoded
app.use(session({secret: 'node framework', saveUninitialized: true, resave: true})); // session

controllers(app);

const server = http.createServer(app);

server.listen(PORT, function() {
    console.log('Server listening on port ', PORT);
});