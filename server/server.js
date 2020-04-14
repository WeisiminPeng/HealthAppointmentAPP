let express = require('express'),
    app = express(),
<<<<<<< HEAD
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');



//Connect to local MongoDB collection Assignment8
mongoose.connect('mongodb://localhost:27017/HealthAppointmentAPP', {});
=======
    port = process.env.PORT || 3000, 
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//Connect to local MongoDB collection Assignment8
mongoose.connect('mongodb://localhost:27017/HealthAppointmentAPP', {
    // useMongoClient: true
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
mongoose.Promise = global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS
<<<<<<< HEAD
app.use(function(req, res, next) {
=======
app.use(function (req, res, next) {
>>>>>>> 02f40859851a15e612243d518e6e9587f4edad06
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Initialize app
let initApp = require('./app/app');
initApp(app);

app.listen(port);
console.log('HealthAppointmentAPP RESTful API server started on: ' + port);