import swal from 'sweetalert';

$('#alerta').click( () => {
    swal('Hello world');
});

$('#aws').click( () => {
    let data = {
        "x":"2", 
        "y":"2", 
        "deviceID":"45"
    }
    $.ajax({
        url: 'https://ij8qqglkn0.execute-api.us-east-2.amazonaws.com/Develop',
        type: 'POST',
        crossDomain: true,
        contentType: 'application/json',
        data: JSON.stringify({"x":"2", "y":"2", "deviceID":"45"}),
        dataType: 'json',
        success: (data) => {
            console.log(data);
            swal('Wea Actualizada');
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
            swal('Wea NO Actualizada');
        }
    });
});


