const adminService = require('../service/adminService');
const constants = require('../constants');
const bcrypt = require('bcrypt');
const { dbHelper } = require('../helper/dbHelper');
const { sqlConnection } = require('../database/connection')


const sqlConn = sqlConnection();

const sendResponse = (res, responseBody, status) => {
	responseBody = responseBody || ""
	status = status || 400
	// sqlConn.pause()
	// sqlConn.destroy()
	res.status(status).send(responseBody)
}

module.exports.updateUser = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE userId = '${req.body.userId}' `
		sqlConn.query(sql, async (err, result) => {
			let error = ''
			if (err) {
				error = 'DB_ERROR'
			} else if (!result.length) {
				error = constants.userMessage.USER_NOT_FOUND
			}
			if (error) {
				sendResponse(res, error)
				return
			}
			let user = {
				email: req.body.email ? req.body.email : result[0].email,
				firstName: req.body.firstName ? req.body.firstName : result[0].firstName,
				lastName: req.body.lastName ? req.body.lastName : result[0].lastName,
				phone: req.body.phone ? req.body.phone : result[0].phone,
				dob: req.body.dob ? req.body.dob : dbHelper.formatDateObjToDOB(result[0].dob),
				panNumber: req.body.panNumber ? req.body.panNumber : result[0].panNumber,
				broker: req.body.broker ? req.body.broker : result[0].broker,
				brokerId: req.body.brokerId ? req.body.brokerId : result[0].brokerId,
				updatedAt: dbHelper.fromatDateObjTimestamp(new Date())
			}
			let sql = `UPDATE ${constants.config.SQL_TABLES.USERS}
									SET
										email = '${user.email}',
										firstName = '${user.firstName}',
										lastName = '${user.lastName}',
										phone = '${user.phone}',
										dob = '${user.dob}',
										panNumber = '${user.panNumber}',
										broker = '${user.broker}',
										brokerId = '${user.brokerId}',
										updatedAt = '${user.updatedAt}'
									WHERE
										userId = '${req.body.userId}'
			`;
			sqlConn.query(sql, (err, result) => {
				if (err) {
					sendResponse(res, 'DB_ERROR')
					return
				}
				sendResponse(res, true, 200)
			})
		})
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
		res.status(response.status).send(response.body);
	}
}

module.exports.updateUserStatus = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT(req.headers.authorization)
		await adminService.updateUserStatus(req.params);
		response.body = true
		response.status = 200
	}
	catch (error) {
		response.status = 400
		response.message = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.createClientApi = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE userId = '${req.body.userId}' `
		sqlConn.query(sql, async (err, result) => {
			let error = ''
			if (err) {
				error = 'DB_ERROR'
			} else if (!result.length) {
				error = constants.userMessage.USER_NOT_FOUND
			}
			if (error) {
				sendResponse(res, error)
				return
			}
			let sql = `SELECT * FROM ${constants.config.SQL_TABLES.CLIENT_API}
							WHERE
								clientApiId = '${req.body.clientApiId}' AND 
								userId = '${req.body.userId}'
			`;
			sqlConn.query(sql, (err, result) => {
				let error = ''
				if (err) {
					error = 'DB_ERROR'
				} else if (result.length) {
					error = 'Client api id already exists'
				}
				if (error) {
					sendResponse(res, error)
					return
				}
				let sql = `INSERT INTO ${constants.config.SQL_TABLES.CLIENT_API}
								(
									userId,
									clientApiId,
									apiKey,
									apiSecret,
									status
								)
							VALUES
								(
									'${req.body.userId}',
									'${req.body.clientApiId}',
									'${req.body.apiKey}',
									'${req.body.apiSecret}',
									'inactive'
								)
				`;
				sqlConn.query(sql, (err, result) => {
					if (err) {
						sendResponse(res, 'DB_ERROR')
						return
					}
					sendResponse(res, {
						apiId: result.insertId,
						userId: req.body.userId,
						clientApiId: req.body.clientApiId,
						apiKey: req.body.apiKey,
						apiSecret: req.body.apiSecret,
						password: '',
						createdAt: (new Date()).toISOString(),
						updatedAt: (new Date()).toISOString(),
						status: 'inactive',
					}, 200)
				})
			})

		})
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
		res.status(response.status).send(response.body);
	}
}


