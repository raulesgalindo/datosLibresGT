function insertData() {
    $.ajax({
        url: 'https://datos.minfin.gob.gt/api/3/action/datastore_search_sql',
        method: 'GET',
        data: {
            'sql': 'SELECT * FROM "105c966a-b71f-4db6-8e8e-caacca249823"'
        },
        cache: true,
        dataType: 'jsonp',
        success: function (data) {
            var result = data.result;
            console.log('Records inserted:', result.records.length);
            $.ajax({
                url: 'http://localhost:3000/db/insert/presupuesto',
                method: 'POST',
                data: JSON.stringify(result.records),
                contentType: "application/json",
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                  console.log(errorThrown);
                }
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(errorThrown);
        }
    });
}

function graphTop() {
    $.get("http://localhost:3000/db/get/presupuesto", function (data, status) {
        var json = data,
            ctx = document.getElementById("myChart").getContext('2d');
        var labels = json.result.map(function (data) {
                console.log(data);
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