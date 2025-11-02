require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const rawBodySaver = (req, res, buf, encoding) => {
    if (buf && buf.length) req.rawBody = buf.toString(encoding || 'utf8');
};

const logger = require('./src/config/logger');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 4000;

app.set('trust proxy', 1);

// raw body for webhooks
app.use(express.json({ verify: rawBodySaver }));
app.use(express.urlencoded({ extended: true }));

// Fix helmet to allow images
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false
}));

app.use(cors());
app.use(morgan('combined', { stream: { write: (s) => logger.info(s.trim()) } }));

// connect db
connectDB(process.env.MONGO_URI);
const uploadsPath = path.join(__dirname, "src", "uploads");
app.use("/uploads", express.static(uploadsPath));

// Verify uploads folder exists
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
    logger.info('Created uploads directory');
}

logger.info(`Uploads directory: ${uploadsPath}`);

// Image serving route - MUST come before other routes
app.get("/uploads/:filename", (req, res) => {
    const filePath = path.join(uploadsPath, req.params.filename);
    console.log('Requested file:', req.params.filename);
    console.log('Full path:', filePath);

    // Check if file exists
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        console.log('File not found, sending placeholder');
        const noImagePath = path.join(__dirname, "public/no-image.jpg");
        if (fs.existsSync(noImagePath)) {
            res.status(404).sendFile(noImagePath);
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
    }
});

// Other routes
app.get('/', (req, res) => res.send('Travel Scrapbook API'));
app.use('/api/v1/auth', require('./src/routes/auth'));
app.use('/api/v1/products', require('./src/routes/products'));
// app.use('/api/v1/orders', require('./src/routes/orders'));
app.use('/api/v1/admin', require('./src/routes/admin'));
app.use('/api/v1/user', require('./src/routes/user'));

// razorpay webhook (raw)
// app.post('/api/v1/webhook/razorpay', express.json({ verify: rawBodySaver }), require('./src/controllers/orderController').webhook);

// error handler
app.use(require('./src/middleware/errorHandler'));

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

