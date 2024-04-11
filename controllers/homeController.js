const Voluntario = require(`../models/voluntarioModel`)

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


    sejaView(req, res) {
        res.render('form');
    }

    async voluntariosView(req,res){

            const voluntario = new Voluntario();

            
            const listaVoluntarios = await voluntario.listar();

            
            res.render('voluntarios', {listaVoluntarios: listaVoluntarios});
        
    }


    sejaViewPost(req,res){
        if(req.body.nome != '' &&
         req.body.email != '' 
         && req.body.telefone != '' 
         && req.body.cpf != ''
         && req.body.sobre_voce != '')
        { //CPF, nome, email, telefone, desc
            let voluntario = new Voluntario(req.body.cpf, req.body.nome, req.body.email, req.body.telefone, req.body.sobre_voce);
            let result = voluntario.cadastrar_no_model();

            if(result) {
                res.send({
                    ok: true,
                    msg: "Pedido realizado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: "Erro ao realizar pedido!"
                });
            }
        }
        else
        {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }
}

//permite que a classe homeController seja importado
module.exports = HomeController;