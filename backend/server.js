require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/sequelize');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Neverland Store API!' });
});

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/faq', require('./routes/faq'));
app.use('/api/testimonials', require('./routes/testimonials'));

// Connect to MariaDB and sync models
sequelize.authenticate()
  .then(() => {
    console.log('MariaDB connected');
    return sequelize.sync();
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MariaDB connection error:', err);
  });
