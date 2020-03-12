/**
 * @fileoverview    ./server/sockets/socket.js
 *
 * @version         1.0
 *
 * @author          Nicolás Garcia <nicolasgarciacomp@gmail.com>
 *
 * History
 * v1.0 – Se creó el archivo
**/

// Requires
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control.js');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
    	actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });
    
    client.on('atenderTicket', (data, callback) => {
    	if(!data.escritorio) {
    		return callback({
    			err: true,
    			mensaje: 'El escritorio es necesario'
    		});
    	}

    	let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    	callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });
});
