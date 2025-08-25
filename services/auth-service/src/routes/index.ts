
import { Router } from 'express';
import authRoutes from './auth.routes';
const r = Router();
r.use('/v1', authRoutes);
r.get('/health', (_req, res) => res.json({ ok: true }));
export default r;
