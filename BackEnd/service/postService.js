const {} = require('../database/models/postModel');
const { formatMongoData, validObjectId, getObjectIdFromId } = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.getAllPost = async () => {
    try{

    } catch (error) {
        console.log('error from postModel : ', error);
        throw new Error(error);
    }
}