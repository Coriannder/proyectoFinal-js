
    let idProductoIngresado;

    function datosCantidad() {
        $('.cantidad-titulo').append(`<p> ${arrayProductos.find(item =>item.id == idProductoIngresado).producto} </p>`)
        $('.descripcion').text(arrayProductos.find(item=>item.id == idProductoIngresado).descripcion);
    }

    class ItemCarrito {
        constructor(idProducto, cantidadCarrito) {
            this.idProducto = idProducto;
            this.cantidad = cantidadCarrito;
        }

        editCantidad(cantidadNueva){
            this.cantidad = cantidadNueva;
        }
    }

    let arrayAuxiliar = JSON.parse(localStorage.getItem('carritoGuardado'));
    let arrayCarrito = new Array();

    function getCantidad(e){
        if(e.key == 'Enter'){
            agregarItem();
            generarCarrito();
        }
    }

    $("#cantidad-ingresada").keydown(getCantidad);

    $('.btn-cerrar').click(()=>{
        $('#container-cantidad').css('display', 'none');
        $('.cantidad-img').children(1).remove();
    })

    $('.btn-agregar').click(()=>{
        agregarItem();
        generarCarrito();
    });

    function agregarItem(){

        arrayAuxiliar = JSON.parse(localStorage.getItem('carritoGuardado'));
        arrayCarrito = new Array();
        if(arrayAuxiliar == null){
        }else{
            for(const articulo of arrayAuxiliar){
                arrayCarrito.push(new ItemCarrito(articulo.idProducto, parseInt(articulo.cantidad)));
            }
        }

        idProductoIngresado = arrayProductos.find(item => item.producto == $('.cantidad-titulo').last().text().trim()).id;
    
        cantidadIngresada = parseInt($('#cantidad-ingresada').val());
        
        if(isNaN(cantidadIngresada) || cantidadIngresada < 1){
                $('#cantidad-ingresada').focus();
                $('.ventana-cantidad').children('p').remove();
                $('.ventana-cantidad').append('<p style= "color: red">Valor Incorrecto</p>');
        }else{
            arrayCarrito.push(new ItemCarrito(idProductoIngresado, cantidadIngresada));
            localStorage.setItem('carritoGuardado', JSON.stringify(arrayCarrito));
            $('#container-cantidad').css('display', 'none');
            $('.ventana-cantidad').children().eq(4).remove();
            $('#cantidad-ingresada').val('1');
            $('.cantidad-img').children(1).remove();
            $('.cantidad-titulo').children().eq(1).remove();
        }
    }

