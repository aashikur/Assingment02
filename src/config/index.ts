import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
    connectionString: process.env.CONNECTION_STRING || '',
    port : process.env.PORT || 5000,
}