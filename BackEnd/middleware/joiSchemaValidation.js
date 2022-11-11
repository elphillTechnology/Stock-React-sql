const Joi = require('@hapi/joi');
const constants = require('../constants');

const validateObjectSchema = (data, schema) => {
	const result = Joi.validate(data, schema, { convert: false });
	// console.log('Joi schema Validation Result ===', result.error.details);
	if(result.error) {
		const errorDetails = result.error.details.map(value => {
			return {
				error: value.message,
				// path: value.path
			}
		})
		return errorDetails;
	}
	return null;
	
}

module.exports.validateBody = (schema) => {
	return (req, res, next) => {
		let response = { ...constants.defaultServerResponse };
		const err = validateObjectSchema(req.body, schema);
		if(err) {
			response.body = err[0].error;
			// response.message = constants.requestValidationMessage.BAD_REQUEST;
			return res.status(response.status).send(response.body);
		} 
		return next();
	}
}

module.exports.validateQueryParams = (schema) => {
	return (req, res, next) => {
		let response = { ...constants.defaultServerResponse };
		const err = validateObjectSchema(req.params, schema);
		if(err) {
			response.body = err[0].error;
			// response.message = constants.requestValidationMessage.BAD_REQUEST;
			return res.status(response.status).send(response.body);
		} 
		return next();
	}
}

