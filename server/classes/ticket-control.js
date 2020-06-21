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

//Requires
const fs = require('fs');

class Ticket {
	/**
	 * @name	constructor
	 *
	 * @description	Inicializa numero y escritorio de ticket
	 *
	 * @param	{number, number, string, string, string}
	 *
	 * @return  {}
	**/
	constructor(numero, dni, motivo, escritorio, fecha) {
		this.numero = numero;
		this.dni = dni;
		this.motivo = motivo;
		this.escritorio = escritorio;
		this.fecha = new Date();
	}
}

class TicketControl {
	/**
	 * @name	constructor
	 *
	 * @description	Inicializa los arrays y trae la data del JSON
	 *
	 * @param	{}
	 *
	 * @return  {}
	**/
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
	 * @description	Crea nuevo ticket, aumenta contador de la lista y llama a grabarArchivo()
	 *
	 * @param	{}
	 *
	 * @return  {number}
	**/
	siguiente(dni, motivo) {
		this.ultimo += 1;
		let ticket = new Ticket(this.ultimo, dni, motivo, null, null);
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
	 * @return  {number}
	**/
	getUltimoTicket() {
		return `Ticket ${ this.ultimo }`;
	}

	/**
	 * @name	getUltimos4
	 *
	 * @description	Devuelve los ultimos 4 tickets
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
	 * @description	Pasa el siguiente ticket al escritorio que lo solicito y llama a grabarArchivo()
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
		let dniTicket = this.tickets[0].dni;
		let motivoTicket = this.tickets[0].motivo;
		let fechaTicket = this.tickets[0].fecha;
		this.tickets.shift();

		let atenderTicket = new Ticket(numeroTicket, dniTicket, motivoTicket, escritorio, fechaTicket);
		this.ultimos4.unshift(atenderTicket);

		if(this.ultimos4.length > 4) {
			this.ultimos4.splice(-1, 1); //Borra el ultimo elemento
		}

		this.grabarArchivo();
		return atenderTicket;
	}

	/**
	 * @name	reiniciarConteo
	 *
	 * @description	Inicializa de nuevo los arrays y llama a grabarArchivo()
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
	 * @description	Almacena datos en JSON
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

// Exporto la clase TicketControl
module.exports = {
	TicketControl
}
