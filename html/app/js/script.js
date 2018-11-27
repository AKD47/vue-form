document.addEventListener('DOMContentLoaded', function() {

    /*contacts form*/
    $('#reg-name, #reg-mail, #reg-phone, #reg-pass').unbind().blur(function () {

        var id = $(this).attr('id');
        var val = $(this).val();

        switch (id) {
            case 'reg-name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                if (val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'reg-mail':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_email.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'reg-phone':
                var rv_phone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                if (val != '' && rv_phone.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'reg-pass':
                var rv_pass = /^(?=.*[a-zA-Z0-9]).{6,}/;
                if (val != '' && rv_pass.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

        } // end switch(...)

    }); // end blur()

    $('#reg-form').on('submit', function (event) {

        var name = $('#reg-name').val(),
            email = $('#reg-mail').val(),
            phone = $('#reg-phone').val(),
            pass = $('#reg-pass').val();

        if( $('.not_error').length == 5  ) {
            $('#reg-form input:text, input:password').val('').removeClass('error').text('');
        } else {
            return false;
        }
    });
    /*close*/

    /*password*/
    $(document).on('input', '#reg-conf-pass', function (event) {
        var value = $(this).val(),
            main_passw = $(this).closest('#reg-form').find('#reg-pass');

        if( value == main_passw.val()) {
            $(this).removeClass('error').addClass('not_error');
        } else {
            $(this).removeClass('not_error').addClass('error');
        }
    });
    /*close password*/

});