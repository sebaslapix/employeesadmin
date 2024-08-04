const { Router } = require('express');

const employeeController = require('../controllers/EmployeeController');
const { validateEmployee, validateEmployeeLogin, validateEmployeeSearch } = require('../validations/employeeValidation');
const authenticateJWT = require('../middlewares/authenticate');

const router = Router();

router.get('/list/:limit?', employeeController.employees);
router.get('/:id', employeeController.employee);
router.get('/search/:parameter', validateEmployeeSearch, employeeController.search);
router.post('/create', authenticateJWT, validateEmployee, employeeController.create);
router.post('/login', validateEmployeeLogin, employeeController.login);

module.exports = router;