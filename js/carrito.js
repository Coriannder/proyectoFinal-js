
    const urlProductos = 'json/listaProductos.json';
    $.ajax({
        url: urlProductos,
        async: false,
        type: 'GET',
        success: function(respuesta){
            arrayProductos = respuesta;
        }})

    function generarCarrito(){

        $('.ventana-carrito').empty();

        arrayAuxiliar = JSON.parse(localStorage.getItem('carritoGuardado'));
        arrayCarrito = new Array();

        if(arrayAuxiliar !== null){

            for(const articulo of arrayAuxiliar){
                arrayCarrito.push(new ItemCarrito(articulo.idProducto, articulo.cantidad));
                
            }
        }
        
        $('.ventana-carrito').append(`
                                        <button type="button" class="btn btn-outline-dark " id="btn-cerrar-carrito">X</button>
                                        <div class="col-12 carrito-encabezado">Productos</div>`
                                    )
        let total = 0;

        if(arrayCarrito !== null){
            
            let cantidadCarrito = 0;

            for(let i=0; i < arrayCarrito.length; i++){
                total += arrayCarrito[i].cantidad * arrayProductos.find(item => item.id == arrayCarrito[i].idProducto).precio;
                cantidadCarrito += arrayCarrito[i].cantidad;
                $('.ventana-carrito').append(`
                                                <div class="row carrito-item">
                                                    <div class="col-md-2 carrito-cont-img">
                                                        <img src="${arrayProductos.find(item => item.id == arrayCarrito[i].idProducto).foto}" class="carrito-img" alt="">
                                                    </div>
                                                    <div class="col-md-4 col-sm-4 carrito-nombre" id="nombre-${i}">${arrayProductos.find(item => item.id == arrayCarrito[i].idProducto).producto}</div>
                                                    <div class="col-md-3 col-sm-3 carrito-cantidad">
                                                        <p>Cantidad</p>
                                                        <input type="number" class="item-cantidad" id="cantidad-${i}">
                                                    </div>
                                                    <div class="col-sm-3 col-md-2 carrito-precio" id="precio-${i}">$ ${arrayProductos.find(item => item.id == arrayCarrito[i].idProducto).precio}</div>
                                                    <div class="col-sm-1 col-md-1 carrito-eliminar" >
                                                        <img src="img/botones/btn-eliminar-producto.png" class="btn-eliminar" id="eliminar-${i}" alt="">
                                                    </div>
                                                </div>`
                )
                let cantidad = arrayCarrito[i].cantidad;
                let precio = arrayProductos.find(item => item.producto == $(`#nombre-${i}`).text()).precio;
                
                $(`#precio-${i}`).text("$ "+ (cantidad*precio))
                $(`#cantidad-${i}`).val(cantidad).change((e)=>{
                    cantidad = parseInt($(e.target).val());
                    if(cantidad < 1 || isNaN(cantidad)){
                        $(`#cantidad-${i}`).val(1);
                    }else{
                        precio = arrayProductos.find(item => item.producto == $(`#nombre-${i}`).text()).precio;
                        sessionStorage.setItem('total-valor', precio*cantidad);
                        console.log(precio*cantidad);
                        $(`#precio-${i}`).text("$ "+ (cantidad*precio))
                        arrayCarrito[i].editCantidad(cantidad);
                        localStorage.setItem('carritoGuardado', JSON.stringify(arrayCarrito));
                        generarCarrito();
                    }
                })

                $(`#eliminar-${i}`).click(()=>{
                    arrayCarrito.splice(i,1);
                    localStorage.setItem('carritoGuardado', JSON.stringify(arrayCarrito));
                    generarCarrito();
                })
            }

            $('.ventana-carrito').append(`<div class="carrito-total">
                                            <button type="button" min="0" class="btn btn-success btn-comprar">Comprar</button>
                                            <p>Total</p>
                                            <span id="total-compra">$ ${total}</span>
                                        </div>`);
            if(cantidadCarrito != 0){
                $('#circulo-rojo').text(cantidadCarrito).show();
            }else{
                $('#circulo-rojo').hide();
            }
        }
        sessionStorage.setItem('total-valor', total);
        $('#btn-cerrar-carrito').click(()=>{
            $('.container-carrito').slideUp().css('display', 'none');
            $('.container-producto').slideDown().css('display', 'flex');
        })
        $('#btn-carrito').click(()=>{
            generarCarrito();
            $('.container-carrito').fadeIn('slow').css('display', 'flex');
            $('.container-producto').css('display', 'none');
        })
        $('#ingresar').off('click mouseover');
        $('.btn-comprar').click(()=>{
            $('.container-compra').css('display', 'flex');
            $('.container-carrito').hide();
            $('.total-valor').text('$ ' + sessionStorage.getItem('total-valor'));
            $('.compra-usuario').text(sessionStorage.getItem('nombre'));
        })
    }