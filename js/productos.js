
let arrayProductos = new Array();

$(document).ready(()=>{


    let login = sessionStorage.getItem('login');
    if(login == 'true'){
        generarCarrito();
        $('#nav-usuario').show().text(sessionStorage.getItem('nombre')).prepend(`<img id="usuario-img" src="/img/usuario.png" alt="">`);
        $('#usuario-img').show();
        $('#ingresar').off('click');
    }else{
        $('#ingresar').click(()=>{
            $('.container-form').show();
            $('.container-producto').hide();
        })
    }
    const urlProductos = 'json/listaProductos.json';
    $.ajax({
        url: urlProductos,
        async: false,
        type: 'GET',
        success: function(respuesta){
            arrayProductos = respuesta;
        }})
    for(const item of arrayProductos){
        $('#container-row').append(`<div class="col-lg-3 col-md-4 col-sm-6 col-6 ">
                                        <div class="producto">
                                        <div class="producto-cont-img">
                                            <img src= ${item.foto} alt=" ${item.producto} " class="producto-img">
                                        </div>
                                        <div class="producto-nombre">${item.producto}</div>
                                        <div class="producto-precio">$ ${item.precio}</div>
                                        </div>
                                    </div>`)
    }
    $('.producto').click(function(e){   
        login = sessionStorage.getItem('login');
        let productoIngresado = e.currentTarget.children[1].textContent;
        idProductoIngresado = arrayProductos.find(item => item.producto == productoIngresado).id;
        datosCantidad();     //declarada en cantidad.js
        $('.cantidad-img').append(`<img class="img-fluid" src=" ${arrayProductos.find(item=>item.producto == productoIngresado).foto} " alt="">`);
        if(login == 'true'){
            generarCarrito();
            $('#container-cantidad').css('display', 'flex');
            $('#cantidad-ingresada').focus().val('1');
        }else{
            $('.container-form').css('display', 'block');
            $('.container-producto').hide();
        }
    })
    
    
})
