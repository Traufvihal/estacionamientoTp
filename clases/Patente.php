<?php
class Patente
{
	public $id;
 	public $numero;
  public $fecha;
  public $hora;

	public static function cobrar($idCobrar,$numeroReg,$fechaEntrada, $horaEntrada, $fechaSalida, $horaSalida, $importe){

		include 'clases/AccesoDatos.php';
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM vehiculos	WHERE id=:id");
		$consulta->bindValue(':id',$idCobrar, PDO::PARAM_INT);
		$consulta->execute();
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO registros (numero,fechaEntrada,fechaSalida,horaEntrada,horaSalida,importeCobrado)	VALUES ('$numeroReg','$fechaEntrada','$fechaSalida','$horaEntrada','$horaSalida','$importe')");
		$consulta->bindValue(':id',$idCobrar, PDO::PARAM_INT);
		$consulta->execute();

	}

	public function diferencia(){

		$ya = strtotime(date('Y-m-d h:i'));
		$str = $this->fecha." ".$this->hora;
		$ingreso = strtotime($str);
		$transcurrido = round(abs($ya - $ingreso) / 60,2);
		return $transcurrido;
	}

	public function insertarPatente()
	 {
		 		include 'clases/AccesoDatos.php';
				$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
				$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO vehiculos (numero,fecha,hora)VALUES('$this->numero','$this->fecha','$this->hora')");
				$consulta->execute();
				return $objetoAccesoDato->RetornarUltimoIdInsertado();
	 }

	 public static function traerPatentes()
	 {
		 include 'clases/AccesoDatos.php';
		 $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		 $consulta =$objetoAccesoDato->RetornarConsulta("SELECT id,numero,fecha,hora FROM vehiculos");
		 $consulta->execute();
		 return $consulta->fetchAll(PDO::FETCH_CLASS, "Patente");
	 }

}
