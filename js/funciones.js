$('#btn_consultar').click(function() {
    fn_obtenerValor();
})

$('#btn_consultarClima').click(function() {
    fn_obtenerClima();
})

// MOUSE OVER: EVENTO QUE SE DESENCADENA AL PASAR EL MOUSE POR ENCIMA
$('#txt_indicador').mouseover(function() {
    $('#txt_indicador').addClass('is-valid');
})

// MOUSE OUT: EVENTO QUE SE DESENCADENA AL SALIR CON EL MOUSE DE UN CONTROL
$('#txt_indicador').mouseout(function() {
    $('#txt_indicador').removeClass('is-valid');
})

// KEY DOWN: EVNETO QUE SE DESENCADENA AL PRESIONAR (HACIA ABAJO) UNA TECLA.
// E: ENTREGA INFORMACIÓN DEL EVENTO. EN ESTE CASO LO UTILIZAMOS PARA SABER LA TECLA QUE SE PRESIONÓ
$('#txt_indicador').keydown(function(e) {
    console.log(e.keyCode);

    if(e.keyCode == 13 || e.keyCode == 9 || e.keyCode == 'enter' || e.keyCode == 'tab') {
        var valor = $('#txt_indicador').val();

        //CASO DE QUE LA API RESPONDA DE FORMA CORRECTA (STATUS CODE 200, 201, 202)
        $.getJSON('https://api.gael.cloud/general/public/monedas/' + valor, function(data) {

            if(data.Valor == undefined) {
                $('#txt_valorObtenido').val(data.message);
            } else {
                $('#txt_valorObtenido').val(data.Valor);
            }
        //CASO DE QUE LA API RESPONDA CON ERROR (STATUS CODE 500)
        }).fail(function() {
            $('#txt_valorObtenido').val("EL VALOR INGRESADO NO ARROJÓ INFORMACIÓN");
        });
    }
});

$('#txt_indicador').keyup(function(e) {
    var valor = $('#txt_indicador').val();

    if(valor.length > 3){
        valor = valor.substring(0, 3);
    }
    
    $('#txt_indicador').val(valor);
});




function fn_obtenerValor() {
    $.getJSON('https://mindicador.cl/api', function(data) {
        var indicadores = data;
        var seleccion = $('#cmb_indicador option:selected').text();
        var valor = '';

        if(seleccion.toUpperCase() == 'DÓLAR') {
            valor = 'Dólar: ' + indicadores.dolar.valor;
        } else if(seleccion.toUpperCase() == 'EURO') {
            valor = 'Euro: ' + indicadores.euro.valor;
        } else if(seleccion.toUpperCase() == 'UF') {
            valor = 'UF: ' + indicadores.uf.valor;
        } else {
            valor = "Debe seleccionar un valor";
        }

        $('#txt_valor').val(valor);        
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
}

function fn_obtenerClima() {
    $.getJSON('https://api.gael.cloud/general/public/clima', function(data) {
        var climas = data;
        $("#listaClimas").empty();

        for (x of climas) {
           $("#listaClimas").append("<li>" + x.Estacion 
                + " - " + x.Temp + "° - " + x.Estado + "</li>")
        }

        $('#txt_valor').val(valor);        
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
}