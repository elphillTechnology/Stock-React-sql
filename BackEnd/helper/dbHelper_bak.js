const mongoose = require('mongoose');
const constants = require('../constants');
const jwt = require('jsonwebtoken');


module.exports.formatMongoData = (data) => {
    if (Array.isArray(data)) {
        let newDataList = [];
        for (value of data) {
            newDataList.push(value.toObject());
        }
        return newDataList;
    }
    return data.toObject();
}

module.exports.validObjectId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(constants.commonQueryMessage.INVALID_ID);
    }
}

module.exports.getObjectIdFromId = (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(constants.commonQueryMessage.INVALID_ID);
    }
    return new mongoose.Types.ObjectId(id)
}

module.exports.validateUserWithJWT = ( authHeader, user_id ) => {
    if( !authHeader ) return false
    try {
        const decoded = jwt.verify(authHeader.split('Bearer')[1].trim(), constants.config.JWT_SECRET );
        return decoded.id === user_id
    } catch( error ) {
        console.log(error.message)
        return false
    }
}

module.exports.getPayloadFromJWT = ( authHeader ) => {
    if( !authHeader ) return false
    try {
        return decoded = jwt.verify(authHeader.split('Bearer')[1].trim(), constants.config.JWT_SECRET );
    } catch( error ) {
        return false
    }
}