module.exports.updateClientApi = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		let sql = `SELECT * FROM ${constants.config.SQL_TABLES.CLIENT_API}
								WHERE apiId = '${req.body.apiId}'
		`;
		sqlConn.query(sql, async (err, result) => {
			let error = ''
			if (err) {
				error = 'DB_ERROR'
			} else if (!result.length) {
				error = 'invalid api id'
			}
			if (error) {
				sendResponse(res, error)
				return
			}

			req.body.clientApiId = req.body.clientApiId || result[0].clientApiId
			req.body.apiKey = req.body.apiKey || result[0].apiKey
			req.body.apiSecret = req.body.apiSecret || result[0].apiSecret
			req.body.password = req.body.password || result[0].password
			req.body.status = req.body.status || result[0].status
			let sql = `UPDATE ${constants.config.SQL_TABLES.CLIENT_API} 
									SET 
										clientApiId = '${req.body.clientApiId}',
										apiKey = '${req.body.apiKey}',
										apiSecret = '${req.body.apiSecret}',
										password = '${req.body.password}',
										status = '${req.body.status}',
										updatedAt = '${dbHelper.fromatDateObjTimestamp(new Date())}'
									WHERE
										apiId = '${req.body.apiId}'
			`;
			sqlConn.query(sql, (err) => {
				if (err) {
					sendResponse(res, 'DB_ERROR')
					return
				}
				sendResponse(res, true, 200)
			})
		})
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
		res.status(response.status).send(response.body);
	}
}

module.exports.updateClientApiStatus = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT(req.headers.authorization)
		response.body = await adminService.updateClientApiStatus(req.params)
		response.status = 200
	}
	catch (error) {
		response.message = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}


module.exports.findClientApis = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		let sql = `SELECT * FROM ${constants.config.SQL_TABLES.CLIENT_API} WHERE 1 `
		if (req.query.userId) {
			sql += ` AND userId = '${req.query.userId}' `
		}
		if (req.query.apiId) {
			sql += ` AND apiId = '${req.query.apiId}' `
		}
		sqlConn.query(sql, (err, result) => {
			if (err) {
				sendResponse(res, 'DB_ERROR')
				return
			}
			if (req.query.apiId) {
				result = result[0]
			}
			sendResponse(res, result, 200)
		})
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
		res.status(response.status).send(response.body);
	}
}

module.exports.findAllClientApisByUserId = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT(req.headers.authorization)
		response.body = await adminService.findAllClientApisByUserId(req.params)
		response.status = 200
	}
	catch (error) {
		response.status = 400
		response.message = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}




module.exports.createStrategy = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT(req.headers.authorization)
		response.body = await adminService.createStrategy({ ...req.body })
		response.status = 200
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}
module.exports.copyStrategy = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT(req.headers.authorization)
		response.body = await adminService.copyStrategy({ ...req.body })
		response.status = 200
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.getAllStrategyDetailsByApiId = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT(req.headers.authorization)
		response.body = await adminService.getAllStrategyDetailsByApiId(req.params.apiId)
		response.status = 200
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.getStrategyDetailsByStrategyId = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT(req.headers.authorization)
		response.body = await adminService.getStrategyDetailsByStrategyId(req.params.strategyId)
		response.status = 200
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

module.exports.removeStrategy = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
		await adminService.validateAdminJWT(req.headers.authorization)
		response.body = await adminService.removeStrategy(req.params.strategyId)
		response.status = 200
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
	}
	return res.status(response.status).send(response.body)
}

