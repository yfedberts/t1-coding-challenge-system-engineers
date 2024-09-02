import dotenv from 'dotenv';
dotenv.config();

export const loadEnv = (key: string, defaultValue: string | number): string | number => {
    if (!process.env[key]) {
        console.warn(`Environment variable ${key} is not set. Using default value: ${defaultValue}`);
    }

    return process.env[key] || defaultValue;
};
