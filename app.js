require("dotenv").config();

const mongoose = require("mongoose");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
const http = require('http')
var swaggerJSDoc = require('swagger-jsdoc');




var CompanyRouter = require('./routes/companyRouter');
var UserRouter = require('./routes/userRouter');
var adminRouter = require('./routes/admin');
var AssociationRouter = require('./routes/Association');
var ArtictleRouter = require('./routes/articlesRouter');

var app = express();



//////////////////swagger

// swagger definition
const swaggerUi = require('swagger-ui-express');
var swaggerDefinition = {
    info: {
        ImageBitmap: './logo.png',
        title: 'Showapp Application',
        version: 'V1.0',
        description: 'Private showroom ',
    },
    host: 'backend-showapp.herokuapp.com',
    //host: '127.0.0.1:3000',
    basePath: '/',
};
// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./swagger.yml'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

/////////////////fin swagger
//connect with front
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))

//connection to data base 

// local
// mongoose.connect(process.env.DATABASELOCAL_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to DataBase local"));



//cloud atlas
mongoose.connect("mongodb+srv://Ghassen:Ghassen1998@cluster0.fbk4z.mongodb.net/Ghassen", { useNewUrlParser: true }, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});



//URL path

app.use("/users", UserRouter);
app.use("/company", CompanyRouter);
app.use("/Association", AssociationRouter);
app.use("/Article", ArtictleRouter);
app.use("/admin", adminRouter)
app.use('/images', express.static(path.join(__dirname, 'images')))



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.json({
        message: err.message,
        error: req.app.get("env") === "development" ? err : {},
    });
    // render the error page
    res.status(err.status || 500);
});







module.exports = app;