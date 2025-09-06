require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const rawBodySaver = (req, res, buf, encoding) => {
if (buf && buf.length) req.rawBody = buf.toString(encoding || 'utf8');
};


const logger = require('./config/logger');
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT || 4000;


// raw body for webhooks
app.use(express.json({ verify: rawBodySaver }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream: { write: (s) => logger.info(s.trim()) } }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 200 }));


// connect db
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/travel_scrapbook');


// routes
app.get('/', (req, res) => res.send('Travel Scrapbook API'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/cart', require('./routes/cart'));
app.use('/api/v1/orders', require('./routes/orders'));
app.use('/api/v1/admin', require('./routes/admin'));


// razorpay webhook (raw)
app.post('/api/v1/webhook/razorpay', express.json({ verify: rawBodySaver }), require('./controllers/orderController').webhook);


// error handler
app.use(require('./middleware/errorHandler'));


app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));