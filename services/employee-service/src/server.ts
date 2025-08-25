
import 'dotenv/config';
import app from './app';
import routes from './routes';
import { connectDB } from './config/db';

const port = Number(process.env.PORT || 4003);
connectDB().then(() => {
  app.use('/api', routes);
  app.listen(port, () => console.log(`employee-service listening on ${port}`));
}).catch(err => { console.error('DB connection failed', err); process.exit(1); });
