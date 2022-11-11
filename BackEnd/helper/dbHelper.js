const mongoose = require('mongoose');
const constants = require('../constants');
const jwt = require('jsonwebtoken');


const addZeroBeforeNumber = (num) => {
  num = num || 0
  num = parseInt(num)
  if( num == 0 ) {
    return '00'
  } else if( num < 10 ) {
    return '0' + String(num)
  } else {
    return String(num)
  }
}

module.exports.dbHelper = {

  formatMongoData : (data) => {
    if (Array.isArray(data)) {
      let newDataList = [];
      for (value of data) {
        newDataList.push(value.toObject());
      }
      return newDataList;
    }
    return data.toObject();
  },

  validObjectId : (id, field = '') => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid Id ${field}`)
    }
  },

  getObjectIdFromId : (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(constants.commonQueryMessage.INVALID_ID);
    }
    return new mongoose.Types.ObjectId(id)
  },

  validateUserWithJWT : (authHeader, user_id) => {
    if (!authHeader) return false
    try {
      const decoded = jwt.verify(authHeader.split('Bearer')[1].trim(), constants.config.JWT_SECRET);
      return decoded.id === user_id
    } catch (error) {
      console.log(error.message)
      return false
    }
  },

  getPayloadFromJWT : (authHeader) => {
    if (!authHeader) return false
    try {
      return decoded = jwt.verify(authHeader.split('Bearer')[1].trim(), constants.config.JWT_SECRET);
    } catch (error) {
      return false
    }
  },

  createJWT : ( payload ) => {
    if( typeof payload !== 'object' || !payload.id || !payload.email ) {
      return false
    }
    return jwt.sign(payload, constants.config.JWT_SECRET, { 
			algorithm: constants.config.JWT_ALGORITHM, 
			expiresIn: constants.config.JWT_EXPIRE_TIME
		});
  },

  formatDateObj : (dateObj) => {
    let date = new Date(dateObj)
    let hour = date.getHours()
    let ampm = hour >= 12 ? 'PM' : 'AM' 
    hour = (hour / 12) > 1 ? hour - 12 : hour  
    return (
      addZeroBeforeNumber(date.getFullYear()) + '-' + 
      addZeroBeforeNumber(date.getMonth() + 1) + '-' + 
      addZeroBeforeNumber(date.getDate()) + ' ' + 
      hour + ':' + 
      addZeroBeforeNumber(date.getMinutes()) + ' ' +
      ampm
    )
  },
  fromatDateObjTimestamp : (dateObj) => {
    let date = new Date(dateObj)
    return (
      addZeroBeforeNumber(date.getFullYear()) + '-' + 
      addZeroBeforeNumber(date.getMonth() + 1) + '-' + 
      addZeroBeforeNumber(date.getDate()) + ' ' + 
      addZeroBeforeNumber(date.getHours()) + ':' + 
      addZeroBeforeNumber(date.getMinutes()) + ':' +
      addZeroBeforeNumber(date.getSeconds())
    )
  },
  formatDateObjToDOB : (dateObj) => {
    let date = new Date(dateObj)
    return (
      addZeroBeforeNumber(date.getFullYear()) + '-' + 
      addZeroBeforeNumber(date.getMonth() + 1) + '-' + 
      addZeroBeforeNumber(date.getDate())
    )
  }

}

