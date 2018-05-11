function graphTop() 
{
    $.get("http://localhost:3000/db/get/presupuesto", function (data, status) { 
        var arrayLength = data.length;
        var montosAsignadosEntidad = {};
        var cantidadSolicitudesEntidad = {};
        var montoTotalAsignado = 0;
        for (var i = 0; i < arrayLength; i++) {
            var nombreFederacion = data[i]["NOMBRE ENTIDAD"];
            var montoAsignado = parseInt(data[i]["ASIGNADO"]);
            if(montosAsignadosEntidad[nombreFederacion]==null){
                montosAsignadosEntidad[nombreFederacion] = montoAsignado;
                cantidadSolicitudesEntidad[nombreFederacion] = 1;
            }else{
                montosAsignadosEntidad[nombreFederacion] += montoAsignado;
                cantidadSolicitudesEntidad[nombreFederacion]++;
            }
            montoTotalAsignado += montoAsignado;
        }
        addTotalRegistro(arrayLength);
        addTotalAsignadoFederacion(montoTotalAsignado);
        drawAsignadoFederacion(montosAsignadosEntidad);
        graphSolicitudesEntidad(cantidadSolicitudesEntidad);   
    });
}
function toCurrency(nStr)
{
	return 'Q.' + nStr.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function addCommas(nStr)
{
	return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function addTotalRegistro(totalRegistros)
{
    document.getElementById("divTotalRegistros").innerHTML = "<h3>"+addCommas(totalRegistros)+"</h3>";
}
function addTotalAsignadoFederacion(totalAsignado)
{
    document.getElementById("divTotalAsignadoFederacion").innerHTML = "<h3>"+toCurrency(totalAsignado)+"</h3>";
}
function drawAsignadoFederacion(montosAsignadosEntidad){
    var contenido = "<table class=\"table table-striped\">"
									+"<thead>"
									  +"<tr>"
									  +"<th>Federación</th>"
									  +"<th>Monto Asignado</th>"
									+"</thead>"
									+"<tbody>";
    for (var entidad in montosAsignadosEntidad) {
        var contenidoRegistro = "<tr>"
                                    +"<td>"+entidad+"</td>"
                                    +"<td>"+toCurrency(montosAsignadosEntidad[entidad])+"</td>"
								+"</tr>";
		contenido = contenido + contenidoRegistro;
    }
    contenido = contenido + "</tbody></table>";
    document.getElementById("divAsignadoFederacion").innerHTML = contenido;
}
function graphSolicitudesEntidad(cantidadSolicitudesEntidad){
    var labels = [];
    var data = [];
    for (var entidad in cantidadSolicitudesEntidad) {
        labels.push(entidad);
        data.push(cantidadSolicitudesEntidad[entidad]);
    }
    debugger;
    ctx = document.getElementById("myChart").getContext('2d');
    var config = {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de Solicitudes por Federación',
                data: data,
                backgroundColor: 'rgba(0, 119, 204, 0.3)'
            }]
        }
    };
    var chart = new Chart(ctx, config);
}
graphTop();


/*****************************************Funciones para la grafica de la segunda pregunta. Gastos Gubernamentales ***************************/
function graphSpending() 
{
    $.get("http://localhost:3000/db/get/gasto", function (data, status) { 
        var arrayLength = data.length;
        var montosAsignadosEntidad = {};
        var montosAsignadosGasto = {};
        var montoTotalAsignado = 0;
        var cantidadAdjudicaciones=arrayLength;
        for (var i = 0; i < arrayLength; i++) {
            var nombreEntidad = data[i]["ENTIDAD COMPRADORA"];
            var nombreGasto=data[i]["CATEGORÍAS"]
            var montoAsignado = parseInt(data[i]["MONTO"]);
            if(montosAsignadosEntidad[nombreEntidad]==null){
                montosAsignadosEntidad[nombreEntidad] = montoAsignado;
            }else{
                montosAsignadosEntidad[nombreEntidad] += montoAsignado;
            }

            if(montosAsignadosGasto[nombreGasto]==null){
                montosAsignadosGasto[nombreGasto] = montoAsignado;
            }else{
                montosAsignadosGasto[nombreGasto] += montoAsignado;
            }
            montoTotalAsignado += montoAsignado;
        }


        addTotalAdjudicaciones(arrayLength);
        addMontoTotalAdjudicaciones(montoTotalAsignado);
        drawAdjudicacionesEntidad(montosAsignadosEntidad);
        graphTipoGastoEntidad(montosAsignadosGasto);
        /*addTotalAsignadoFederacion(montoTotalAsignado);
        drawAsignadoFederacion(montosAsignadosEntidad);
        graphSolicitudesEntidad(cantidadSolicitudesEntidad); */  
    });

}


function addTotalAdjudicaciones(totalAdjudicaciones)
{
document.getElementById("divTotalAdjudicaciones").innerHTML = "<h3>"+addCommas(totalAdjudicaciones)+"</h3>";
}

function addMontoTotalAdjudicaciones(montoTotalAdjudicado)
{
    document.getElementById("divTotalAdjudicado").innerHTML = "<h3>"+toCurrency(montoTotalAdjudicado)+"</h3>";
}

function drawAdjudicacionesEntidad(montosAsignadosEntidad){
    var contenido = "<table class=\"table table-striped\">"
									+"<thead>"
									  +"<tr>"
									  +"<th>Entidad</th>"
									  +"<th>Monto Adjudicado</th>"
									+"</thead>"
									+"<tbody>";
    for (var entidad in montosAsignadosEntidad) {
        var contenidoRegistro = "<tr>"
                                    +"<td>"+entidad+"</td>"
                                    +"<td>"+toCurrency(montosAsignadosEntidad[entidad])+"</td>"
								+"</tr>";
		contenido = contenido + contenidoRegistro;
    }
    contenido = contenido + "</tbody></table>";
    document.getElementById("divAsignadoGasto").innerHTML = contenido;
}

//Procedimiento para graficar los gastos por tipo de derrogacion.
function graphTipoGastoEntidad(montosAsignadosGasto){
    var labels = [];
    var backgroundColors=[];
    var data = [];
    for (var entidad in getSortObject(montosAsignadosGasto)) {
        labels.push(entidad);
        data.push(montosAsignadosGasto[entidad]);
        backgroundColors.push('rgba(' +getRandomInt(0,255) + ',' + getRandomInt(0,255) + ',' + getRandomInt(0,255) + '0.3)');
    }
   
    ctx = document.getElementById("myChart2").getContext('2d');
    var config = {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monto Ejecutado',
                data: data,
                backgroundColor: backgroundColors
            }]
        }
    };
    var chart = new Chart(ctx, config);
}


//Funcion que genera valores random para controlar los colores rgb
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Funcion que devuelve el top 10.
function getSortObject(montosAsignadosGasto){
var montosAsignadosGastoRetorno={};
var arreglo=[];
var longitud = 10;
for (var entidad in montosAsignadosGasto) {
    arreglo.push([entidad,montosAsignadosGasto[entidad]]);
}
arreglo.sort(function(a,b){
return b[1]-a[1];
});

if (arreglo.length< 10) {
longitud=arreglo.length;
}

for(var i=0;i<longitud;i++){
    montosAsignadosGastoRetorno[arreglo[i][0]]=arreglo[i][1];
}
return montosAsignadosGastoRetorno;
}


//Ejecuto el procedimiento.
graphSpending();