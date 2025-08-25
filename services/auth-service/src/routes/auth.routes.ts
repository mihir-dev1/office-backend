
import { Router } from 'express';
import { register, login, me, validators, verifyAccessToken, listUsers } from '../controllers/auth.controller';
import { validate } from '../utils/validate';

const r = Router();
r.post('/register', validate(validators.registerSchema), register);
r.post('/login', validate(validators.loginSchema), login);
r.get('/list', listUsers);
r.post('/validate', verifyAccessToken);
export default r;
