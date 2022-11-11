const constants = require('../constants');
const jwt = require('jsonwebtoken');
const { sqlConnection } = require('../database/connection')
const { dbHelper } = require('../helper/dbHelper')


const sqlConn = sqlConnection();

module.exports.validateToken = (req, res, next) => {
    if (!req.headers.authorization || typeof req.headers.authorization === 'undefined') {
        res.status(401).send(constants.commonQueryMessage.UNAUTHORIZED_USER)
        return
    } 
    else {
        const payload = dbHelper.getPayloadFromJWT( req.headers.authorization );
        if( !payload ) {
            res.status(401).send(constants.commonQueryMessage.UNAUTHORIZED_USER)
            return
        }
        let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE userId = '${payload.id}' `
        sqlConn.query(sql, (err, result) => {
            if( err || !result.length ) {
                res.status(401).send(constants.commonQueryMessage.UNAUTHORIZED_USER)
                return
            }
            delete result[0].passwrod
            req.body.loggedinUser = result[0]
            next()
        })
    }
}


module.exports.validateAdminToken = (req, res, next) => {
    if (!req.headers.authorization || typeof req.headers.authorization === 'undefined') {
        res.status(401).send(constants.commonQueryMessage.UNAUTHORIZED_USER)
        return
    } 
    else {
        const payload = dbHelper.getPayloadFromJWT( req.headers.authorization );
        if( !payload ) {
            res.status(401).send(constants.commonQueryMessage.UNAUTHORIZED_USER)
            return
        }
        let sql = `SELECT * FROM ${constants.config.SQL_TABLES.USERS} WHERE userId = '${payload.id}' `
        sqlConn.query(sql, (err, result) => {
            if( err || !result.length || result[0].userType != 'admin' ) {
                res.status(401).send(constants.commonQueryMessage.UNAUTHORIZED_USER)
                return
            }
            delete result[0].passwrod
            req.body.user = result[0]
            next()
        })
    }
}



    // console.log(req.headers.authorization);

    /*try {
        if(!req.headers.authorization) {
            throw new Error('Token missing from header');
        }
        console.log(req.headers.authorization.split('Bearer')[1].trim());
    } catch (error) {
        console.log('Error', error);
    }
    */


    // const token = req.body.token || req.query.token || req.headers.authorization.split('Bearer')[1].trim();
    // // const token = req.headers.authorization.split('Bearer')[1].trim();
    // if (!token) {
    //     return res.status(403).send("A token is required for authentication");
    // }


    /*
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();*/






    // return (req, res, next) => {
    // 	let response = { ...constants.defaultServerResponse };
    // 	const error = validateObjectSchema(req.body, schema);
    // 	if(error) {
    // 		response.body = error;
    // 		response.message = constants.requestValidationMessage.BAD_REQUEST;
    // 		return res.status(response.status).send(response);
    // 	} 
    // 	return next();
    // }
