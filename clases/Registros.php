<?php

/**
 *
 */
class Registros
{

  public $id;
 	public $numero;
  public $fechaEntrada;
  public $fechaSalida;
  public $horaEntrada;
  public $horaSalida;
  public $tiempoTranscurrido;
  public $importe;

  public static function traerPatentes()
  {
    include 'clases/AccesoDatos.php';
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,numero,fecha,hora FROM registros");
    $consulta->execute();
    return $consulta->fetchAll(PDO::FETCH_CLASS, "Patente");
  }

}

 ?>
