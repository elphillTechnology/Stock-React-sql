const constants = require('../constants');
const postService = require('../service/postService');


module.exports.getAllPost = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try{
        let posts = await postService.getAllPost();



    } catch (error) {
        console.log('Error from post controller: ', error);
        response.body = error.message;
    }
    return res.status(response.status).send(response);
}
