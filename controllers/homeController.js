const Voluntario = require(`../models/voluntarioModel`)

class HomeController {

    homeView(req, res) {
        res.render('home');
    }

    QuemSomosView(req, res) {
        res.render('QuemSomos');
    }


    sejaView(req, res) {
        res.render('form');
    }

    async voluntariosView(req,res){

            const voluntario = new Voluntario();

            
            const listaVoluntarios = await voluntario.listar();

            
            res.render('voluntarios/voluntarios', {listaVoluntarios: listaVoluntarios});
        
    }

    async voluntariosAlterarView(req,res){
        let voluntario = new Voluntario();
        let lista_Vol = await voluntario.listar();
        let cj = req.params.cpf;
        res.render('voluntarios/voluntario_alterar_form', { cj:cj , lista_Vol : lista_Vol});
    }   


    async sejaViewPost(req,res){
        if(req.body.nome != '' &&
         req.body.email != '' 
         && req.body.telefone != '' 
         && req.body.cpf != ''
         && req.body.sobre_voce != '')
        { //CPF, nome, email, telefone, desc


            if(req.body.esc == 'false'){
                let voluntario = new Voluntario(req.body.cpf, req.body.nome, req.body.email, req.body.telefone, req.body.sobre_voce);
                let result = await voluntario.cadastrar_no_model();


                if(result === "Erro: CPF já cadastrado")
                {
                    res.send({
                        ok: false,
                        msg: result
                    });
                }
                if(result) {
                    res.send({
                        ok: true,
                        msg: "Voluntario cadastrado com sucesso!"
                    });
                }   
                else{
                    res.send({
                        ok: false,
                        msg: result
                    });
                }                
            }
            else{
                let voluntario = new Voluntario(req.body.cpf, req.body.nome, req.body.email, req.body.telefone, req.body.sobre_voce);
                let result = await voluntario.alterar_no_model(req.body.cpf);

                res.send()
            }

        }
        else
        {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
            
            if(result) {
                res.send({
                    ok: true,
                    msg: "Voluntario cadastrado com sucesso!"
                });
            }   
            else{
                res.send({
                    ok: false,
                    msg: result
                });
            }                
        }
    }
}

//permite que a classe homeController seja importado
module.exports = HomeController;