//Objetivo de ser uma maneira mais facil de fazer post publicos

const Voluntario = require('../models/voluntarioModel');
const VendaModel = require(`../models/vendaModel`);
const DoacaoModel = require("../models/doacaoModel");

class envioController {
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



    //Recebe Venda que forem feitas
    ReceberVenda(req, res) {

    }



    
    //Método Post/Receber Doação, cadastrar.
    async RecebaDoaCartao(req, res) {
        let cont = req.body;
        if (cont.nome != '' && cont.cpf_cnpj != '' && cont.data != '' && cont.selOpcao != 0 && cont.valor > 0 && cont.numcartao != '' && cont.numcvv != '') {
            let tipocartao = "Cartão";
            let data = new Date();
            let status = "APROVADO"
            let cartao = new DoacaoModel(0, tipocartao, data, cont.nome, cont.valor, status);

            let result = await cartao.doacao_inserir_atualizar();
            if (result) {
                res.send({
                    ok: true,
                    msg: "Doação feita com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Os serviços estão temporariamente indisponiveis"
                });
            }
        }
        else {
            res.send({
                ok: false,
                msg: "Parâmetros preenchidos incorretamente!"
            });
        }
    }
    async RecebaDoaBoleto(req, res) {
        let status = req.body.status;
        if (status) {
            let tipo = "Boleto"
            let data = new Date();
            let boleto = new DoacaoModel(0, tipo, data, null, null, status);

            let result = await boleto.doacao_inserir_atualizar();
            if (result) {
                res.send({
                    ok: true,
                    msg: "Doação feita com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Serviço indisponivel!"
                });
            }
        }
        else {
            res.send({
                ok: false,
                msg: "Fora de Area"
            });
        }

    }
    async RecebaDoaPix(req, res) {
        let status = req.body.status;
        if (status) {
            let tipo = "Pix"
            let data = new Date();
            let boleto = new DoacaoModel(0, tipo, data, null, null, status);

            let result = await boleto.doacao_inserir_atualizar();
            if (result) {
                res.send({
                    ok: true,
                    msg: "Doação feita com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Serviço indisponivel!"
                });
            }
        }
        else {
            res.send({
                ok: false,
                msg: "Fora de Area"
            });
        }
    }
    async RecebaOutraDoa(req, res) {
        cont = req.body;
        if (cont.txtnome != '' && cont.txtemail && cont.ttelefone && cont.txtcpf && cont.opcao1) {
            let tipo = "Outras";
            let data = new Date();
            let status = "Aguardando Aprovação"
            let outra = new DoacaoModel(0, tipo, data, cont.txtnome, null, status);
            let result = await outra.doacao_inserir_atualizar();
            if (result) {
                res.send({
                    ok: true,
                    msg: "Doação feita com sucesso!"
                });
            }
            else {
                res.send({
                    ok: false,
                    msg: "Serviço indisponivel!"
                });
            }
        }
    }


}

module.exports = envioController;