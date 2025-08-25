
import { Router } from 'express';
import { createCompany, listCompanies, getCompany, updateCompany, deleteCompany, CompanyValidators } from '../controllers/company.controller';
import { validate } from '../utils/validate';
const r = Router();
r.get('/list', listCompanies);
r.post('/add', validate(CompanyValidators.createSchema), createCompany);
r.get('/:id', getCompany);
r.patch('/:id', validate(CompanyValidators.createSchema), updateCompany);
r.delete('/:id', deleteCompany);
export default r;
