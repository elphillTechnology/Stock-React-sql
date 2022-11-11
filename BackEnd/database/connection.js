const mongoose = require('mongoose');
const sql = require('mysql')


// const url = 'mongodb+srv://ayan_elphill:GYPIOqLcXcXITFJW@cluster0.y1pgs.mongodb.net/trading?retryWrites=true&w=majority'
// const url = 'mongodb+srv://ayan_elphill:<password>@cluster0.ys0lkbu.mongodb.net/trading?retryWrites=true&w=majority'
const url = 'mongodb://localhost:27017/trading'


module.exports = async () => {
	try {
		console.log('connecting...')
		// await mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true});
		await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
		
		console.log('DB Connected Successfully');
	} catch(error) {
		console.log('DB conncetion failed', error);
		throw new Error(error);
	}
};



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ayan_elphill:3Kwt2MJcpZ00G5Rm@cluster0.y1pgs.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// module.exports = async () => {
// 	try {
// 		console.log('conn ,...')
// 		let check = client.connect(err => {
// 			const collection = client.db("trading").collection("user");
// 			console.log('DB Connected Successfully');
// 			// perform actions on the collection object
// 			client.close();
// 		});
// 		console.log('end')
// 		console.log(check)
// 	}
// 	catch (err) {
// 		console.log('DB conncetion failed', error);
// 		throw new Error(err);
// 	}
// }


/*

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ayan_elphill:<password>@cluster0.y1pgs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


*/


// trading_app atlas - trading - GYPIOqLcXcXITFJW


// sql :---

module.exports.sqlConnection = () => {
	const sqlConn = sql.createConnection({
		host: "localhost",
		user: "elpdev",
		password: "elphill123",
		database: "trading"
	})	
	sqlConn.connect((error) => {
		if( error ) throw new Error(error)
	})
	return sqlConn
}


