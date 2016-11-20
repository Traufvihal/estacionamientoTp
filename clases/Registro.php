<?php

/**
 *
 */
class Registro
{

  public $id;
 	public $numero;
  public $fechaEntrada;
  public $fechaSalida;
  public $horaEntrada;
  public $horaSalida;
  public $importeCobrado;

  public static function traerRegistros()
  {
    include_once 'clases/AccesoDatos.php';
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,numero,fechaEntrada,fechaSalida,horaEntrada,horaSalida,importeCobrado FROM registros");
    $consulta->execute();
    return $consulta->fetchAll(PDO::FETCH_CLASS, "Registro");
  }

}

 ?>
