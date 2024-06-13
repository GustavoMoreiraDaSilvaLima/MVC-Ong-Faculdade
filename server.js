const express = require('express')
const expressEjsLayout = require('express-ejs-layouts');
const cookieParser = require("cookie-parser");
let homeRoute = require("./routes/homeRoute");
let enviosRoute = require("./routes/enviosRoute");
let voluntarioRoute = require("./routes/voluntario/voluntarioRoute");
let vitrineRoute = require("./routes/vitrineRoute")
let produtoRoute = require("./routes/produtoRoute")
let pedidoRoute = require("./routes/pedidoRoute")
//Rotas de admin
let VoluntarioRoute = require("./routes/admin/VoluntarioRoute");
let pedidoRouter = require("./routes/admin/pedidoRoute")
let AdocaoRoute = require("./routes/admin/AdocaoRoute")
let EventosRoute = require("./routes/admin/EventosRoute");
let NoticiaRoute = require("./routes/admin/NoticiaRoute");
let ParceiroRoute = require("./routes/admin/ParceiroRoute");
let PatrimonioRoute = require("./routes/admin/PatrimonioRoute");
let ProdutoRouteAdmin = require("./routes/admin/ProdutoRoute");
let CategoriaRoute = require("./routes/admin/CategoriaRoute");
let MarcaRoute = require("./routes/admin/MarcaRoute");
let VendaRoute = require("./routes/admin/VendaRoute");
let DoacaoRoute = require("./routes/admin/DoacaoRoute");
let AdminRoute = require("./routes/admin/adminRoute");
let ProjetoRoute = require("./routes/admin/ProjetoRoute");
let CaixaRoute = require("./routes/admin/caixaRoute");
let LoginRouter = require('./routes/loginRoute');

const app = express();

//configura o ejs como view engine da nossa aplicação

//configura a localização da pasta views
app.set("views", "./views");
app.set("view engine", "ejs");
app.set("layout", "./layout");
app.use(cookieParser());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressEjsLayout);


//configura as rotas existentes no nosso sistema
app.use("/", homeRoute);
app.use("/send", enviosRoute);//Envio dos forms publicos
app.use("/login", LoginRouter);
app.use("/voluntario", voluntarioRoute);
app.use("/produtos", vitrineRoute);
app.use("/produto", produtoRoute);
app.use("/pedido", pedidoRoute)

//Rotas especifacas para admin
app.use("/admin",AdminRoute);
app.use("/admin/pedidos", pedidoRouter)
app.use("/admin/voluntario", VoluntarioRoute);
app.use("/admin/adocao", AdocaoRoute);
app.use("/admin/eventos",EventosRoute);
app.use("/admin/noticias",NoticiaRoute);
app.use("/admin/parceiro",ParceiroRoute);
app.use("/admin/patrimonio",PatrimonioRoute);
app.use("/admin/produto",ProdutoRouteAdmin);
app.use("/admin/produto/categoria",CategoriaRoute);
app.use("/admin/produto/marca",MarcaRoute);
app.use("/admin/venda",VendaRoute);
app.use("/admin/doacao", DoacaoRoute);
app.use("/admin/projeto",ProjetoRoute);
app.use("/admin/caixa",CaixaRoute);

global.CAMINHO_IMG_EVENTO = "/img/evento/"
global.CAMINHO_IMG_BROWSER = "/img/produtos/"
global.CAMINHO_IMG_NOTICIAS = "/img/noticias/"
global.RAIZ_PROJETO = __dirname;

 

//inicia o nosso servidor web
app.listen(5000, function () {
    console.log("servidor web iniciado")
})