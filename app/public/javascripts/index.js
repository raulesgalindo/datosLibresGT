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