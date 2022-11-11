const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const tokenValidation = require('../middleware/tokenValidation');
const userSchema = require('../apiSchema/userSchema');

const userController = require('../controller/userController');



router.post('/validate',
	// tokenValidation.validateToken(),
	userController.validateUser
);

router.post('/signup',
	joiSchemaValidation.validateBody(userSchema.signupUserSchema),
	userController.signupUser
);

router.post('/login',
	joiSchemaValidation.validateBody(userSchema.loginUserSchema),	
	userController.loginUser
);

router.get('/',
	tokenValidation.validateToken,
	userController.findAllUser
)
router.get('/:user_id',
	tokenValidation.validateToken,
	userController.findUserByUserId
)

router.put('/:user_id',
	joiSchemaValidation.validateBody(userSchema.updateUserSchema),
	userController.updateUser
)

router.put('/:user_id/status/:status',
	joiSchemaValidation.validateQueryParams(userSchema.updateUserStatusSchema),
	userController.updateUserStatus
)

router.post('/:user_id/client_api',
	userController.createClientApi
)

router.get('/:user_id/client_api',
	userController.findAllClientApisByUserId
)

router.put('/:user_id/client_api/:api_id/status/:status',
	joiSchemaValidation.validateQueryParams(userSchema.updateClientApiStatusSchema),
	userController.updateClientApiStatus
)

router.post('/strategy',
	joiSchemaValidation.validateBody(userSchema.createStrategySchema),
	userController.createStrategy
)

router.post('/strategy/copy/:strategy_id',
	joiSchemaValidation.validateBody(userSchema.copyStrategySchema),
	userController.copyStrategy
)


module.exports = router;

