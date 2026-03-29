module.exports = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
    corsOptions: {
        origin: [process.env.FRONTEND_URL || 'http://127.0.0.1:5500', 'http://localhost:5500'],
        credentials: true,
        optionsSuccessStatus: 200
    }
};
