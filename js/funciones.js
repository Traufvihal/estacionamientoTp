var lista;
var registros;
var listaUsuarios;

function completarAdm() {
  $('#email').val('admin@estacionamiento.com');
  $('#pass').val('123admin');
}

function completarUsr() {
  $('#email').val('usuario@estacionamiento.com');
  $('#pass').val('123usuario');
}

function ingresarUsuario() {

  $.ajax({
    type: 'post',
    url: 'nexo.php',
    data: {
      instruccion: 'ingresarUsuario',
      email: $('#email').val(),
      pass: $('#pass').val(),
    },
  }).then(function (resultIngreso) {
    console.log(resultIngreso);
    if (resultIngreso == 'true') {
      window.location = 'index.php';
    }else {
      alert('El usuario es incorrecto.');
      llamarModal('Error: ', 'El usuario o la contraseña no son validos.');
    }
  },

  function (resultIngreso) {
    alert('Logeo fallido' + resultIngreso);
  });
}

function egresoUsuario() {

  $.ajax({
    type: 'post',
    url: 'nexo.php',
    data: {
      instruccion: 'egresoUsuario',
    },
  }).then(function (resultEgreso) {

    window.location = 'index.php';
  },

  function (resultEgreso) {
    alert('Deslogeo fallido: ' + resultEgreso);
  });
}

function estacionados() {

  $.post('paginas/salida.html', function (contenidoSalida) {
    $('#contenido').html(contenidoSalida);
  }).then(function (salidaCargada) {
    traerEstacionados();
  },

  function (salidaCargada) {
    alert('NO funcionó: ' + salidaCargada);
  });
}

function traerEstacionados() {

  $.ajax({
    type: 'post',
    url: 'nexo.php',
    data: {
      instruccion: 'traerEstacionados',
    },
  }).then(function (resultEstacionados) {

    lista = jQuery.parseJSON(resultEstacionados);
    for (var i = 0; i < lista.length; i++) {
      var row = '<tr>';
      row += '<td>' + lista[i].numero + '</td>';
      row += '<td>' + lista[i].fecha + '</td>';
      row += '<td>' + lista[i].hora + '</td>';
      row += '<td><button type=\"button\" name=\"cob\" class=\"btn btn-success\"';
      row += ' onclick=\"cobrar(' + i + ')\">Cobrar <span class=\"glyphicon';
      row += ' glyphicon-usd\"></span></button>';
      row += ' <button type=\"button\" name=\"cob\" class=\"btn btn-warning\"';
      row += ' data-toggle=\"modal\" data-target=\"#myModal\">Editar <span class=\"glyphicon';
      row += ' glyphicon-edit\"></span></button></td>';
      $('#tabla').append(row);
    }

  },

  function (resultEstacionados) {
    alert('No funciona' + resultEstacionados);
  });
}

function cobrar(i) {

  $.ajax({
      type: 'post',
      url: 'nexo.php',
      data: {
        instruccion: 'cobrar',
        cobrarId: lista[i].id,
        cobrarNumero: lista[i].numero,
        cobrarFecha: lista[i].fecha,
        cobrarHora: lista[i].hora,
      },
    }).then(function (resultCobrar) {
      var mensajeModal = 'Debe pagar: $' + resultCobrar + ' pesos.';
      llamarModal('Costo por estadia:', mensajeModal);
      estacionados();
    },

    function (resultCobrar) {
      alert('No cobrado $ :(');

    });
}

function ingresoPatente() {
  $.post('paginas/ingreso.html', function (data) {

    $('#contenido').html(data);
  });
}

function ingresarVehiculo() {

  $.ajax({
    type: 'post',
    url: 'nexo.php',
    data: {
      instruccion: 'ingresarVehiculo',
      patente: $('#patente').val(),
    },
  }).then(function (resultVehiculo) {
    if (resultVehiculo == 'TRUE') {
      estacionados();
    }else {
      var datosPatente = jQuery.parseJSON(resultVehiculo);
      $('#titleModal').html('El vehiculo ya se encuentra esctacionado.');
      var mensajeModal = 'El vehiculo ya se encuentra esctacionado.';
      $('#myModal').modal({ keyboard: false });
      $('#contentModal').hide();
    }
  },

  function (resultVehiculo) {
    alert('Fallo el ingreso del vehiculo');
  });
}

function importes() {

  $.post('paginas/importes.html', function (contenidoImportes) {
    $('#contenido').html(contenidoImportes);
  }).then(function (importesCargado) {
    traerImportes();
  },

  function (importesCargado) {
    alert('NO funcionó: ' + importesCargado);
  });
}

function usuarios() {

  $.post('paginas/usuarios.html', function (contenidoUsuarios) {
    $('#contenido').html(contenidoUsuarios);
  }).then(function (usuariosCargado) {
    traerUsuarios();
  },

  function (usuariosCargado) {
    alert('NO funcionó: ' + usuariosCargado);
  });
}

function traerImportes() {

  $.ajax({
    type: 'post',
    url: 'nexo.php',
    data: {
      instruccion: 'traerImportes',
    },
  }).then(function (resultRegistros) {

    if (resultRegistros != 'false') {

      registros = jQuery.parseJSON(resultRegistros);

      for (var i = 0; i < registros.length; i++) {
        var row = '<tr>';
        row += '<td>' + registros[i].numero + '</td>';
        row += '<td>' + registros[i].fechaEntrada + '</td>';
        row += '<td>' + registros[i].fechaSalida + '</td>';
        row += '<td>' + registros[i].horaEntrada + '</td>';
        row += '<td>' + registros[i].horaSalida + '</td>';
        row += '<td>' + registros[i].importeCobrado + '</td>';
        row += '</tr>';
        $('#tabla').append(row);
      }
    }else {
      $('#contenido').html('<h2>No tiene permiso para ver importes.</h2>');
    }

  },

  function (resultRegistros) {
    alert('No funciona' + resultRegistros);
  });
}

function traerUsuarios() {

  $.ajax({
    type: 'post',
    url: 'nexo.php',
    data: {
      instruccion: 'traerUsuarios',
    },
  }).then(function (resultUsuarios) {

    if (resultUsuarios != 'false') {

      listaUsuarios = jQuery.parseJSON(resultUsuarios);

      for (var i = 0; i < listaUsuarios.length; i++) {
        var row = '<tr>';
        row += '<td>' + listaUsuarios[i].email + '</td>';
        row += '<td>' + listaUsuarios[i].access + '</td>';
        row += '</tr>';
        $('#tabla').append(row);
      }
    }else {
      $('#contenido').html('<h2>No tiene permiso para ver importes.</h2>');
    }

  },

  function (resultUsuarios) {
    alert('No funciona' + resultUsuarios);
  });
}

function llamarModal(titulo, mensaje) {

  $('#myModal').modal({ keyboard: false });
  $('#titleModal').html(titulo);
  if (mensaje === '') {
    $('#contentModal').hide();
  }else {
    $('#contentModal').show();
  }

  $('#contentModal').html(mensaje);
}
