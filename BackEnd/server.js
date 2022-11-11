const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');

dotEnv.config();

const dbConnection = require('./database/connection');

const app = express();
dbConnection();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));



app.get('/', (req,res,next) => {
	res.send('Hello from Node API Server');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
	console.log(`Server listening on port ${PORT}`); 
})

app.use(function (err,req,res,next) {
	console.log(err.stack);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
	res.status(500).send({
		status: 500,
		message: err.message,
		body: {}
	});
});

