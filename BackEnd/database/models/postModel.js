const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    custId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customers'
    },
    
    
})