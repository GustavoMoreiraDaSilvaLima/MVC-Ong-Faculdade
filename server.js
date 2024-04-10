const express = require('express')
const expressEjsLayout = require('express-ejs-layouts');
let homeRoute = require("./routes/homeRoute");
let loginRoute = require("./routes/loginRoute");
let doacaoRoute = require("./routes/doacaoRoute");
const app = express();

//configura o ejs como view engine da nossa aplicação

//configura a localização da pasta views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"))
app.use(expressEjsLayout);


//configura as rotas existentes no nosso sistema
app.use("/",  homeRoute);
app.use("/login", loginRoute);
app.use("/doacao",doacaoRoute);



//inicia o nosso servidor web
app.listen(5000, function() {
    console.log("servidor web iniciado")
})