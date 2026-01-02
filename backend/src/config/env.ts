import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: string | number;
  nodeEnv: string;
  mongodbUri: string;
  jwtSecret: string;
  jwtExpire: string;
  corsOrigin: string;
}

export const config: Config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_management',
  jwtSecret: process.env.JWT_SECRET || 'your_super_secret_jwt_key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
