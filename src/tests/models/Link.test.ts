import 'mocha';
import mongoose from 'mongoose';
import Link from '../../models/Link';

describe('Debe crear un nuevo documento para el enlace', function () {
	before(function (done) {
		mongoose.connect('mongodb://localhost/class_send_pruebas', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const db = mongoose.connection;
		db.on(
			'error',
			console.error.bind(
				console,
				'error de conexión con la base de datos'
			)
		);
		db.once('open', function () {
			console.log('Conectados con la base de datos');
			done();
		});
	});

	it('El enlace se creó correctamente', function (done) {
		const link = new Link({
			url: 'url-del-archivo',
			nombre: 'aujrtmpffg.pdf',
			nombreOriginal: 'documento.pdf',
			descargas: 10,
		});

		link.save((err) => {
			if (err) {
				throw new Error('Error: El enlace no se creó');
			}
			return done();
		});
	});
	after(function (done: Mocha.Done) {
		mongoose.connection.db.dropDatabase(function () {
			mongoose.connection.close(done);
		});
	});
});
