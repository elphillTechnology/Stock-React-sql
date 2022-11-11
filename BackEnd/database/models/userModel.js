const mongoose = require('mongoose');
const { dbHelper } = require('../../helper/dbHelper')

const userSchema = mongoose.Schema ({
    email: {
        type : String,
        require : true,
        unique : true
    },
    password: {
        type : String,
        require : true
    },
    firstName : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    dob : {
        type : String,
        require : true
    },
    panNumber : {
        type : String,
        require : true
    },
    broker : {
        type : String,
    },
    brokerId : {
        type : String,
    },
    // address : {
    //     street : {
    //         type : String,
    //         require : true,
    //         trim : true
    //     },
    //     city : {
    //         type : String,
    //         require : true,
    //         trim : true
    //     },
    //     pincode : {
    //         type : Number,
    //         require : true
    //     },
    //     state : {
    //         type : String,
    //         require : true,
    //         trim : true
    //     },
    //     country : {
    //         type : String,
    //         require : true,
    //         trim : true
    //     }
    // },
    // clientApi : [{
    //     key : {
    //         type : String,
    //         require : true
    //     },
    //     secret : {
    //         type : String,
    //         require : true
    //     },
    //     status : {
    //         type : String,
    //         enum : {
    //             values : ['active', 'inactive'],
    //             default : 'active',
    //             require : true
    //         }
    //     }
    // }],
    clientApi : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ClientApi'
    }],
    userType : {
        type : String,
        enum : {
            values : ['user', 'admin'],
            require : true
        },
        default : 'user'
    },
    status : {
        type : String,
        enum : {
            values : ['active', 'inactive', 'suspended'],
            require : true
        },
        default : 'inactive'
    }
}, {	
	timestamps: true,
    toObject: {
		transform: function(doc, ret, options) {
            ret.id = ret._id;
            ret.createdAtPretty = dbHelper.formatDateObj(ret.createdAt)
            ret.updatedAtPretty = dbHelper.formatDateObj(ret.updatedAt)
            delete ret._id;
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

const clientApiSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users'
    },
    clientApiId : {
        type : String,
        require : true
    },
    key : {
        type : String,
        require : true
    },
    secret : {
        type : String,
        require : true
    },
    // strategy : [{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'Strategy'
    // }],
    status : {
        type : String,
        enum : {
            values : ['active', 'inactive'],
            require : true
        },
        default : 'active'
    }
}, {
    timestamps: true,
    toObject: {
		transform: function(doc, ret, options) {
            ret.id = ret._id;
            ret.createdAtPretty = dbHelper.formatDateObj(ret.createdAt)
            ret.updatedAtPretty = dbHelper.formatDateObj(ret.updatedAt)
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})

const strategySchema = mongoose.Schema({
    apiId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ClientApi'
    },
    strategyType : {
        type : String,
        enum : {
            values : ['time_based', 'wait_trade', 'range_breakout']
        },
        require : true
    },
    indices : {
        type : String,
        enum : {
            values : ['NIFTY', 'BANKNIFTY']
        },
        require : true
    },
    entryTime : {
        type : Date
    },
    exitTime : {
        type : Date,
        require : true
    },
    quantity : {
        type : Number,
        min : 0,
        require : true
    },
    strikePriceATM : {
        type : Number,
        min : 0,
        require : true
    },
    strikePriceOption : {
        type : Number,
        min : 0
    },
    stopLoss : {
        type : Number,
        min : 0,
        require : true
    },
    target : {
        type : Number,
        min : 0,
        require : true
    },
    trailing : {
        type : Number,
        min : 0,
        require : true
    },
    maxProfit : {
        type : Number,
        min : 0,
        require : true
    },
    maxLoss : {
        type : Number,
        min : 0,
        require : true
    },
    status : {
        type : String,
        enum : {
            values : ['strat', 'stop'],
            require : true
        },
        default : 'stop'
    },
}, {
    // timestamps: true,
    // toObject: {
	// 	transform: function(doc, ret, options) {
    //         ret.id = ret._id;
    //         // ret.createdAtPretty = dbHelper.formatDateObj(ret.createdAt)
    //         // ret.updatedAtPretty = dbHelper.formatDateObj(ret.updatedAt)
    //         delete ret._id;
    //         delete ret.__v;
    //         return ret;
    //     }
    // }
})

module.exports.User = mongoose.model('Users', userSchema);
module.exports.ClientApi = mongoose.model('ClientApi', clientApiSchema);
module.exports.Strategy = mongoose.model('Strategy', strategySchema);
