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
    recuperarTodosRegistros() {

        //Array despesas
        let despesas = Array()

        //id do localStorage
        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradasem localStorage
        for (let i = 1; i <= id; i++) {
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i));

            //existe a possibilidade de existir índices que foram pulados/removidos
            //neste caso vamos pular esse índices
            if (despesa === null) {
                continue
            }

            despesa.id = i;
            despesas.push(despesa);
        }
        return despesas;
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)
        console.log(despesasFiltradas)

        //Vamos aplicar filtro em todos os campos do formulário - Ano, mês, dia... 

        //ano
        if (despesa.ano != '') {
            console.log('filtro ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if (despesa.mes != '') {
            console.log('filtro mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if (despesa.dia != '') {
            console.log('filtro dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if (despesa.tipo != '') {
            console.log('filtro tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descricão
        if (despesa.descricao != '') {
            console.log('filtro descrição')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if (despesa.valor != '') {
            console.log('filtro valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
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
        document.getElementById('titulo_modal').innerHTML = 'Registro realizado com sucesso';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso!';
        document.getElementById('button_modal').innerHTML = 'Voltar'
        document.getElementById('button_modal').className = 'btn btn-success'
        $('#registraDespesa').modal('show');
        limparDados()
    } else {
        document.getElementById('titulo_modal').innerHTML = 'Erro na inclusão do registro';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa não cadastrada';
        document.getElementById('button_modal').innerHTML = 'Voltar e corrigir';
        document.getElementById('button_modal').className = 'btn btn-danger';
        $('#registraDespesa').modal('show');


    }

    function limparDados() {
        let ano = document.getElementById('ano').value = ''
        let mes = document.getElementById('mes').value = ''
        let dia = document.getElementById('dia').value = ''
        let tipo = document.getElementById('tipo').value = ''
        let descricao = document.getElementById('descricao').value = ''
        let valor = document.getElementById('valor').value = ''
    }

}

function carregarListaDespesa(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
        despesas = bancoDados.recuperarTodosRegistros()
    }

    //Selecionando o tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    //percorer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d){

        //criação das linhas
        let linha = listaDespesas.insertRow()
        
        //criação de colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //ajuste do tipo
        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        
        //criar o botão para excluir
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class = "fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_', '')
            console.log(d)
            console.log(id)
            bancoDados.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        

    });
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bancoDados.pesquisar(despesa)

    this.carregarListaDespesa(despesas, true)
}