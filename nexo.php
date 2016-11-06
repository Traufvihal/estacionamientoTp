<?php

if (isset($_POST['instruccion'])) {
  switch ($_POST['instruccion']) {
    case 'ingresarUsuario':
      session_start();
      $_SESSION['user'] = $_POST['email'];
      echo $_SESSION['user'];
      break;

    default:
      # code...
      break;
  }
}

 ?>
