function getData(){
    $.ajax({
      url: 'https://datos.minfin.gob.gt/api/3/action/datastore_search',  
      method: 'GET',
      data: {
        'resource_id': '105c966a-b71f-4db6-8e8e-caacca249823',
        'limit': 5
      },
      cache: true,
      dataType: 'jsonp'
    }).then(function(data) {
      console.log('data:', data);
      var result = data.result;
      console.log('Result:', result);
      console.log('Records:', result.records);      
    });
  }