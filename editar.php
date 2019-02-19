<?php 
include 'inc/funciones/funciones.php';
include 'inc/layout/header.php';

$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

if(!$id){
    die("id invalido");
}
$resultado = obtenerContacto($id);

$contacto = $resultado->fetch_assoc();
?>
<div class="contenedor-barra" >  
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>    
    </div><!--contenedor barra-->
</div><!--contenedor-barra-->

<div class="bg-amarillo contenedor sombra">

    <form id="contacto" action="#">
        <legend>Edite el Contacto</legend> 
        <? include 'inc/layout/formulario.php'?>
    </form>

</div><!--bg-amarillo contenedor sombra-->

<?php include_once 'inc/layout/footer.php' ?>