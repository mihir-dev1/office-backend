
import { Router } from 'express';
import companyRoutes from './company.routes';
const r = Router();
r.use('/v1', companyRoutes);
r.get('/health', (_req, res) => res.json({ ok: true }));
export default r;
