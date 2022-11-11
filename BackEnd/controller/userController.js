const userService = require('../service/userService');
const constants = require('../constants');
const bcrypt = require('bcrypt');
const { dbHelper } = require('../helper/dbHelper');
const { sqlConnection } = require('../database/connection')


const sqlConn = sqlConnection();

 
const sendResponse = ( res, responseBody, status ) => {
  responseBody = responseBody || ""
  status = status || 400
  // sqlConn.pause()
  // sqlConn.destroy()
  res.status(status).send(responseBody)
}

module.exports.validateUser = async (req, res) => {
	let response = { ...constants.defaultServerResponse }
	try {
    const payload = dbHelper.getPayloadFromJWT( req.headers?.authorization )
    if( !payload || !payload.id ) {
			throw new Error( constants.commonQueryMessage.UNAUTHORIZED_USER )
    }
    let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE userId = '${payload.id}' `
    sqlConn.query(sql, (err, result) => {
      if( err ) {
        sendResponse(res, 'DB_ERROR')
        return
      }
      if( !result.length ) {
  	    sendResponse(res, constants.commonQueryMessage.UNAUTHORIZED_USER)
        return
      }
      delete result[0].password
  	  sendResponse(res, {
        user : result[0],
        tokenValidity : constants.config.JWT_EXPIRE_TIME
      }, 200)
    })
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
  	res.status(response.status).send(response.body)
	}
}

module.exports.signupUser = async (req, res) => {
	let response = {...constants.defaultServerResponse};
	try {
    let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE email = '${req.body.email}' `
    sqlConn.query(sql, async (err, result) => {
      let error = ''
      if( err ) {
        error = 'DB_ERROR'
      } else if( result.length ) {
        error = constants.userMessage.USER_EXIST
      } else if( req.body.password !== req.body.confirm_password ) {
        error = 'Password doesnot matches with confirm password'
      }
      if( error ) {
        sendResponse(res, error)
        return
      }
  		let encryptPassword = await bcrypt.hash(req.body.password, 12);
      req.body.broker = req.body.broker || ''
      req.body.brokerId = req.body.brokerId || ''
      req.body.userType = req.body.userType || 'user'
      let sql = `INSERT INTO ${constants.config.SQL_TABLES.USERS} 
                    (
                      email,
                      password,
                      firstName,
                      lastName,
                      phone,
                      dob,
                      panNumber,
                      broker,
                      brokerId,
                      userType,
                      status
                    )
                  VALUES 
                    (
                      '${req.body.email}',
                      '${encryptPassword}',
                      '${req.body.firstName}',
                      '${req.body.lastName}',
                      '${req.body.phone}',
                      '${req.body.dob}',
                      '${req.body.panNumber}',
                      '${req.body.broker}',
                      '${req.body.brokerId}',
                      '${req.body.userType}',
                      'active'
                    )
      `;
      sqlConn.query(sql, (err, result) => {
        if( err ) {
          sendResponse(res, err)
          return
        }
        let token = dbHelper.createJWT({
          id : result.insertId,
          email : req.body.email
        })
        sendResponse(res, {
          user : {
            userId : result.insertId,
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            phone : req.body.phone,
            dob : req.body.dob,
            panNumber : req.body.panNumber,
            broker : req.body.broker,
            brokerId : req.body.brokerId,
            userType : req.body.userType,
            status : 'inactive'
          },
			    token
        }, 200)
      })
    })
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
    res.status(response.status).send(response.body)
	}
	
}

module.exports.loginUser = async (req, res) => {
	let response = {...constants.defaultServerResponse};
	try {
    let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE email = '${req.body.email}' `
    sqlConn.query(sql, async (err, result) => {
      let error = ''
      if(err) {
        error = 'DB_ERROR'
      } else if( !result.length ) {
        error = constants.userMessage.USER_NOT_FOUND
      } else if( ! await bcrypt.compare(req.body.password, result[0].password) ) {
        error = constants.userMessage.USER_INVALID_PASSWORD
      }
      if( error ) {
        sendResponse(res, error)
        return
      }
      let token = dbHelper.createJWT({
        id: result[0].userId, 
        email : req.body.email
      })
      delete result[0].password
      sendResponse(res, {
        user : result[0],
        token
      }, 200)
    })
	}
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
    res.status(response.status).send(response.body)
	}
}

module.exports.findAllUser = async (req, res) => {
	let response = {...constants.defaultServerResponse};
  try {
    await userService.validateJWT( req.headers.authorization )
    let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE userType = 'user' `
    sqlConn.query(sql, async (err, result) => {
      if( err ) {
        sendResponse(res, 'DB_ERROR')
        return
      }
      sendResponse(res, result.map((user) => {
        delete user.password
        return user
      }), 200)
    })
  }
	catch (error) {
		response.body = error.message.replace(/Error:/gi, '').trim()
    res.status(response.status).send(response.body)
	}
}
module.exports.findUserByUserId = async (req, res) => {
	let response = {...constants.defaultServerResponse};
	try {
    let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE userId = '${req.params.user_id}' AND userType = 'user' `
    sqlConn.query(sql, async (err, result) => {
      let error = ''
      if(err) {
        error = 'DB_ERROR'
      } else if( !result.length ) {
        error = constants.userMessage.USER_NOT_FOUND
      }
      if( error ) {
        sendResponse(res, error)
        return
      }
      delete result[0].password
      sendResponse(res, result[0], 200)
    })
	}
	catch( error ) {
		response.body = error.message.replace(/Error:/gi, '').trim()
    res.status(response.status).send(response.body);
	}
}

module.exports.updateUser = async (req, res) => {
	let response = {...constants.defaultServerResponse}
	try {
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


