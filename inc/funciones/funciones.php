<?php
function obtenerContactos(){
    include 'bd.php';
    try{
        return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos");
    }catch(Exception $e){
        echo "Erorr!" .  $e->getMessage . "</br>";
        return false;
    }
}

function obtenerContacto($id){
    include 'bd.php';
    try{
        return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos WHERE id = $id");
    }catch(Exception $e){
        echo "error!" . $e->getMessage . "</br>";
        return false;
    }
}
?>