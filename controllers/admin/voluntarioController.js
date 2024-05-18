const Voluntario = require('../../models/voluntarioModel');

class voluntarioController {

    //Função para acessar o perfil do voluntário
    async VoluntarioPerfil(req, res) {

    }

    //função para editar o perfil do voluntário
    async editarPerfilVoluntario(req,res){
        
    }

    //Voluntario
    async voluntariosView(req, res) {

        const voluntario = new Voluntario();


        const listaVoluntarios = await voluntario.listar();


        res.render('voluntarios/voluntarios', { layout : "adminLayout" ,listaVoluntarios : listaVoluntarios });

    }

    async voluntariosDel(req, res) {
        let cj = req.body.cpf
        console.log(cj)
        const voluntario = new Voluntario();

        const listaVoluntarios = await voluntario.deletar_no_model(cj);


        res.render('voluntarios/voluntarios', { layout : "adminLayout" });

    }
    async voluntariosAlterarView(req, res) {
        let voluntario = new Voluntario();
        let lista_Vol = await voluntario.listar();
        let cj = req.params.cpf;
        res.render('voluntarios/voluntario_alterar_form', { cj: cj, lista_Vol: lista_Vol, layout : "adminLayout" });
    }

    //Seja um Voluntario View/ Cadastrar Voluntário
    async sejaViewPost(req, res) {
        if (req.body.nome != '' &&
            req.body.email != ''
            && req.body.telefone != ''
            && req.body.cpf != ''
            && req.body.sobre_voce != '') { //CPF, nome, email, telefone, desc


            if (req.body.esc == 'false') {
                let voluntario = new Voluntario(req.body.cpf, req.body.nome, req.body.email, req.body.telefone, req.body.sobre_voce);
                let result = await voluntario.cadastrar_no_model();


                if (result === "Erro: CPF já cadastrado") {
                    res.send({
                        ok: false,
                        msg: result
                    });
                }
                if (result) {
                    res.send({
                        ok: true,
                        msg: "Voluntario cadastrado com sucesso!"
                    });
                }
                else {
                    res.send({
                        ok: false,
                        msg: result
                    });
                }
            }
            else {
                let voluntario = new Voluntario(req.body.cpf, req.body.nome, req.body.email, req.body.telefone, req.body.sobre_voce);
                let result = await voluntario.alterar_no_model(req.body.cpf);

                res.send()
            }

        }
        else {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });

            if (result) {
                res.send({
                    ok: true,
                    msg: "Voluntario cadastrado com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: result
                });
            }
        }
    }
}

module.exports = voluntarioController;