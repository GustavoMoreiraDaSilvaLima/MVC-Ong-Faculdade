const MarcaModel = require("../../models/MarcaModel");

class MarcaController {

    async listarView(req, res) {
        let marca = new MarcaModel();
        let lista = await marca.listarMarcas();
        res.render('admin/adminmarcalistar', {lista: lista, layout : "adminlayout"});
    }
}

module.exports = MarcaController;