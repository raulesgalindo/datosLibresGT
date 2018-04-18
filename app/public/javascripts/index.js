function getData(){
    $.ajax({
      url: 'https://datos.minfin.gob.gt/api/3/action/datastore_search',  
      method: 'GET',
      data: {
        'resource_id': '105c966a-b71f-4db6-8e8e-caacca249823',
        'limit': 5
      },
      cache: true,
      dataType: 'jsonp',
      success: function(data){
        var result = data.result;
        console.log('Records:', result.records);     
        $.ajax({
          url: 'http://localhost:3000/db/insert/presupuesto',  
          method: 'POST',
          data: JSON.stringify(result.records),
          contentType: "application/json",
          success: function(data) {
            console.log('Inserted');
          },
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

