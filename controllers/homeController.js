
class HomeController {

    //método responsável por devolver o html
    homeView(req, res) {
        res.render('home', { carros: ["corolla", "fusca", "uno com escada", "del rey"] });
    }

    QuemSomosView(req, res) { // OKOKOKOKOKOKOKOKOK
        res.render('QuemSomos');
    }

    NoticiaView(req, res) {
        res.render('noticias');
    }

}

//permite que a classe homeController seja importado
module.exports = HomeController;