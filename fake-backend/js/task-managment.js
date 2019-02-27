$(document).ready(function () {
    const taskData = [
        {
            'id' : 'test',
            'taskName' : 'test',
            'schedule' : 'test',
            'website' : 'test'
        },
        {
            'id' : 'test',
            'taskName' : 'test',
            'schedule' : 'test',
            'website' : 'test'
        },
        {
            'id' : 'test',
            'taskName' : 'test',
            'schedule' : 'test',
            'website' : 'test'
        }
    ];

    $('#taskTable').DataTable({
        data: taskData,
        'aoColumns': [
            {'mData' : 'id'},
            {'mData' : 'taskName'},
            {'mData' : 'schedule'},
            {'mData' : 'website'},
            {
                "data": null,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<button type='button' class='btn btn-success'>Enabled</button>" +
                        "<button type='button' class='btn btn-danger'>Disabled</button>");
                }
            }
        ]
    })
});