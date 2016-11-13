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
    alert('Logeo exitoso: ' + resultIngreso);
    window.location = 'index.php';
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
    alert('Deslogeo exitoso: ' + resultEgreso);
    window.location = 'index.php';
  },

  function (resultEgreso) {
    alert('Deslogeo fallido: ' + resultEgreso);
  });
}

function estacionados() {
  $.post('paginas/salida.html', function (data) {
    $('#contenido').html(data);
    traerEstacionados();
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

    // alert(lista[1].numero);

    var lista = jQuery.parseJSON(resultEstacionados);
    for (var i = 0; i < lista.length; i++) {
      var row = '<tr>';
      row += '<td>' + lista[i].numero + '</td>';
      row += '<td>' + lista[i].fecha + '</td>';
      row += '<td>' + lista[i].hora + '</td>';
      row += '<td> <a><span class=\"glyphicon glyphicon-arrow-left\"></span> </a> </td>';
      $('#tabla').append(row);
    }

  },

  function (resultEstacionados) {
    alert('No funciona' + resultEstacionados);
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
    alert(resultVehiculo);
  },

  function (resultVehiculo) {
    alert('Fallo el ingreso del vehiculo');
  });
}
