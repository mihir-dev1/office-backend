
import app from './app';
import routes from './routes';
import { connectDB } from './config/db';
import env from './config/env';
import { errorHandler, notFound } from './middlewares/error';

export const port = Number(env.PORT || 4001);
connectDB().then(() => {
  app.listen(port, () => console.log(`auth-service listening on ${port}`));
}).catch(err => { console.error('DB connection failed', err); process.exit(1); });
