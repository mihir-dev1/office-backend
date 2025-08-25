import 'dotenv/config';

const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 4000),
  MONGODB_URI: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/dev',
  JWT_SECRET: process.env.JWT_SECRET ?? 'a91ce5c81719e6d2d3e51930bb4d6b4503bcba4592041a4293f7e5b99694268bd52daddf2f9322a3a3ff484fa1f5e53916f03879ff0a1c77d703e3e1f2f76320',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? '*',
} as const;

if (!env.MONGODB_URI || !env.JWT_SECRET) {
  throw new Error('Missing required environment variables.');
}

export default env;
