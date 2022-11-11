const adminService = require('../service/adminService');
const constants = require('../constants');
const { dbHelper } = require('../helper/dbHelper');


module.exports.updateUser = async (req, res) => {
	let response = {...constants.defaultServerResponse}
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		const responseFromService = await adminService.updateUser(req.params.user_id, req.body);
		response.body = responseFromService
		response.status = 200
	}
	catch( error ) {
		response.status = 400
		response.message = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.updateUserStatus = async (req, res) => {
	let response = {...constants.defaultServerResponse}
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		await adminService.updateUserStatus(req.params);
		response.body = true
		response.status = 200
	}
	catch( error ) {
		response.status = 400
		response.message = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.createClientApi = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		response.body = await adminService.createClientApi( req.body )
		response.status = 200
	}
	catch( error ) {
		response.message = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.findAllClientApisByUserId = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		response.body = await adminService.findAllClientApisByUserId( req.params )
		response.status = 200
	}
	catch( error ) {
		response.status = 400
		response.message = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.updateClientApiStatus = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		response.body = await adminService.updateClientApiStatus( req.params )
		response.status = 200
	}
	catch( error ) {
		response.message = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.createStrategy = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		response.body = await adminService.createStrategy({ ...req.body })
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
		await adminService.validateAdminJWT( req.headers.authorization )
		response.body = await adminService.copyStrategy({ ...req.body })
		response.status = 200
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.getAllStrategyDetailsByApiId = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		response.body = await adminService.getAllStrategyDetailsByApiId(req.params.apiId)
		response.status = 200
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.getStrategyDetailsByStrategyId = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		response.body = await adminService.getStrategyDetailsByStrategyId(req.params.strategyId)
		response.status = 200
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.removeStrategy = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT( req.headers.authorization )
		response.body = await adminService.removeStrategy( req.params.strategyId )
		response.status = 200
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

