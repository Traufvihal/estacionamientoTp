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
