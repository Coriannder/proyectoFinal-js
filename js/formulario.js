

    class Usuario {
        constructor(id, nombre, apellido){
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
    }

    let user;

    $('.formulario').submit(validarFormulario);

    function validarFormulario(e){
        e.preventDefault();
        $('#nombre').children().eq(2).remove();
        $('#apellido').children().eq(2).remove();
        if($('#nombre').children().eq(1).val() == '' &&  $('#apellido').children().eq(1).val() == '' ){
            $('#nombre').append('<p style= "color: red">Debe ingresar un nombre</p>');
            $('#apellido').append('<p style= "color: red">Debe ingresar un apellido</p>');
            $('#nombre').children().eq(1).focus();
        }else{
            if($('#nombre').children().eq(1).val() == ''){
                $('#nombre').append('<p style= "color: red">Debe ingresar un nombre</p>');
                $('#nombre').children().eq(1).focus();
            }else{
                if($('#apellido').children().eq(1).val() == ''){
                $('#apellido').append('<p style= "color: red">Debe ingresar un apellido</p>');
                $('#apellido').children().eq(1).focus();
                }else{
                    sessionStorage.setItem('login', 'true')
                    generarCarrito();
                    let nombre = $('#nombre').children().eq(1).val();
                    let apellido = $('#apellido').children().eq(1).val();
                    user = new Usuario(1, nombre, apellido);
                    sessionStorage.setItem('nombre', nombre);
                    $('#nav-usuario').show().text(sessionStorage.getItem('nombre')).prepend(`<img id="usuario-img" src="/img/usuario.png" alt="">`);
                    $('#usuario-img').show();
                    $('.container-form').hide();
                    $('.container-producto').css('display', 'flex');
                    $('.cantidad-img').children(1).remove();
                    $('.cantidad-titulo').children().eq(1).remove();
                }
            }
        }
    }

