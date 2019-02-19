const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody'),
      inputBuscador = document.querySelector('#buscar');

 eventListeners();

function eventListeners(){
    //cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit',leerFormulario);

    if(listadoContactos){
        listadoContactos.addEventListener('click',eliminarContacto);
    }

    //buscador
    inputBuscador.addEventListener('input',buscarContactos);

    //contador de contactos
    numeroContactos();
}

function leerFormulario(e){
    e.preventDefault();
    //leer los datos de los inputs
    const nombre =  document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;
    if(nombre==='' || empresa ==='' || telefono===''){
        mostrarNotificacion('Todos los campos son obligatorios','error');
    }else{
        //pasa la validacion 
        const infoContacto = new FormData();
        infoContacto.append('nombre',nombre);   
        infoContacto.append('empresa',empresa);
        infoContacto.append('telefono',telefono);
        infoContacto.append('accion',accion); 
        
        if(accion=='crear'){
            //crearemos un nuevo elemento
            insertarBD(infoContacto);//llamo funcion para insertar por ajax
        }else{
            //editaremos un contacto
            //leer el id y agregarlo al formData
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegristro(infoContacto);
        }
    }
}

//insertar en la Base de Datos via ajax
function insertarBD(datos){
    //LLAMADO ajax

    //crear objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST','inc/modelos/modelo-contactos.php',true);

    //pasar los datos(ler respuesta)
    xhr.onload = function() {
        if(this.status===200){ 
            const respuesta = JSON.parse(xhr.responseText);
            
            //insertar un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //creando contenedor para los botones un TD (editar y borrar)
            const contenedorAcciones = document.createElement('td');

            //crear el icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas','fa-pen-square');

            //crear el enlace para editar 
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`; //concateno html con javascript usando Template strings (nueva caracteristica de js)
            btnEditar.classList.add('btn', 'btn-editar');

            //agregando el enlace con el icono de editar al padre que es el  td que creamos
            contenedorAcciones.appendChild(btnEditar);

            //crear el icono de eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            //creando el boton para eliminar
            const btnEliminar =  document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar')

            //agregando el boton de eliminar con el icono de eliminar al padre que es el  td que creamos
            contenedorAcciones.appendChild(btnEliminar);


            //Agregando el td con los dos botones al tr padre que creamos al principio y que contienen los otros 3 td
            nuevoContacto.appendChild(contenedorAcciones);

            //agregando el tr con los datos del contacto y los botones al tbody de la tabla
            listadoContactos.appendChild(nuevoContacto);

            //resetenado formulario
            document.querySelector('form').reset();

            //mostrando notificacion de que cargo con exito
            mostrarNotificacion('Cargado con exito','correcto');
            numeroContactos() ;
        }
    }
    //envia los datos
    xhr.send(datos);
}


function actualizarRegristro(datos){
    //console.log (...datos); //para ver usando speedofrator sino no se puede

    //llamado a ajax

    //crear el objeto
    const xhr = new XMLHttpRequest();
    //abrir la conexion
    xhr.open('POST','inc/modelos/modelo-contactos.php', true);
    //leer la respuesta
    xhr.onload =  function() {
        if(this.status === 200){
            const respuesta = JSON.parse(xhr.responseText);
            if(respuesta.respuesta == 'correcto'){
                //mostra notificacion
                mostrarNotificacion('Cambios Guardados','correcto');
            }
        }else{
            mostrarNotificacion('Error No se guardaron los cambios','error');
        }
        setTimeout(() => {
            window.location.href = 'index.php';
        }, 4000);
    }
    //enviar la peticion
    xhr.send(datos);
}

function eliminarContacto(e){
    if(e.target.parentElement.classList.contains('btn-borrar')){
        //todo el id segun el contacto
        const id = e.target.parentElement.getAttribute('data-id');
        //pregunto al usuario 
        const respuesta = confirm('estas seguro/a?');

        if(respuesta){
            //llamado a ajax

            //crear el objeto
            const xhr = new XMLHttpRequest();

            //abrir la conexion
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);

            //leer la respuesta
            xhr.onload =  function() {
                if(this.status === 200){
                    const resultado = JSON.parse(xhr.responseText);

                    //eliminar el registro del DOM y mostrar notificacion de correcto
                    if(resultado.respuesta ==='correcto'){
                    e.target.parentElement.parentElement.parentElement.remove();
                    mostrarNotificacion('Eliminado con exito','correcto');
                    numeroContactos() ;
                }
                }else{
                    //si algo falla muestro norifiacion de error
                    mostrarNotificacion('Ocurrio un eror','error');
                }
            }

            //enviar la peticion
            xhr.send();
        }
    }
}

//notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
  var notificacion = document.createElement('div');//creo contenedor de notificacion
  notificacion.classList.add(clase,'notificacion','sombra');//le agrego clase
  notificacion.textContent =  mensaje ;//le agrego texto

  formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
  
  setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() =>{
            notificacion.classList.remove('visible');

            setTimeout(() => {
                    notificacion.remove();
            }, 700)
        },3000);

  },100);
}

//buscador de registros
function buscarContactos(e){
    const expresion = new RegExp(e.target.value, "i"),// es  un objeto que describe un patron de caracteres , la i es para q no le de importancia a mayusculas o minusculas
          registros = document.querySelectorAll('tbody tr'); // todos los contactos que estan dentro de un tr en tbody

          registros.forEach(registro =>{
              registro.style.display = 'none';


              if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){
                registro.style.display = 'table-row';
            }
            numeroContactos();

            })
        }
        
// muestra el numero de contactos

function numeroContactos() {
        const totalContactos =  document.querySelectorAll('tbody tr');
                contenedorNumero = document.querySelector('.total-contactos span');
        
        let total = 0;

        totalContactos.forEach(contacto => {
            if( contacto.style.display === '' || contacto.style.display === 'table-row' ){
                total++;
            }
        });
        //console.log(total);
        contenedorNumero.textContent = total;
}
