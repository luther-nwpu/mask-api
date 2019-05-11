// port listen
export const PORT = 10011

// is production
export const IS_PROD = getEnv('NODE_ENV') === 'production'

export const WS_HOST = IS_PROD ? 'wss://www.npu2015303320.top' : `ws://localhost:${PORT}`

// jwt salt
export const JWT_SECRET = getEnv('JWT_SECRET')

export const UPLOAD_BUCKET = 'nwpuOrder'
export const UPLOAD_REGION = 'nwpu'

export const SYSTEM_ACCOUNT = '__SYSTEM__ACCOUNT__'

// mysql config
export const MYSQL = {
    HOST: getEnv('DB_HOST') || 'localhost',
    PORT: getEnv('DB_PORT') || '3306',
    USER: getEnv('DB_USER') || 'root',
    PASS: getEnv('DB_PASS') || 'root',
    DB: getEnv('DB_NAME') || 'mask',
    CHAR: getEnv('DB_CHAR') || 'utf8mb4'
}

/**
 * redis config
 */
export const REDIS = {
    HOST: getEnv('REDIS_HOST') || 'localhost',
    PORT: +getEnv('REDIS_PORT') || 6379
}

// debug namespaces
export const DEBUG_NAMESPACE = {
    /**
     * base framework
     */
    FRAMEWORK: 'app:framework',

    JWT: 'app:authorization'
}

export function getEnv (key: string): string {
    return process.env[key]
}

export const SENDEMAIL = {
    HOST: 'smtp.163.com',
    SERVICE: 'smtp.163.com',
    PORT: 465,
    USER: '18829589407@163.com',
    PASS: 'Npu2015303320'
}
