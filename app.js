class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
            return true
        }
    }
}

class BancoDados {

    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return (parseInt(proximoId) + 1);

    }

    gravarDespesa(despesaInstaciaObj) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(despesaInstaciaObj));

        localStorage.setItem('id', id);
    }
}//Gravará as despesas no localStorage

let bancoDados = new BancoDados()

function cadastrarDespesa() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        bancoDados.gravarDespesa(despesa);//recuperamos a instacia e acessamos o método gravar 
        document.getElementById('titulo_modal').innerHTML = 'Registro realiado com sucesso';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!';
        document.getElementById('button_modal').innerHTML = 'Voltar'
        document.getElementById('button_modal').className = 'btn btn-success'
        $('#registraDespesa').modal('show');
    } else {
        document.getElementById('titulo_modal').innerHTML = 'Erro na inclusão do registro';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa não cadastrada';
        document.getElementById('button_modal').innerHTML = 'Voltar e corrigir';
        document.getElementById('button_modal').className = 'btn btn-danger';
        $('#registraDespesa').modal('show');


    }

}