$(document).ready(function () {
    const usersData = [
        {
            'username' : 'test',
            'role' : 'test'
        },
        {
            'username' : 'test',
            'role' : 'test'
        },
        {
            'username' : 'test',
            'role' : 'test'
        }
    ];

    $('#usersTable').DataTable({
        data: usersData,
        'aoColumns': [
            {'mData': 'username'},
            {'mData': 'role'},
            {
                "data": null,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<label class='badge badge-success'>Enabled</label>");
                }
            },
            {
                "data": null,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html("<button type='button' class='btn btn-success'>Edit</button>" +
                        "<button type='button' class='btn btn-primary'>Disabled</button>" +
                        "<button type='button' class='btn btn-danger'>Delete</button>");
                }
            }
        ]
    })
});