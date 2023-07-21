
let arrayProductos = new Array();

class Producto{
    constructor(objeto){
        this.id = objeto.id;
        this.producto = objeto.producto;
        this.foto = objeto.foto;
        this.precio = objeto.precio;
        this.descripcion = objeto.descripcion;
    }
}

$(document).ready(()=>{
    let login = sessionStorage.getItem('login');
    if(login == 'true'){
        generarCarrito();                  //Declarada en carrito.js
        $('#nav-usuario').show().text(sessionStorage.getItem('nombre')).prepend(`<img id="usuario-img" src="/img/usuario.png" alt="">`);
        $('#usuario-img').show();
        $('#ingresar').hide();
    }else{
        $('#ingresar').click(()=>{
            $('.container-form').show();
            $('#nombre').focus()
            $('.container-producto').hide();
        })
    }
    const urlProductos = 'json/listaProductos.json';
    $.ajax({
        url: urlProductos,
        async: false,
        type: 'GET',
        success: function(respuesta){
            for(let i=0; i < respuesta.length; i++){
                
                arrayProductos[i] = new Producto(respuesta[i]);
                $('#container-row').append(`<div class="col-lg-3 col-md-4 col-sm-6 col-6 ">
                                        <div class="producto">
                                        <div class="producto-cont-img">
                                            <img src= ${arrayProductos[i].foto} alt=" ${arrayProductos[i].producto} " class="producto-img">
                                        </div>
                                        <div class="producto-nombre">${arrayProductos[i].producto}</div>
                                        <div class="producto-precio">$ ${arrayProductos[i].precio}</div>
                                        </div>
                                    </div>`)
            }
        }})
    $('.producto').click(function(e){
        login = sessionStorage.getItem('login');
        let productoIngresado = e.currentTarget.children[1].textContent;
        idProductoIngresado = arrayProductos.find(item => item.producto === productoIngresado).id;
        datosCantidad();     //declarada en cantidad.js
        $('.cantidad-img').append(`<img class="img-fluid" src=" ${arrayProductos.find(item=>item.producto == productoIngresado).foto} " alt="">`);
        if(login == 'true'){
            generarCarrito();   //Declarada en carrito.js
            $('#container-cantidad').css('display', 'flex');
            $('#cantidad-ingresada').focus().val('1');
        }else{
            $('.container-form').css('display', 'block');
            $('.container-producto').hide();
        }
    })
    
    
})
