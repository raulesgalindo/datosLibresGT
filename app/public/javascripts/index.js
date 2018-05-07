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
        debugger;
        //var json = data,
            ctx = document.getElementById("myChart").getContext('2d');
        var labels = json.result.map(function (data) {
                //return data.Entidad;
            }),
            chartData = json.result.map(function (data) {
                //return data.Devengado;
            });
        var config = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Graph Line',
                    data: chartData,
                    backgroundColor: 'rgba(0, 119, 204, 0.3)'
                }]
            }
        };
        var chart = new Chart(ctx, config);
    });
}
function toCurrency(nStr)
{
	return 'Q' + nStr.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function addCommas(nStr)
{
	return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function addTotalRegistro(totalRegistros)
{
    document.getElementById("divTotalRegistros").innerHTML = addCommas(totalRegistros);
}
function addTotalAsignadoFederacion(totalAsignado)
{
    document.getElementById("divTotalAsignadoFederacion").innerHTML = toCurrency(totalAsignado);
}
function drawAsignadoFederacion(montosAsignadosEntidad){
    var contenido = "<table class=\"table table-striped\">"
									+"<thead>"
									  +"<tr>"
									  +"<th>Federacion</th>"
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
graphTop();