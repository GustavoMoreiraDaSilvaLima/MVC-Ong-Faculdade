const express = require('express')
const expressEjsLayout = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
let voluntarioRoute = require("./routes/voluntario/voluntarioRoute");
//Rotas de admin
let VoluntarioRoute = require("./routes/admin/VoluntarioRoute");
let AdminRoute = require("./routes/admin/adminRoute");
let LoginRouter = require('./routes/loginRoute');

const app = express();

//configura o ejs como view engine da nossa aplicação

//configura a localização da pasta views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./adminLayout");
app.use(cookieParser());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressEjsLayout);


//configura as rotas existentes no nosso sistema
app.use("/", AdminRoute);
app.use("/login", LoginRouter);
app.use("/voluntario", voluntarioRoute);

app.use("/admin/voluntario", VoluntarioRoute);

global.CAMINHO_IMG_EVENTO = "/img/evento/"
global.CAMINHO_IMG_BROWSER = "/img/produtos/"
global.CAMINHO_IMG_NOTICIAS = "/img/noticias/"
global.RAIZ_PROJETO = __dirname;

 

//inicia o nosso servidor web
app.listen(5000, function () {
    console.log("servidor web iniciado")
})