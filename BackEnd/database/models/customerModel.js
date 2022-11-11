const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema ({
    // firstName: String,
    // lastname: String,
    // emailAddress: String,
    // phoneNumber: String,
    // department: String,
    // dob: String
    email : String,
    phone : String,
    isdCode : String,
    loginMobile : String,
    password : String,
    status : {
        type : String,
        enum : ['active', 'inactive', 'block'],
        default : 'inactive',
        require : true
    },
    doneBillingProfile : {
        type : Boolean,
        default : false
    },
    accountType : {
        type : String,
        enum : ['advertiser', 'publisher'],
        require : true
    },
    name : String,
    profilePic : String,
    creditBalance : {
        type : Number,
        default : 0
    },
    creditBalanceInUserCurrency : Number,
    currencyCode : {
        type : String,
        enum : ['USD', 'EUR', 'INR']
    },
    timeZone : String,
    zoneArea : String,
    createdAt : {
        type : Date,
        default : Date.now
    },
    verifiedAt : {
        type : Date,
        default : null
    }
}, {	
	timestamps: true,
    toObject: {
		transform: function(doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }

}) ;

const customerActivationCodeSchema = mongoose.Schema({
    custId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Customers'
    },
    verifyAccount : {
        code : {
            type : String,
            require : true
        },
        generatedOn : {
            type : Date,
            default : Date.now
        },
        expireOn : {
            type : Date,
            require : true
        }
    },
    verifyPassword : {
        code : {
            type : String,
            require : true
        },
        generatedOn : {
            type : Date,
        },
        expireOn : {
            type : Date,
            require : true
        }
    }
    // cativationCodeFor : {
    //     type : String,
    //     enum : [ 'verify_account', 'verify_password' ]
    // },

    // code : {
    //     type : String
    // },
    // generatedOn : {
    //     type : Date,
    //     default : Date.now
    // },
    // expireOn : {
    //     type : Date
    // }
// }, 
// {	
// 	timestamps: true,
//     toObject: {
// 		transform: function(doc, ret, options) {
//             ret.id = ret._id;
//             delete ret._id;
//             delete ret.__v;
//             return ret;
//         }
//     }
}) 

module.exports.Customer = mongoose.model('Customers', customerSchema);
module.exports.CustomerActivationCode = mongoose.model('Customer_Activation_Code', customerActivationCodeSchema);