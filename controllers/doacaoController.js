const DoacaoModel = require(`../models/doacaoModel`)
class doacaoController{
    DoacaoView(req, res) {
        res.render('doacao');
    }
    DoaCartaoView(req, res) {
        res.render('formas_pagamento/cartao', { layout: 'formas_pagamento/cartao' });
    }
    DoaBoletoView(req, res) {
        res.render('formas_pagamento/boleto', { layout: 'formas_pagamento/boleto' });
    }
    DoaPixView(req, res) {
        res.render('formas_pagamento/pix', { layout: 'formas_pagamento/pix' });
    }
    RecebaDoaCartao(req,res){
        
    }
    RecebaDoaBoleto(req,res){

    }
    RecebaDoaPix(req,res){

    }
}

module.exports = doacaoController;