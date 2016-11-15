var lista;
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
    // alert('Logeo exitoso: ' + resultIngreso);
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
    // alert('Deslogeo exitoso: ' + resultEgreso);
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

      console.log('hasta aca llegue');
      $('#myModal').modal({ keyboard: false });
      $('#contenidoModal').append('Debe pagar: $');
      $('#contenidoModal').append(resultCobrar);
      $('#contenidoModal').append(' pesos.');
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
    estacionados();
  },

  function (resultVehiculo) {
    alert('Fallo el ingreso del vehiculo');
  });
}
