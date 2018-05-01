import swal from 'sweetalert';

$('#alerta').click( () => {
    swal('Hello world');
});

$('#btnRegistrar').click( () => {    
    
    document.getElementById('actionChooser').style="visibility: hidden";
    document.getElementById('registerForm').style="visibility: visible";
});

$('#btnFinalizar').click( () => {
    document.getElementById('actionChooser').style="visibility: hidden";
    document.getElementById('finalizeForm').style="visibility: visible";
});

$('#btnTerminarVisita').click( () => {

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
                "deviceID": document.getElementById('deviceID').value,
                "fechaSalida": new Date().toLocaleString()
            };
        
            $.ajax({
                url: 'https://6tsqyoqtvg.execute-api.us-east-2.amazonaws.com/develop/exitvisitor' ,
                type: 'POST',
                crossDomain: true,
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                success: (data) => {
                    if (data) {
                        console.log(data);
                        swal("Salida exitosa", {icon: "success",});
                        document.getElementById('finalizeForm').style="visibility: hidden";
                        document.getElementById('actionChooser').style="visibility: visible";  
                    }
                    else
                        swal("Error en la salida", {icon: "error",});

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log(thrownError);
                    swal("Error en la salida", {icon: "error",});
                }
            });

        } else {
            swal("Finalización cancelada", {icon: "error",});
        }
    });  
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
            // Get coordinates from chosen building            
            let coord_x, coord_y, coords;
            coords = getBuildingCoords();
            coord_x = coords.x.toString();
            coord_y = coords.y.toString();

            let data = {
                "x": coord_x,
                "y": coord_y,
                "deviceID": document.getElementById("device").value,
                "name": document.getElementById("name").value,
                "age": document.getElementById("age").value,
                "curp": document.getElementById("curp").value,
                "tel": document.getElementById("tel").value,
                "registro": new Date().toLocaleString()
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
                    if (data === 'ok') {
                        swal("Visitante Registrado", {icon: "success",});
                        document.getElementById('registerForm').style="visibility: hidden";
                        document.getElementById('actionChooser').style="visibility: visible";
                    }
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

var getBuildingCoords = () => {
    let coordX, coordY;    
    let selector = document.getElementById('buildingChooser');    
    let selectedBuilding = selector.options[selector.selectedIndex].label;

    switch (selectedBuilding) {
        case 'Edificio A':
            coordX = 5;
            coordY = 4;
            break;        
        case 'Edificio B':
            coordX = 3;
            coordY = 9;
            break;
        case 'Edificio C':
            coordX = 6;
            coordY = 12;
            break;
        case 'Edificio D':
            coordX = 6;
            coordY = 16;
            break;
        case 'Edificio E':
            coordX = 14;
            coordY = 15;
            break;
        case 'Edificio F':
            coordX = 12;
            coordY = 12;
            break;
        case 'Edificio G':
            coordX = 16;
            coordY = 10;
            break;
        case 'Edificio H':
            coordX = 12;
            coordY = 6;
            break;
        case 'Edificio K':
            coordX = 15;
            coordY = 2;
            break;
        default:
            break;
    }

    return {
        x: coordY,
        y: coordX
    };
}


