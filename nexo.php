<?php
session_start();
include_once 'clases/Patente.php';
include_once 'clases/Registro.php';
include_once 'clases/Usuario.php';

if (isset($_POST['instruccion'])) {
  switch ($_POST['instruccion']) {

    case 'ingresarUsuario':

      $usuario = Usuario::existeUsuario($_POST['email'],$_POST['pass']);
      if ($usuario != null) {
        $_SESSION['user'] = $usuario->email;
        $_SESSION['access'] = $usuario->access;
        echo 'true';
        break;
      }else {
        echo 'false';
        break;
      }
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
      $listaPatentes = Patente::traerPatentes();
      foreach ($listaPatentes as $key => $value) {
        if ($value->numero == $_POST['patente']) {
          echo json_encode($value);
          return;
        }
      }
      $patente = new Patente();
  		$patente->numero = strtoupper($_POST['patente']);
  		$patente->fecha = date('Y-m-d');
  		$patente->hora = date('h:i');
      $patente->insertarPatente();
      echo "TRUE";
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

    case 'traerEstacionados':
      echo json_encode(Patente::traerPatentes());
      break;

    case 'traerImportes':
      if ($_SESSION['access'] == 'adm') {
        echo json_encode(Registro::traerRegistros());
      }else {
        echo "false";
      }
      break;

    case 'traerUsuarios':
      if ($_SESSION['access'] == 'adm') {
        echo json_encode(Usuario::traerUsuarios());
      }else {
        echo "false";
      }
      break;
  }
}

 ?>
