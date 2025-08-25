
import { Router } from 'express';
import employeeRoutes from './employee.routes';
const r = Router();
r.use('/v1', employeeRoutes);
r.get('/health', (_req, res) => res.json({ ok: true }));
export default r;
