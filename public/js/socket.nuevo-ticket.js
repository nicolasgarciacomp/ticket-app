// Comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');
var dni = $('#i-dni');
var motivo = $('#s-motivo');

socket.on('connect', function() {
	console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
	console.log('Desconectado al servidor');
});

socket.on('estadoActual', function(resp) {
	label.text(resp.actual);
});

$('button').on('click', function() {
	socket.emit('siguienteTicket', {
		dni: dni.val(),
		motivo: motivo.val()
	}, function(siguienteTicket) {
		label.text(siguienteTicket);
		console.log(siguienteTicket);
	});
});
