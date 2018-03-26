import swal from 'sweetalert';

$('#alerta').click( () => {
    swal('Hello world');
});

$('#aws').click( () => {

    swal({
        title: "Confirmar Registro",
        text: "Verifica que los datos sean correctos",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    .then((willSend) => {

        if (willSend) {

            let data = {
                "x": document.getElementById("x").value, 
                "y": document.getElementById("y").value, 
                "deviceID": document.getElementById("device").value,
                "name": document.getElementById("name").value,
                "age": document.getElementById("age").value,
                "curp": document.getElementById("curp").value,
                "tel": document.getElementById("tel").value,
                "turist": $("#turist").prop('checked'), 
            }

            console.log(data);
        
            $.ajax({
                url: 'https://ij8qqglkn0.execute-api.us-east-2.amazonaws.com/Develop/register',
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: (data) => {
                    if (data === 'ok')
                        swal("Visitante Registrado", {icon: "success",});
                    else
                        swal("Error en el registro", {icon: "error",});

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(thrownError);
                    swal("Error en el registro", {icon: "error",});
                }
            });

        } else {
            swal("Registro cancelado", {icon: "error",});
        }
    });

    
});


