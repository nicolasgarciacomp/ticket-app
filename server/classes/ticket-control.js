/**
 * @fileoverview	./server/classes/ticket-control.js
 *
 * @version         1.0
 *
 * @author          Nicolás Garcia <nicolasgarciacomp@gmail.com>
 *
 * History
 * v1.0 – Se creó el archivo
**/

// Requires
const fs = require('fs');

class Ticket {
	constructor(numero, escritorio) {
		this.numero = numero;
		this.escritorio = escritorio;
	}
}

class TicketControl {
	constructor() {
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ultimos4 = [];

		let data = require('../data/data.json');

		if(data.hoy === this.hoy) {
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos4 = data.ultimos4;
		} else {
			this.reiniciarConteo();
		}
	}

	/**
	 * @name	siguiente
	 *
	 * @description	Selecciona el siguiente ticket del array y encola uno nuevo
	 *
	 * @param	{}
	 *
	 * @return  {string}
	**/
	siguiente() {
		this.ultimo += 1;
		let ticket = new Ticket(this.ultimo, null);
		this.tickets.push(ticket);
		this.grabarArchivo();

		return `Ticket ${ this.ultimo }`;
	}

	/**
	 * @name	getUltimoTicket
	 *
	 * @description	Devuelve el ultimo ticket
	 *
	 * @param	{}
	 *
	 * @return  {string}
	**/
	getUltimoTicket() {
		return `Ticket ${ this.ultimo }`;
	}

	/**
	 * @name	getUltimos4
	 *
	 * @description	Devuelve los ultimos 4 tickets del array
	 *
	 * @param	{}
	 *
	 * @return  {array}
	**/
	getUltimos4() {
		return this.ultimos4;
	}

	/**
	 * @name	atenderTicket
	 *
	 * @description	Actualiza el siguiente ticket a atender
	 *
	 * @param	{string}
	 *
	 * @return  {object}
	**/
	atenderTicket(escritorio) {
		if(this.tickets.length === 0) {
			return 'No hay tickets';
		}

		let numeroTicket = this.tickets[0].numero;
		this.tickets.shift();

		let atenderTicket = new Ticket(numeroTicket, escritorio);
		this.ultimos4.unshift(atenderTicket);

		if(this.ultimos4.length > 4) {
			this.ultimos4.splice(-1, 1); // Borra el ultimo elemento
		}

		this.grabarArchivo();
		return atenderTicket;
	}

	/**
	 * @name	reiniciarConteo
	 *
	 * @description	Vacia los arrays para comenzar de nuevo
	 *
	 * @param	{}
	 *
	 * @return  {}
	**/
	reiniciarConteo() {
		this.ultimo = 0;
		this.tickets = [];
		this.ultimos4 = [];
		console.log('Se ha inicializado el sistema');
		this.grabarArchivo();
	}

	/**
	 * @name	grabarArchivo
	 *
	 * @description	Escribe en el archivo .JSON
	 *
	 * @param	{}
	 *
	 * @return  {}
	**/
	grabarArchivo() {
		let jsonData = {
			ultimo: this.ultimo,
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos4: this.ultimos4
		}

		let jsonDataString = JSON.stringify(jsonData);
		fs.writeFileSync('./server/data/data.json', jsonDataString);
	}
}

// Exporto la clase
module.exports = {
	TicketControl
}
