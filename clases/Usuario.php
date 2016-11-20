<?php

/**
 *
 */
class Usuario
{
  public $id;
  public $email;
  public $password;
  public $access;

   public static function existeUsuario($email,$pass){

     include_once 'clases/AccesoDatos.php';
     $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
     $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE email = :email AND password = :password");
     $consulta->bindValue(':email',$email, PDO::PARAM_STR);
     $consulta->bindValue(':password',$pass, PDO::PARAM_STR);
     $consulta->execute();

     return $consulta->fetchObject('Usuario');
   }

   public static function traerUsuarios()
   {
     include_once 'clases/AccesoDatos.php';
     $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
     $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");
     $consulta->execute();
     return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
   }
}

 ?>
