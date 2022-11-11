const userService = require('../service/userService');
const constants = require('../constants');
const { dbHelper } = require('../helper/dbHelper');


module.exports.validateUser = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		response.body = await userService.validateUser( req.headers?.authorization )
		response.status = 200
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.signupUser = async (req, res) => {
	let response = {...constants.defaultServerResponse};
	try {
		const responseFromService = await userService.signupUser(req.body);
		response.status = 200;
		// response.body = constants.userMessage.USER_CREATED;
		response.body = responseFromService;
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body);
	
}

module.exports.loginUser = async (req, res) => {
	let response = {...constants.defaultServerResponse};
	try {
		const responseFromService = await userService.loginUser(req.body);
		response.status = 200;
		// response.body = constants.userMessage.USER_LOGIN;
		response.body = responseFromService;
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body);
}

module.exports.findAllUser = async (req, res) => {
	let response = {...constants.defaultServerResponse};
	response.status = 200;
	response.body = await userService.findAllUser();
	return res.status(response.status).send(response.body);
}
module.exports.findUserByUserId = async (req, res) => {
	let response = {...constants.defaultServerResponse};
	try {
		response.status = 200;
		response.body = await userService.findUserByUserId(req.params.user_id);
	}
	catch( error ) {
		response.status = 400
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body);
}

module.exports.updateUser = async (req, res) => {
	let response = {...constants.defaultServerResponse}
	try {
		// if( ! dbHelper.validateUserWithJWT( req.headers.authorization, req.params.user_id ) ) {
		// 	throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
		// }
		await userService.validateUserWithJWT( req.headers.authorization, req.params.user_id )
		const responseFromService = await userService.updateUser(req.params.user_id, req.body);
		response.body = responseFromService
		response.status = 200
	}
	catch( error ) {
		response.status = 400
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body);
}

module.exports.updateUserStatus = async (req, res) => {
	let response = {...constants.defaultServerResponse}
	try {
		// if( ! dbHelper.validateUserWithJWT( req.headers.authorization, req.params.user_id ) ) {
		// 	throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
		// }
		await userService.validateUserWithJWT( req.headers.authorization, req.params.user_id )
		await userService.updateUserStatus(req.params);
		response.body = true
		response.status = 200
	}
	catch( error ) {
		response.status = 400
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body);
}

module.exports.createClientApi = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await userService.validateUserWithJWT( req.headers.authorization, req.params.user_id )
		response.body = await userService.createClientApi( req.params )
		response.status = 200
	}
	catch( error ) {
		response.status = 400
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body);
}

module.exports.findAllClientApisByUserId = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await userService.validateUserWithJWT( req.headers.authorization, req.params.user_id )
		response.body = await userService.findAllClientApisByUserId( req.params )
		response.status = 200
	}
	catch( error ) {
		response.status = 400
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body);
}

module.exports.updateClientApiStatus = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await userService.validateUserWithJWT( req.headers.authorization, req.params.user_id )
		response.body = await userService.updateClientApiStatus( req.params )
		response.status = 200
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.createStrategy = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		const { id } = await userService.validateJWT( req.headers.authorization )
		response.body = await userService.createStrategy({ ...req.body, loggedinUserId : id })
		response.status = 200
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}
module.exports.copyStrategy = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		const loggedinUser = await userService.validateUserWithJWT( req.headers.authorization, req.body.userId, true )
		response.body = await userService.copyStrategy({ ...req.body, strategyId : req.params.strategy_id, loggedinUser })
		response.status = 200
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}


