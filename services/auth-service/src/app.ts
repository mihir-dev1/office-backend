
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import env from './config/env';
import { httpLogger } from './utils/logger';
import { port } from './server';
import routes from './routes';
import { errorHandler, notFound } from './middlewares/error';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(httpLogger);
app.use(rateLimit({ windowMs: 60_000, max: 1000 }));

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);
export default app;
