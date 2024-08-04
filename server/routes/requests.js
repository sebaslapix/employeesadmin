const { Router } = require('express');

const requestController = require('../controllers/RequestController');
const { validateRequest, validateRequestSearch } = require('../validations/requestValidation');
const authenticateJWT = require('../middlewares/authenticate');

const router = Router();

router.get('/list/:limit?', requestController.requests);
router.get('/:id', requestController.request);
router.get('/employee/:id', requestController.employeeRequest);
router.get('/search/:parameter', validateRequestSearch, requestController.search);
router.post('/create/:employee_id', authenticateJWT, validateRequest, requestController.create);
router.delete('/delete/:id', authenticateJWT, requestController.deleteRequest);

module.exports = router;