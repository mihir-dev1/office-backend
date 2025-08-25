
import { Router } from 'express';
import { createEmployee, listEmployees, getEmployee, updateEmployee, deleteEmployee, EmployeeValidators } from '../controllers/employee.controller';
import { validate } from '../utils/validate';
const r = Router();
r.get('/list', listEmployees);
r.post('/add', validate(EmployeeValidators.createSchema), createEmployee);
r.get('/:id', getEmployee);
r.patch('/:id', validate(EmployeeValidators.updateSchema), updateEmployee);
r.delete('/:id', deleteEmployee);
export default r;
