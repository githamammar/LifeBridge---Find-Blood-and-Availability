module.exports = {
    // Server
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    
    // Database
    mongoURI: process.env.MONGODB_URI,
    
    // JWT
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
    
    // Admin
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    
    // File Upload
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880,
    uploadPath: process.env.UPLOAD_PATH || './uploads',
    
    // CORS
    corsOptions: {
        origin: [process.env.FRONTEND_URL, 'http://localhost:5500', 'http://127.0.0.1:5500'],
        credentials: true,
        optionsSuccessStatus: 200
    }
};