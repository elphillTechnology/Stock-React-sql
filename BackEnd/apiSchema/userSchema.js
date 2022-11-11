const Joi = require('@hapi/joi');

module.exports.signupUserSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    confirm_password : Joi.ref('password'),
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    dob : Joi.string().required(),
    panNumber : Joi.string().required(),
    broker : Joi.string(),
    brokerId : Joi.string(),
    phone : Joi.number().required(),
    // street : Joi.string().required(),
    // city : Joi.string().required(),
    // pincode : Joi.number().required(),
    // state : Joi.string().required(),
    // country : Joi.string().required(),
    userType : Joi.string().valid('user', 'admin')
})

module.exports.loginUserSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

module.exports.updateUserSchema = Joi.object().keys({
    email: Joi.string().email(),
    phone : Joi.number(),
    // street : Joi.string(),
    // city : Joi.string(),
    // pincode : Joi.number(),
    // state : Joi.string(),
    // country : Joi.string(),
    firstName : Joi.string(),
    lastName : Joi.string(),
    dob : Joi.string(),
    panNumber : Joi.string(),
    broker : Joi.string(),
    brokerId : Joi.string(),
})

module.exports.updateUserStatusSchema = Joi.object().keys({
    user_id : Joi.string().required(),
    status : Joi.string().required().valid('active', 'inactive', 'suspended')
}).unknown(true)

module.exports.createClientApiSchema = Joi.object().keys({
    userId : Joi.string().required(),
    clientApiId : Joi.string().required(),
    key : Joi.string().required(),
    secret : Joi.string().required()
})
module.exports.updateClientApiStatusSchema = Joi.object().keys({
    userId : Joi.string().required(),
    apiId : Joi.string().required(),
    status : Joi.string().required().valid('active', 'inactive')
})

module.exports.createStrategySchema = Joi.object().keys({
    apiId : Joi.string().required(),
    userId : Joi.string().required(),
    strategyType : Joi.string().required().valid('time_based', 'wait_trade', 'range_breakout'),
    indices : Joi.string().required().valid('NIFTY', 'BANKNIFTY'),
    entryTime : Joi.when('strategyType', {
        is : 'time_based',
        then : Joi.string().isoDate().required()
    }),
    exitTime : Joi.string().isoDate().required(),
    // .when('strategyType', {
    //     is : 'time_based',
    //     // then : Joi.string().isoDate().greater(Joi.ref('entryTime'))
    //     then : Joi.string().isoDate().max(Joi.ref('entryTime'))
    // }),
    quantity : Joi.number().required().min(1),
    strikePriceATM : Joi.number().required().min(0),
    strikePriceOption : Joi.number().min(0),
    stopLoss : Joi.number().required().min(0),
    target : Joi.number().required().min(0),
    trailing : Joi.number().required().min(0),
    maxProfit : Joi.number().required().min(0),
    maxLoss : Joi.number().required().min(0)
})

module.exports.copyStrategySchema = Joi.object().keys({
    userId : Joi.string().required(),
    strategyId : Joi.string().required()
})

/*


Add Strategy 
1. Strategy Type
2. Market Indices
3. Entry Time
4. Exit Time
5. Quantity
6. Strike price according to ATM
7. strike price according to option price 100, 80, 50
8. Stoploss
9. Target
10. trailing
11. max profit
12. max loss

----------------------------




----------------

signup user >>> [done]
login user >>> [done]
list user >>> [done]
find user by user_id >>> [done]
change user status >>> [done]
update user data >>> [done]
create user api >>> [done]
list api by user >>> [done]
change api status >>> [done]
update api password >>>
create strategy >>> [done]
copy strategy >>> [done]
list all strategy of a single client api >>>
get single strategy details >>>
update strategy >>>
delete strategy >>> 



*/

