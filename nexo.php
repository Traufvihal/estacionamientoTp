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

    case 'ingresarVehiculo':

      $patente = new Patente();
  		$patente->numero = strtoupper($_POST['patente']);
  		$patente->fecha = date('Y-m-d');
  		$patente->hora = date('h:i');
      $patente->insertarPatente();
      echo 'Patente cargada!';
      break;

    case 'traerEstacionados':

      echo json_encode(Patente::traerPatentes());
      break;

    case 'cobrar':

      $patente = new Patente();
      $patente->numero = strtoupper($_POST['cobrarNumero']);
      $patente->fecha = $_POST['cobrarFecha'];
  		$patente->hora = $_POST['cobrarHora'];
      $minutos = $patente->diferencia();
      echo $minutos;
      Patente::cobrar($_POST['cobrarId'],strtoupper($_POST['cobrarNumero']),$_POST['cobrarFecha'],$_POST['cobrarHora'], date('Y-m-d'), date('h:i'), $minutos);
      break;
  }
}

 ?>
