const exp = require("constants");
const express = require("express");
const app = express();


//routers
const router = require("./routes/routes");
const searchRouter = require('./routes/items');


const path = require("path");
const { title } = require("process");
const { error } = require("console");


//views stuff
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));


//post stuff
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use(router);
app.use(searchRouter);


//not found page
app.all('*', (req, res) => {
     res.locals.message = 'page not found';
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(404).render('error', { 
        title : 'error'
     });
});

//error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error", {
        title: "error",
    });
});



app.listen(3000);