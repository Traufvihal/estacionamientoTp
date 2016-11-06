<?php
session_start();

if (!isset($_SESSION['user'])) {
  header('Location: login.html');
}else {
  echo "bienvenido".$_SESSION['user'];
}
 ?>
