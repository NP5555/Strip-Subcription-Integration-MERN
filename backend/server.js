const express = require('express');
const dotenv = require('dotenv');
const checkoutRoutes = require('./routes/checkoutRoutes');
const customerRoutes = require('./routes/customerRoutes');
const priceRoutes = require('./routes/priceRoutes');
const couponRoutes = require('./routes/couponRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use('/api', customerRoutes);
app.use('/api', priceRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', webhookRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', couponRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
