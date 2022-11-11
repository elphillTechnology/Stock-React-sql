const { User, ClientApi, Strategy } = require('../database/models/userModel');
const { dbHelper }  = require('../helper/dbHelper');
const constants = require('../constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { date } = require('@hapi/joi');
const { MD5, SHA256 } = require('crypto-js');



module.exports.validateUserWithJWT = async ( token, user_id, return_user_data = false ) => {
	const payload = dbHelper.getPayloadFromJWT( token );
	if( !payload ) {
		throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
	}
	if( user_id == payload.id ) {
		if( return_user_data ) {
			let userData = await User.findById(user_id)
			return dbHelper.formatMongoData(userData)
		}
		return true
	}
	let loggedinUser = await User.findById(payload.id)
	if( loggedinUser.userType == 'user' ) {
		throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
	}
	if( return_user_data ) {
		return dbHelper.formatMongoData(loggedinUser)
	}
	return true
}

module.exports.validateJWT = async ( token ) => {
	const payload = dbHelper.getPayloadFromJWT( token );
	if( !payload ) {
		throw new Error(constants.commonQueryMessage.UNAUTHORIZED_USER)
	}
	else return payload
}

module.exports.signupUser = async (reData) => {
	try {
		const user = await User.findOne({ email : reData.email });
		if(user) {
			throw new Error(constants.userMessage.USER_EXIST);
		}
		if( reData.password !== reData.confirm_password ) {
			throw new Error("Password doesnot matches with confirm password");
		}
		let encryptPassword = await bcrypt.hash(reData.password, 12);
		const userData = {
			email : reData.email,
			password : encryptPassword,
			phone : reData.phone,
			firstName : reData.firstName,
			lastName : reData.lastName,
			dob : reData.dob,
			panNumber : reData.panNumber,
			broker : reData.broker,
			brokerId : reData.brokerId,
			// address : {
			// 	street : reData.street, 
			// 	city : reData.city,
			// 	pincode : reData.pincode,
			// 	state : reData.state,
			// 	country : reData.country,
			// },
			userType : reData.userType,
			clientApi : [],
			status : 'inactive'
		}
		const newUser = new User({ ...userData });
		let newUserData = await newUser.save();
		newUserData = dbHelper.formatMongoData(newUserData);
		let token = dbHelper.createJWT({
			id : newUserData.id,
			email : newUserData.email
		})
		return {
			user : newUserData,
			token
		}
	} 
	catch (error) {
		throw new Error(error);
	}
}

module.exports.loginUser = async ({ email, password }) => {
	try {
		const user = await User.findOne({ email });
		if(!user) {
			throw new Error(constants.userMessage.USER_NOT_FOUND);
		}
		const isPassValid = await bcrypt.compare(password, user.password);
		if(!isPassValid) {
			throw new Error(constants.userMessage.USER_INVALID_PASSWORD);
		}
		let token = dbHelper.createJWT({
			id: user._id, 
			email
		})
		return {
			user : dbHelper.formatMongoData(user),
			token
		}
	} 
	catch (error) {
		throw new Error(error);
	}
}

module.exports.findAllUser = async () => {
	try {
		let users = await User.find({
			userType : 'user'
		})
		return dbHelper.formatMongoData(users);
	} catch( error ) {
		throw new Error(error)
	}
}
module.exports.findUserByUserId = async ( user_id ) => {
	try {
		dbHelper.validObjectId(user_id)
		let user = await User.findById(user_id).populate('clientApi')
		return user ? dbHelper.formatMongoData(user) : user
	}
	catch( error ){
		throw new Error(error)
	}
}

module.exports.updateUser = async ( user_id, reData ) => {
	try {
		dbHelper.validObjectId(user_id);
		// let oldUserDetails = await User.findById(user_id)
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

module.exports.createClientApi = async ({ user_id }) => {
	try {
		dbHelper.validObjectId(user_id);
		let userData = await User.findById(user_id)
		if( !userData ) {
			throw new Error(constants.userMessage.USER_NOT_FOUND)
		}
		let newApi = new ClientApi({
			userId : userData._id,
			key : MD5( Date.now() + '_KEY_' + user_id ).toString(),
			secret : SHA256( Date.now() + '_SECRET_' + user_id ).toString(),
			status : "active"
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

module.exports.updateClientApiStatus = async ({ user_id, api_id, status }) => {
	try {
		dbHelper.validObjectId(user_id);
		dbHelper.validObjectId(api_id);
		let userApis = await ClientApi.findOneAndUpdate(
			{ userId : user_id, _id : api_id  },
			{ $set : { status } }
		)
		return dbHelper.formatMongoData(userApis)
	}
	catch(error) {
		throw new Error(error)
	}
}

module.exports.validateUser = async ( token ) => {
	try {
		let payload = dbHelper.getPayloadFromJWT( token )
		if( !payload ) {
			throw new Error( constants.commonQueryMessage.INVALID_AUTH_TOKEN_ID )
		}
		let userData = await User.findById( payload.id, ['-clientApi'] )
		userData = dbHelper.formatMongoData(userData)
		return {
			user : userData,
			tokenValidity : constants.config.JWT_EXPIRE_TIME
		}
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
		const loggedinUserData = await User.findById(reData.loggedinUserId)
		if( loggedinUserData.userType == 'user' && !loggedinUserData.clientApi.includes(reData.apiId) ) {
			throw new Error("Invalid api id")
		}
		if( loggedinUserData.userType == 'admin' ) {
			const apiDetails = await ClientApi.findById(reData.apiId)
			if( !apiDetails ) {
				throw new Error("Invalid api id")
			}
		}
		if( loggedinUserData.userType == 'user' ) {
			if( loggedinUserData.status != 'active' ) {
				throw new Error("Activate user to continue")
			}
		}
		else {
			let userData = await User.findOne({
				$and : [
					{ clientApi : { $in : [reData.apiId] } },
					{status : 'active'}
				]
			})
			if( !userData ) {
				throw new Error("Activate user to continue")
			}
		}
		let strategyByApi = await Strategy.find({ apiId : reData.apiId })
		if( strategyByApi.length >= constants.config.USER.MAX_STRATEGY_COUNT_PER_API ) {
			throw new Error("Strategy limit reached for this api")
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
		// return reData
		let strategyData = await Strategy.findById(reData.strategyId)
		if( !strategyData ) {
			throw new Error("Invalid strategy id")
		}
		let userData = reData.loggedinUser
		if( reData.loggedinUser.status == 'admin' ) {
			userData = await User.findById( reData.userId )
			if( !userData ) {
				throw new Error("Invalid user id")
			}
			userData = dbHelper.formatMongoData(userData)
		}
		if( !userData.clientApi.includes(strategyData.apiId) ) {
			throw new Error("Invalid strategy id 1")
		}
		let strategyByApi = await Strategy.find({ apiId : reData.apiId })
		if( strategyByApi.length >= constants.config.USER.MAX_STRATEGY_COUNT_PER_API ) {
			throw new Error("Strategy limit reached for this api")
		}
		let newStrategy = {
			apiId : strategyData.apiId,
			strategyType : strategyData.strategyType,
			indices : strategyData.indices,
			exitTime : strategyData.exitTime,
			quantity : strategyData.quantity,
			strikePriceATM : strategyData.strikePriceATM,
			stopLoss : strategyData.stopLoss,
			target : strategyData.target,
			trailing : strategyData.trailing,
			maxProfit : strategyData.maxProfit,
			maxLoss : strategyData.maxLoss,
			status : 'stop'
		}
		const strategy = new Strategy({ ...newStrategy })
		let savedStrategyData = await strategy.save()
		return dbHelper.formatMongoData(savedStrategyData)
	}
	catch(error) {
		throw new Error(error)
	}
}




