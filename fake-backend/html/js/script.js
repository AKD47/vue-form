$(document).ready(function () {
   const productsData = [
       {
            'id' : 'test',
             'name' : 'test',
             'category' : 'test',
             'cost' : 'test'

       },
       {
           'id' : 'test',
           'name' : 'test',
           'category' : 'test',
           'cost' : 'test'

       },
       {
           'id' : 'test',
           'name' : 'test',
           'category' : 'test',
           'cost' : 'test'

       }

   ];

  $('#productsTable').DataTable({
        data: productsData,
        'aoColumns': [
            {'mData': 'id'},
            {'mData': 'name'},
            {'mData': 'category'},
            {'mData': 'cost'}
        ]
    });


});