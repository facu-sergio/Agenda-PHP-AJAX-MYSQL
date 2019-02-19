<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
        type="text" 
        placeholder="Nombre Contacto" 
        id="nombre"
        value= " <?php echo ($contacto['nombre']) ?  $contacto['nombre'] : '';?>">
    </div><!--div de cada campo-->
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input type="text" placeholder="Nombre Empresa" id="empresa"
        value="<?php echo ($contacto[empresa]) ? $contacto['empresa'] : '';?>"
        >
    </div><!--div de cada campo-->
    <div class="campo">
        <label for="telefono">Telefono:</label>
        <input type="tel" placeholder="Telefono Contacto" id="telefono"
        value="<?php echo ($contacto['telefono']) ? $contacto['telefono'] : ''; ?>"
        >
    </div><!--div de cada campo-->
    </div><!--div campos-->
    <div class="campo enviar">
        <?php
            $textoBtn = ($contacto['nombre']) ? 'guardar' : 'añadir';
            $accion =  ($contacto['nombre']) ? 'editar' : 'crear';
        ?>
        <input type="hidden" id="accion" value="<?php echo $accion ?>">

        <?php if($contacto['id']) { ?>
            <input type="hidden" id="id" value="<?php echo $contacto['id'] ?>">
        <?php } ?>

        <input type="submit" value="<?php echo $textoBtn;?>">
    </div><!--div campo enviar -->
</div><!--campos(principal contiene los campos)-->
