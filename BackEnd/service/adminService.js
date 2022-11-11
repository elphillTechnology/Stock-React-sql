const { User, ClientApi, Strategy } = require('../database/models/userModel');
const { dbHelper }  = require('../helper/dbHelper');
const constants = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { date } = require('@hapi/joi');
const { MD5, SHA256 } = require('crypto-js');


// module.exports.validateAdminJWT = async ( token ) => {
// 	const payload = dbHelper.getPayloadFromJWT( token );
// 	if( !payload ) {
// 		throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
// 	}
//   let userData = await User.findById(payload.id)
//   if( userData?.userType != 'admin' ) {
// 		throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
//   }
//   return dbHelper.formatMongoData(userData)
// }

module.exports.validateAdminJWT = async ( token ) => {
	const payload = dbHelper.getPayloadFromJWT( token );
	if( !payload ) {
		throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
	}
  let userData = await User.findById(payload.id)
  if( userData?.userType != 'admin' ) {
		throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
  }
  return dbHelper.formatMongoData(userData)
}

module.exports.updateUser = async ( user_id, reData ) => {
	try {
		dbHelper.validObjectId(user_id);
		let oldUserDetails = await User.findById(user_id)
		let userUpdateObj = {}
		let validUpdateFields = ['email', 'phone', 'firstName', 'lastName', 'dob', 'panNumber', 'broker', 'brokerId']
		for(let field in reData) {
			if( !validUpdateFields.includes(field) || !reData[field] ) continue
			userUpdateObj[field] = reData[field]
		}
		// userUpdateObj.address = { ...oldUserDetails.address }
		// if( reData.street ) {
		// 	userUpdateObj.address.street = reData.street
		// }
		// if( reData.city ) {
		// 	userUpdateObj.address.city = reData.city
		// }
		// if( reData.pincode ) {
		// 	userUpdateObj.address.pincode = reData.pincode
		// }
		// if( reData.state ) {
		// 	userUpdateObj.address.state = reData.state
		// }
		// if( reData.country ) {
		// 	userUpdateObj.address.country = reData.country
		// }
		await User.findByIdAndUpdate(user_id, {
			$set : userUpdateObj
		})
		return dbHelper.formatMongoData( await User.findById(user_id) )
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.updateUserStatus = async ( {user_id, status} ) => {
	try {
		dbHelper.validObjectId(user_id);
		let userData = await User.findByIdAndUpdate(user_id, {
			$set : {
				status : status
			}
		});
		return dbHelper.formatMongoData(userData);
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.createClientApi = async ( reData ) => {
	try {
    dbHelper.validObjectId(reData.userId)
    let userData = await User.findById(reData.userId)
		if( !userData ) {
			throw new Error(constants.userMessage.USER_NOT_FOUND)
		}
    const newApi = new ClientApi({
      userId : reData.userId,
      clientApiId : reData.clientApiId,
      key : reData.key,
      secret : reData.secret,
      status : 'active'
    })
		let newApiData = await newApi.save()
		userData.clientApi.push(newApiData._id)
		await userData.save()
		return dbHelper.formatMongoData(newApiData)
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.findAllClientApisByUserId = async ({ user_id }) => {
	try {
		dbHelper.validObjectId(user_id);
		let userData = await User.findById(user_id)
		if( !userData ) {
			throw new Error(constants.userMessage.USER_NOT_FOUND)
		}
		let userApis = await ClientApi.find({ userId : user_id }, ['-userId'])
		return dbHelper.formatMongoData(userApis)
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.updateClientApiStatus = async ({ userId, apiId, status }) => {
	try {
		dbHelper.validObjectId(userId);
		dbHelper.validObjectId(apiId);
		let userApis = await ClientApi.findOneAndUpdate(
			{ userId, _id : apiId  },
			{ $set : { status } }
		)
		return dbHelper.formatMongoData(userApis)
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.createStrategy = async ( reData ) => {
	try {
		if( reData.strategyType == 'time_based' && ( (new Date(reData.entryTime)).getTime() >= (new Date(reData.exitTime)).getTime() ) ) { 
			throw new Error("Exit time should be greater than entry time")
		}
    dbHelper.validObjectId(reData.apiId)
    dbHelper.validObjectId(reData.userId)
    const apiDetails = await ClientApi.findById(reData.apiId)
    if( !apiDetails ) {
      throw new Error(constants.userMessage.INVALID_API_ID)
    }
    let userData = await User.findById(reData.userId)
    if( !userData ) {
      throw new Error(constants.userMessage.USER_NOT_FOUND)
    }
    if( !userData.clientApi.includes(reData.apiId) ) {
      throw new Error(constants.userMessage.INVALID_API_ID)
    }
    let strategyByApi = await Strategy.find({ apiId : reData.apiId })
		if( strategyByApi.length >= constants.config.USER.MAX_STRATEGY_COUNT_PER_API ) {
			throw new Error(constants.userMessage.MAX_STRATEGY_LIMIT)
		}
    let strategyData = {
			apiId : reData.apiId,
			strategyType : reData.strategyType,
			indices : reData.indices,
			exitTime : reData.exitTime,
			quantity : reData.quantity,
			strikePriceATM : reData.strikePriceATM,
			stopLoss : reData.stopLoss,
			target : reData.target,
			trailing : reData.trailing,
			maxProfit : reData.maxProfit,
			maxLoss : reData.maxLoss
		}
		if( reData.strategyType == 'time_based' ) {
			strategyData.entryTime = reData.entryTime
			strategyData.strikePriceOption = reData.strikePriceOption
		}
		strategyData.status = 'stop'
		const strategy = new Strategy({ ...strategyData })
		let savedStrategyData = await strategy.save()
		return dbHelper.formatMongoData(savedStrategyData)
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.copyStrategy = async ( reData ) => {
	try {
    dbHelper.validObjectId(reData.strategyId, 'strategy id')
		let strategyData = await Strategy.findById(reData.strategyId)
    strategyData = dbHelper.formatMongoData(strategyData)
		if( !strategyData ) {
      throw new Error(constants.userMessage.INVALID_STRATEGY_ID)
		}
    return await this.createStrategy({ ...strategyData, userId : reData.userId })
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.getAllStrategyDetailsByApiId = async ( apiId ) => {
	try {
		if( !apiId ) {
			throw new Error(constants.commonQueryMessage.INVALID_API_ID)
		}
		dbHelper.validObjectId(apiId, 'api id')
		let strategy = await Strategy.find({ apiId })
		return strategy.map((data) =>  dbHelper.formatMongoData(data))
		return dbHelper.formatMongoData(strategy)
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.getStrategyDetailsByStrategyId = async ( strategyId ) => {
	try {
		if( !strategyId ) {
			throw new Error(constants.commonQueryMessage.INVALID_STRATEGY_ID)
		}
		dbHelper.validObjectId(strategyId, 'strategy id')
		let strategy = await Strategy.findById(strategyId)
		if( !strategy ) {
			throw new Error("Strategy not found")
		}
		return dbHelper.formatMongoData(strategy)
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.removeStrategy = async ( strategyId ) => {
	try {
		if( !strategyId ) {
			throw new Error(constants.commonQueryMessage.INVALID_STRATEGY_ID)
		}
		dbHelper.validObjectId(strategyId, 'strategy id')
		let abc = await Strategy.findByIdAndDelete(strategyId)
		return abc
	}
	catch(error) {
		throw new Error(error)
	}
}


