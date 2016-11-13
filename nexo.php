<?php
session_start();
include 'clases/Patente.php';

if (isset($_POST['instruccion'])) {
  switch ($_POST['instruccion']) {

    case 'ingresarUsuario':
      $_SESSION['user'] = $_POST['email'];
      echo $_SESSION['user'];
      break;

    case 'egresoUsuario':
      if (isset($_SESSION['user'])) {
        $_SESSION['user'] = null;
        session_destroy();
        echo "salió";
      }else {
        echo "no salió";
      }
      break;

    case 'ingresoPatente':
      include 'paginas/ingreso.html';
      break;

    case 'egresoPatente':
      include 'paginas/salida.html';
      break;

    case 'ingresarVehiculo':

      $patente = new Patente($_POST['patente']);
      $patente->insertarPatente();
      echo 'Patente cargada!';
      break;
  }
}

 ?>
