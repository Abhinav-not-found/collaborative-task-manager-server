import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const ENV = {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  CLIENT_URL: process.env.CLIENT_URL_PROD || process.env.CLIENT_URL_PROD,
  NODE_ENV: process.env.NODE_ENV || 'development',
}

export default ENV
