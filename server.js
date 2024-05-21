const express = require('express')
const expressEjsLayout = require('express-ejs-layouts');
let homeRoute = require("./routes/homeRoute");
let enviosRoute = require("./routes/enviosRoute");
let voluntarioRoute = require("./routes/voluntario/voluntarioRoute");
let vitrineRoute = require("./routes/vitrineRoute")
let produtoRoute = require("./routes/produtoRoute")
//Rotas de admin
let VoluntarioRoute = require("./routes/admin/VoluntarioRoute");
let EventosRoute = require("./routes/admin/EventosRoute");
let NoticiaRoute = require("./routes/admin/NoticiaRoute");
let ParceiroRoute = require("./routes/admin/ParceiroRoute");
let PatrimonioRoute = require("./routes/admin/PatrimonioRoute");
let ProdutoRouteAdmin = require("./routes/admin/ProdutoRoute");
let VendaRoute = require("./routes/admin/VendaRoute");
let DoacaoRoute = require("./routes/admin/DoacaoRoute");
let AdminRoute = require("./routes/admin/adminRoute");
let ProjetoRoute = require("./routes/admin/ProjetoRoute");
let CaixaRoute = require("./routes/admin/CaixaRoute");
const app = express();

//configura o ejs como view engine da nossa aplicação

//configura a localização da pasta views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressEjsLayout);


//configura as rotas existentes no nosso sistema
app.use("/", homeRoute);
app.use("/send", enviosRoute);//Envio dos forms publicos
app.use("/voluntario", voluntarioRoute);
app.use("/produtos", vitrineRoute);
app.use("/produto", produtoRoute);

//Rotas especifacas para admin
app.use("/admin",AdminRoute);
app.use("/admin/voluntario", VoluntarioRoute);
app.use("/admin/eventos",EventosRoute);
app.use("/admin/noticia",NoticiaRoute);
app.use("/admin/parceiro",ParceiroRoute);
app.use("/admin/patrimonio",PatrimonioRoute);
app.use("/admin/produto",ProdutoRouteAdmin);
app.use("/admin/venda",VendaRoute);
app.use("/admin/doacao", DoacaoRoute);
app.use("/admin/projeto",ProjetoRoute);
app.use("/admin/caixa",CaixaRoute);


global.CAMINHO_IMG_BROWSER = "/img/produtos/"
global.RAIZ_PROJETO = __dirname;

 

//inicia o nosso servidor web
app.listen(5000, function () {
    console.log("servidor web iniciado")
})