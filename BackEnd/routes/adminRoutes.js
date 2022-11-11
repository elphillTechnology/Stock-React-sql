const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const tokenValidation = require('../middleware/tokenValidation');
const adminSchema = require('../apiSchema/adminSchema');

const adminController = require('../controller/adminController');

router.put('/manage/user',
	joiSchemaValidation.validateBody(adminSchema.updateUserSchema),
	tokenValidation.validateAdminToken,
	adminController.updateUser
)

router.put('/manage/user/:user_id/status/:status',
	joiSchemaValidation.validateQueryParams(adminSchema.updateUserStatusSchema),
	tokenValidation.validateAdminToken,
	adminController.updateUserStatus
)

router.post('/manage/client_api',
  joiSchemaValidation.validateBody(adminSchema.createClientApiSchema),
	tokenValidation.validateAdminToken,
  adminController.createClientApi
)

router.put('/manage/client_api',
	joiSchemaValidation.validateBody(adminSchema.updateClientApiSchema),
	tokenValidation.validateAdminToken,
	adminController.updateClientApi
)

router.put('/manage/client_api/status',
	joiSchemaValidation.validateBody(adminSchema.updateClientApiStatusSchema),
	adminController.updateClientApiStatus
)

router.get('/manage/client_api',
	tokenValidation.validateAdminToken,
	adminController.findClientApis
)

router.post('/manage/strategy',
	joiSchemaValidation.validateBody(adminSchema.createStrategySchema),
	adminController.createStrategy
)

router.post('/manage/strategy/copy',
	joiSchemaValidation.validateBody(adminSchema.copyStrategySchema),
	adminController.copyStrategy
)

router.get('/manage/strategy/client_api/:apiId',
	adminController.getAllStrategyDetailsByApiId
)

router.get('/manage/strategy/:strategyId',
	adminController.getStrategyDetailsByStrategyId
)

router.delete('/manage/strategy/:strategyId',
	adminController.removeStrategy
)


module.exports = router;