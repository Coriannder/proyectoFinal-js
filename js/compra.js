
    $('.btn-cerrar-compra').click(()=>{
        $('.container-compra').hide();
        $('.container-producto').show();
        localStorage.clear();
        generarCarrito();       
    })

    $('.compra-usuario').text(sessionStorage.getItem('nombre'));
    $('.total-valor').text('$ ' + sessionStorage.getItem('total-valor'));






