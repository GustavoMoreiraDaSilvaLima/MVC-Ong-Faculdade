const Voluntario = require('../../models/voluntarioModel');

class voluntarioController {

    //Função para acessar o perfil do voluntário
    async VoluntarioPerfil(req, res) {

    }

    //função para editar o perfil do voluntário
    async editarPerfilVoluntario(req,res){
        
    }

    async atualizarVoluntario(req,res){
        var ok = true;
        if(req.body.email != "" && req.body.nome != "" && 
        req.body.telefone != "" && req.body.desc  != '' && 
        req.body.cpf != '0') {
            let voluntario = new VoluntarioModel(0, req.body.email, 
                req.body.nome, req.body.telefone, 
                req.body.desc, req.body.cpf);

            ok = await voluntario.cadastrar_no_model();
        }
        else{       
            ok = false;
        }

        res.send({ ok: ok })
    }

    //Voluntario
    async voluntariosView(req, res) {

        const voluntario = new Voluntario();


        const listaVoluntarios = await voluntario.listar();


        res.render('voluntarios/voluntarios', { layout : "adminlayout" ,listaVoluntarios : listaVoluntarios });

    }
 
    async voluntariosDel(req, res) {
        let cj = req.body.cpf
        console.log(cj)
        const voluntario = new Voluntario();
        
        let result = await voluntario.deletar_no_model(cj)


        res.send({ok: result});

    } 


    async voluntariosAlterarView(req, res) {
        let volun = new Voluntario();
        let cpf = req.params.cpf;
        let voluntario  = await volun.voluntario_exibir_epsc(cpf); 
        res.render('voluntarios/voluntario_alterar_form', { cpf: cpf, voluntario : voluntario , layout : "adminlayout" });
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