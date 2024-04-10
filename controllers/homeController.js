
class HomeController {

    //método responsável por devolver o html
    homeView(req, res) {
        res.render('home');
    }

    QuemSomosView(req, res) { // OKOKOKOKOKOKOKOKOK
        res.render('QuemSomos');
    }

    NoticiaView(req, res) {
        res.render('noticias');
    }
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
        res.render('formas_pagamento/pix', { layout: 'formas_pagamento/pix' })
    }
}

//permite que a classe homeController seja importado
module.exports = HomeController;