<?php 
if($_POST['accion'] == 'crear'){
    //llamo la funcion para conectar a la BD
    require_once('../funciones/bd.php');

    //creo y Protejo las variables con los datos a cargar en la BD
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

    //insertando las variables con los datos usando preparestatements
    try{
        $stmt = $conn->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $empresa, $telefono);
        $stmt->execute();
       if($stmt->affected_rows == 1) {
               $respuesta = array(
                    'respuesta' => 'correcto',
                    'datos' => array(
                         'nombre' => $nombre,
                         'empresa' => $empresa,
                         'telefono' => $telefono,
                         'id_insertado' => $stmt->insert_id
                    )
               );
          }
        $stmt->close();
        $conn->close();

    } catch(Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }
    //retorno la respuesta
    echo json_encode($respuesta);
}



if($_GET['accion']== 'borrar'){
    //conecto a la bd
    require_once('../funciones/bd.php');
    //sanitizo el dato que necesito en este caso la 'id' que ya viene en la url
    $id = filter_var($_GET['id'],FILTER_SANITIZE_NUMBER_INT);
    try{
        $stmt = $conn->prepare("DELETE FROM contactos WHERE id= ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if($stmt->affected_rows==1){
            $resultado= array(
                'respuesta' => 'correcto'
            );
    }
        $stmt->close();
        $conn->close();
    }catch (Exception $e){
        $resulado = array(
            'error' => $e->getMesssage()
        );
    }
    echo json_encode($resultado);
}


if($_POST['accion'] == 'editar'){
    //echo json_encode($_POST);

    require_once ('../funciones/bd.php');

    //validar entradas
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
    $id = filter_var($_POST['id'],FILTER_SANITIZE_NUMBER_INT);

    try {
        $stmt = $conn->prepare("UPDATE contactos SET nombre = ?, empresa = ? , telefono = ? WHERE id = ?");
        $stmt->bind_param("sssi", $nombre, $empresa, $telefono , $id);
        $stmt->execute();
        if($stmt->affected_rows == 1){
            $respuesta = array (
                'respuesta' => 'correcto'
            );
        }
        $stmt->close();
        $conn->close();
        
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }
    echo json_encode($respuesta);
}
?>
