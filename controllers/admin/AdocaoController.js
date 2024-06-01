class AdocaoController{

    AdocaoView(req,res){
        res.render(`admin/adminEmDesenvolvimento`, { layout : `admin/adminEmDesenvolvimento`})
    }
 
}

module.exports = AdocaoController;