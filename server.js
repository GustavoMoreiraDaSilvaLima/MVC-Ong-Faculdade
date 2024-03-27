const express = require('express');
const expressEjsLayout = require('express-ejs-layouts');

const app = express();

//Configurações das Views
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "./layout");

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(expressEjsLayout);
app.use(express.static("public"));

const homeRoute = require("./routes/homeRoute");
const adminRoute = require("./routes/adminRoute");
const voluntarioRoute = require("./routes/voluntarioRoute");

app.use("/", homeRoute);
app.use("/admin", adminRoute);
app.use("/voluntario", voluntarioRoute)


app.listen(5000, () => {
    console.log("servidor web iniciado");
});