const exp = require("constants");
const express = require("express");
const app = express();

const router = require("./routes/routes");

const path = require("path");
const { title } = require("process");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use(router);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error", {
        title: "error",
    });
});

app.listen(3000);
