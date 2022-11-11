module.exports = {
	defaultServerResponse: {
		status: 400,
		message: '',
		body: {}
	},
	config : {
		JWT_SECRET : 'JWT_SECRET_aksjdiUIOkmka97674bHyasydyvbc',
		JWT_ALGORITHM : 'HS256',
		JWT_EXPIRE_TIME : '7d',
		USER : {
			MAX_STRATEGY_COUNT_PER_API : 10
		},
		SQL_TABLES : {
			USERS : 'users',
			CLIENT_API : 'client_api'
		}
	},
	customerMessage: {
		CUSTOMER_CREATED: 'Customer Created Successfully',
		CUSTOMER_FETCHED: 'Customer Fetched Successfully',
		CUSTOMER_UPDATED: 'Customer Updated Successfully',
		CUSTOMER_DELETED: 'Customer Deleted Successfully',
		CUSTOMER_VERIFIED: 'Customer Verified Successfully'
	},
	userMessage: {
		USER_CREATED: 'User Created Successfully',
		USER_EXIST: 'User email id exists, try another',
		USER_LOGIN: 'User login successfully',
		USER_NOT_FOUND: 'User not Found',
		USER_INVALID_PASSWORD: 'Invalid User Password',
		INVALID_API_ID : 'Invalid api id',
		INVALID_STRATEGY_ID : 'Invalid strategy id',
		MAX_STRATEGY_LIMIT : 'Strategy limit reached for this api'
	},
	requestValidationMessage: {
			BAD_REQUEST: 'Invalid fields'
	},
	commonQueryMessage: {
		DATA_NOT_FOUND: 'Requested data not found',
		INVALID_ID: 'Invalid object id',
		MISSING_AUTH_TOKEN: 'Authorization token is missing',
		INVALID_AUTH_TOKEN_ID: 'Invalid authtoken id',
		UNAUTHORIZED_USER : 'Unauthorized user'
	}
	
}
