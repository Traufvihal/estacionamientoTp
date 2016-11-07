<?php
session_start();
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
      echo include 'paginas/ingreso.html';
      break;
  }
}

 ?>
