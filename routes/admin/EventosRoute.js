const express = require('express');
const AutenticacaoMiddleware = require('../../middlewares/autenticacaoMiddleware');
const multer = require('multer');
const EventoController = require('../../controllers/admin/eventosController');

const autent = new AutenticacaoMiddleware();
const EventoRouter = express.Router();

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/img/evento");
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.split(".").pop();
        //ou
        //
        //let ext = file.originalname.split(".").slice(-1)[0]
        let novoNome = Date.now().toString() + "." + ext;
        cb(null, novoNome);
    }
})
let upload = multer({storage});

let ctrl = new EventoController();

EventoRouter.get('/', autent.NivelPermissaoAdm, ctrl.EventosView);
EventoRouter.get('/cadastrar', autent.NivelPermissaoAdm, ctrl.EventosCadastrarView);
EventoRouter.get('/alterar/:id',autent.NivelPermissaoAdm, ctrl.EventosAlterView);
EventoRouter.get("/registro/:tipo",autent.NivelPermissaoAdm,ctrl.EventoRegistarLista);
EventoRouter.post('/cadastrar',autent.NivelPermissaoAdm, upload.single("imagem"),ctrl.EventosCadastrar);
EventoRouter.post("/alterar",autent.NivelPermissaoAdm,upload.single("imagem"), ctrl.EventosAlterar);
EventoRouter.post('/excluir', autent.NivelPermissaoAdm, ctrl.EventoExcluir);


module.exports = EventoRouter;
