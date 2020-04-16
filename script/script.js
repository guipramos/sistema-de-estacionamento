document.getElementById("formulario").addEventListener("submit", cadastrarVeiculo)

function cadastrarVeiculo(e){


    var modelo_carro = document.getElementById("model-veiculo").value;

    var placa_carro = document.getElementById("placa-veiculo").value;

    var timeAtual = new Date();

    if(modelo_carro == "" && placa_carro == ""){
        alert("Favor, preencha os campos em branco!");
        return false;
    }

    carro = {
        modelo: modelo_carro,
        placa:  placa_carro,
        hora: timeAtual.getHours(),
        minutos: timeAtual.getMinutes() 
    }



    if(localStorage.getItem('patio2') == null){
        var carros = [];
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros));
    }else{
        var carros = JSON.parse(localStorage.getItem('patio2'));
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros));
    }

    document.getElementById("formulario").reset();
    mostraPatio();
    e.preventDefault();
}

function apagarVeiculo(placa){
    var carros = JSON.parse(localStorage.getItem('patio2'));

    for(var i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }
        localStorage.setItem('patio2', JSON.stringify(carros));
    }

    mostraPatio();
}

/* EDITAR */

function editarVeiculo(){
    document.querySelector(".campo-editar").style.display = "block";
    var valorModeloCarro = document.querySelector(".modeloEditar").value;
    var valorPlacaCarro = document.querySelector(".placaEditar").value;


}


function mostraPatio(){
    var carros = JSON.parse(localStorage.getItem('patio2'));
    var carrosResultado = document.getElementById("resultados");

    carrosResultado.innerHTML = "";

    for(var i = 0; i < carros.length; i++){
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;

        carrosResultado.innerHTML += '<tr><td>' + modelo + 
                                '</td><td>' + placa +
                                '</td><td>' + hora + ':' + minutos +
                                '</td><td><button class="btn btn-danger" onclick="apagarVeiculo(\'' + placa + '\')">Excluir</button>' +
                                '</td><td><button class="btn btn-primary" onclick="editarVeiculo(\'' + modelo + placa + '\')">Edit</button></td>' +
                                '</tr>'
    }
}



