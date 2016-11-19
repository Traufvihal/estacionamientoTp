<?php
session_start();

if (!isset($_SESSION['user'])) {
  header('Location: login.html');
}
 ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Playa de estacionamiento</title>
    <script src="js/jquery-3.1.1.js"></script>
    <script src="js/funciones.js"></script>
    <link rel="stylesheet" href="css/bootstrap/css/bootstrap.min.css">
    <script src="css/bootstrap/js/bootstrap.js">

    </script>
  </head>
  <body>
    <header>
      <h1>Playa de estacionamiento</h1>
    </header>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Menu</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a class="btn" onclick="ingresoPatente()">Ingreso patente</a></li>
          <li><a class="btn" onclick="estacionados()">Estacionados</a></li>
          <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Grillas <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a class="btn" onclick="importes()">Importes</a></li>
              <li><a class="btn" onclick="usuarios()">Usuarios</a></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a <span class="glyphicon glyphicon-user"></span> <?php echo " ".$_SESSION['user'] ?></a></li>
          <li><a onclick="egresoUsuario()"><span class="glyphicon glyphicon-log-in"></span> Salir</a></li>
        </ul>
      </div>
    </nav>
    <section id="contenido">

    </section>

    <!-- Modal -->

    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title" id="titleModal"></h4>
          </div>
          <div class="modal-body"id="contentModal">

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>

    <!-- <footer></footer> -->
  </body>
</html>
