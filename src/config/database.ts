import { connect } from 'mongoose';

export const connectDB = async () => {
	const uri = process.env.DB_URI || '';
	try {
		await connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('Connection with db has been established');
	} catch (err) {
		console.log("Connection with db doesn't established", err.message);
		process.exit(1);
	}
};
